import React, { memo, useEffect, useReducer, useState } from 'react';
import { fetchCategories, fetchProductDetails, searchProductsInCategory } from '../../util/APIUtil';
import { FlatList, SectionList, View } from 'react-native';
import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import ProductView from './ProductView';
import ProductCategoryHeader from './ProductCategoryHeader';
import { SizeConstants } from '../../constant/SizeConstants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';
import useIsReady from '../../hook/ReadyDelay';
import BusyIndicator from '../BusyIndicator';
import ViewMoreBtn from './ViewMoreBtn';

type SectionData = {
  title: string | undefined; // Category name
  batchNumber: number | false; // Index of next batch of product IDs to request, or false if final batch loaded
  data: Array<string>; // Product IDs in category
  idToDisplayData: Map<string, object>; // Map of product IDs to display data
  displayHorizontal: boolean; // Whether to scroll the products horizontally or vertically
}

const ProductCategoriesView = (props: ScreenSizeProp) => {

  // Init state
  const [sectionDatas, setSectionDatas,] = useState<Array<SectionData>>([]);
  const [initialProductsLoaded, setInitialProductsLoaded,] = useReducer(() => true, false);

  // Init style
  const insets = useSafeAreaInsets();
  const { screenWidth, screenHeight, } = props.screenSize;
  const style = useFelaNative({ screenWidth, screenHeight, insetTop: insets.top, });

  // Fetch initial category and product data
  useEffect(() => {
    if (initialProductsLoaded) return;
    const loadInitialData = async () => {

      // Define function to load first batch of products in a category
      const loadFirstProducts = async (categoryName: string, idx: number): Promise<SectionData> => {
        const sectionData = {
          title: categoryName,
          data: [],
          batchNumber: 0,
          idToDisplayData: new Map(),
          displayHorizontal: idx % 3 == 1,
        };
        const sectionDataWithIDs = await fetchNextProductIDs(sectionData);
        if (!sectionDataWithIDs) return sectionData;
        return await ensureProductsDisplayData(sectionDataWithIDs);
      };

      // Request list of category names
      const categoryNames = await fetchCategories();

      // Load first batch of product data in each category
      return await Promise.all(categoryNames.map(loadFirstProducts));
    };

    // Update state
    loadInitialData()
      .then(newSectionDatas => setSectionDatas(newSectionDatas))
      .then(() => setInitialProductsLoaded());
  }, [initialProductsLoaded,]);

  // Define function to load more products in a category
  const loadNextProductsInCategory = (categoryName => {
    const prevSectionData = sectionDatas.find(sectionData => sectionData.title == categoryName);
    if (!prevSectionData || prevSectionData.batchNumber === false) return;
    const loadNextProductsInCategoryAsync = async (): Promise<Array<SectionData>> => {
      const dataWithNewIDs = await fetchNextProductIDs(prevSectionData!);
      if (!dataWithNewIDs) return sectionDatas;
      const dataWithDisplayData = await ensureProductsDisplayData(dataWithNewIDs);
      return sectionDatas.map(sectionData => sectionData.title == categoryName ? dataWithDisplayData : sectionData);
    };
    loadNextProductsInCategoryAsync().then(newSectionDatas => setSectionDatas(newSectionDatas));
  });

  // Show loading wheel for at least half a second
  // If this is not used, then there could be a delay after user logs in on a slow device
  const isReady = useIsReady();
  if (!isReady) return <BusyIndicator />;

  // Define renderSectionHeader() to render a category title or a horizontal FlatList of products
  const renderSectionHeader = ({ section, }) => {

    // Horizontal display
    if (section.displayHorizontal) {
      return (
        <>
          <ProductCategoryHeader
            title={section.title}
            screenWidth={screenWidth} />
          <FlatList
            horizontal
            keyExtractor={(item) => section.title + '_horizontal_' + item}
            showsHorizontalScrollIndicator={false}
            data={section.data}
            snapToInterval={screenWidth * 0.75}
            decelerationRate={'fast'}
            onEndReached={() => loadNextProductsInCategory(section.title)}
            renderItem={({ item, index, }) =>
              <ProductView
                displayName={section.idToDisplayData.get(item).displayName}
                image={section.idToDisplayData.get(item).image}
                url={section.idToDisplayData.get(item).url}
                isHorizontalItem={true}
                screenWidth={screenWidth}
                isLastHorizontalItem={index == section.data.length - 1} />}
          />
        </>
      );
    }

    // Vertical display
    return <ProductCategoryHeader
      title={section.title}
      screenWidth={screenWidth} />;
  };

  // Define renderItem() to render a product in the vertical SectionList
  const renderItem = ({ item, index, section, }) => {

    // Skip products that are already showing in the horizontal FlatList in the section header
    if (section.displayHorizontal) return null;

    // Render a more button
    if (item == 'viewMore') {
      return <ViewMoreBtn
        key={section.title + '_viewMore'}
        screenWidth={screenWidth}
        loadNextProductsInCategory={() => loadNextProductsInCategory(section.title)} />;
    }

    // Get two products at a time to display in a row together
    if (index % 2 > 0) return null;
    const rowItems = section.data.slice(index, index + 2);
    return (
      <View
        style={{
          width: screenWidth,
          flexDirection: 'row',
          alignItems: 'center',
        }}>{rowItems.map(item =>
        <ProductView
          key={section.title + '_' + item}
          displayName={section.idToDisplayData.get(item).displayName}
          image={section.idToDisplayData.get(item).image}
          url={section.idToDisplayData.get(item).url}
          isHorizontalItem={false}
          screenWidth={screenWidth}
          isLastHorizontalItem={false} />)}
      </View>
    );
  };

  // Render the component...
  return (
    <SectionList
      style={style(styles.container)}
      contentContainerStyle={style(styles.verticalList)}
      sections={sectionDatas}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false} />
  );
};

// Define styles
const styles: DynamicStylesheet = {
  container: ({ screenHeight, insetTop, }) => ({
    marginTop: screenHeight * SizeConstants.FEED.headerHeight + insetTop - (screenHeight * 0.03),
  }),
  verticalList: ({ screenWidth, }) => ({
    width: screenWidth,
    paddingBottom: 50,
  }),
};

const fetchNextProductIDs = async (prevSectionData: SectionData): Promise<SectionData | undefined> => {
  /**
   * @returns a new SectionData object for the category, containing the next batch of products IDs.
   */
  const productIDs = [...prevSectionData.data,];
  const batchNumber = prevSectionData.batchNumber;
  if (typeof batchNumber !== 'number') return;
  const searchResponse = await searchProductsInCategory(batchNumber, prevSectionData.title);
  if (productIDs.length > 0 && productIDs[productIDs.length - 1] == 'viewMore') {
    productIDs.pop();
  }
  productIDs.push(...searchResponse.productIDs);
  if (searchResponse.nextBatchIndex && !prevSectionData.displayHorizontal) {
    productIDs.push('viewMore');
  }
  return {
    title: prevSectionData.title,
    data: productIDs,
    batchNumber: searchResponse.nextBatchIndex,
    idToDisplayData: new Map(prevSectionData.idToDisplayData),
    displayHorizontal: prevSectionData.displayHorizontal,
  };
};

const ensureProductsDisplayData = async (sectionData: SectionData): Promise<SectionData> => {
  /**
   * Visits each product ID in the category and ensures that display data is available.
   */

    // Create a new map to put product display data into
  const idToDisplayData = new Map(sectionData.idToDisplayData);

  // Process each product ID that doesn't have display data
  for (const productID of sectionData.data) {
    if (idToDisplayData.has(productID) || productID == 'viewMore') continue;

    // Fetch product details
    const productDetails = await fetchProductDetails(productID);

    // Calculate product display data
    const displayData = {
      displayName: productDetails.name.length < 31 ? productDetails.name : productDetails.name.substring(0, 28).trim() + '...',
      image: productDetails.image,
      url: productDetails.url,
    };
    idToDisplayData.set(productID, displayData);
  }

  // Return a SectionData containing new product display data
  return {
    title: sectionData.title,
    data: [...sectionData.data,],
    batchNumber: sectionData.batchNumber,
    idToDisplayData: idToDisplayData,
    displayHorizontal: sectionData.displayHorizontal,
  };
};

// Don't re-render the component unless state or screen size changes
export default memo(withScreenSize(ProductCategoriesView));
