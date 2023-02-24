import { ScreenSizeProp, ScreenSizeProps, withScreenSize } from '../../context/ScreenSizeContext';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { memo, useEffect, useState } from 'react';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import SearchBox from '../input/SearchBox';
import SearchResults from '../overlay/SearchResults';
import { SizeConstants } from '../../constant/SizeConstants';
import { Product } from '../../type/Product';
import ProductSearchResult from '../overlay/ProductSearchResult';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';
import { searchProductsInCategory } from '../../util/APIUtil';
import { DUMMY_PRODUCTS } from '../../constant/DummyData';

const ShopHeader = (props: ScreenSizeProp) => {

  // Init state vars
  const [searchOverlayVisible, setSearchOverlayVisible,] = useState(false);
  const [searchQuery, setSearchQuery,] = useState('');
  const [searchResults, setSearchResults,] = useState<Array<Product>>([]);

  // Update search results when searchQuery changes
  useEffect(() => {
    const getSearchResults = async (): Promise<Array<Product>> => {
      const result = await searchProductsInCategory(0, undefined, searchQuery);
      return result.productIDs.map(productID => DUMMY_PRODUCTS[productID]);
    };

    getSearchResults().then((results) => {
      setSearchResults(results);
    });
  }, [searchQuery,]);

  // Get styles
  const insets = useSafeAreaInsets();
  const styleProps = getStyleProps(props.screenSize, insets.top);
  const style = useFelaNative(styleProps);

  // Render the component...
  return (
    <>

      {/**
       * Header containers
       */}
      <View
        style={style(styles.headerContainer)}>
        <View
          style={style(styles.headerContentContainer)}>

          {/**
           * Title
           */}
          <Text
            style={style(styles.title)}
          >Browse</Text>

          {/**
           * Search row
           */}
          <View
            style={style(styles.searchRow)}>

            {/**
             * Search box
             */}
            <View
              style={style(styles.searchBox)}>
              <SearchBox
                width={styleProps.searchBoxWidth}
                height={styleProps.searchBoxHeight}
                onChange={setSearchQuery}
                placeholder='Search Products'
                value={searchQuery}
                onFocus={() => setSearchOverlayVisible(true)}
              />
            </View>

            {/**
             * Cancel button
             */}
            {searchOverlayVisible &&
              <TouchableOpacity
                activeOpacity={0.8}
                style={style(styles.cancelBtn)}
                onPress={() => {
                  setSearchOverlayVisible(false);
                  Keyboard.dismiss();
                }}>
                <Text
                  style={style(styles.cancelBtnText)}>Cancel</Text>
              </TouchableOpacity>}
          </View>
        </View>
      </View>

      {/**
       * Gray-out area
       */}
      {searchOverlayVisible &&
        <TouchableOpacity
          activeOpacity={1}
          style={style(styles.grayOutArea)}
          onPress={() => {
            setSearchOverlayVisible(false);
            Keyboard.dismiss();
          }} />}

      {/**
       * Search results overlay
       */}
      {searchOverlayVisible &&
        <SearchResults
          width={styleProps.searchResultsWidth}
          minHeight={styleProps.headerContentHeight}
          maxHeight={(styleProps.screenHeight - styleProps.searchResultsTopMargin) * 0.7}
          marginTop={styleProps.searchResultsTopMargin + styleProps.searchBoxHeight * 0.25}
          marginLeft={0.5 * (styleProps.screenWidth - styleProps.searchResultsWidth)}>
          {searchResults.map((product: Product, index, array) =>
            <ProductSearchResult
              key={product.name + '_' + product.url}
              width={styleProps.searchResultsWidth}
              height={styleProps.searchResultHeight}
              productName={product.name}
              productUrl={product.url}
              productImage={product.image}
              isLastItem={index == array.length - 1} />)
          }
        </SearchResults>
      }
    </>
  );
};


// Define style variables
const getStyleProps = (screenSize: ScreenSizeProps, insetTop) => {
  const { screenWidth, screenHeight, } = screenSize;
  const headerContentHeight = screenHeight * SizeConstants.FEED.headerHeight;
  const titleHeight = headerContentHeight * 0.26;
  const searchBoxHeight = headerContentHeight * 0.35;
  const searchBoxMarginTopBottom = 0.45 * (headerContentHeight - titleHeight - searchBoxHeight);
  const searchBoxWidth = screenWidth * 0.6;
  const searchBoxMarginLeft = 0.5 * (screenWidth - searchBoxWidth);
  const cancelBtnWidth = searchBoxHeight * 1.8;
  const searchResultsTopMargin = insetTop + titleHeight + searchBoxMarginTopBottom + searchBoxHeight;
  const searchResultsWidth = searchBoxWidth * 1.2;
  const searchResultHeight = screenHeight * 0.15;
  return {
    insetTop,
    screenWidth,
    screenHeight,
    headerContentHeight,
    titleHeight,
    searchBoxHeight,
    searchBoxMarginTopBottom,
    searchBoxWidth,
    searchBoxMarginLeft,
    cancelBtnWidth,
    searchResultsTopMargin,
    searchResultsWidth,
    searchResultHeight,
  };
};

// Define styles
const styles: DynamicStylesheet = {
  headerContainer: ({ screenWidth, headerContentHeight, insetTop, }) => ({
    width: screenWidth,
    height: headerContentHeight + insetTop,
    borderBottomWidth: headerContentHeight * 0.01,
    shadowOpacity: 0.5,
    shadowColor: 'lightgray',
    shadowRadius: headerContentHeight * 0.13,
    shadowOffset: { width: 0, height: headerContentHeight * 0.05, },
    backgroundColor: THEME_COLORS.extraLight,
    borderBottomColor: '#f6f6f6',
  }),
  headerContentContainer: ({ screenWidth, headerContentHeight, insetTop, }) => ({
    width: screenWidth,
    height: headerContentHeight,
    marginTop: insetTop,
    flexDirection: 'column',
  }),
  title: ({ titleHeight, }) => ({
    fontSize: titleHeight,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#363636',
  }),
  searchRow: ({ searchBoxMarginTopBottom, }) => ({
    marginTop: searchBoxMarginTopBottom,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  searchBox: ({ searchBoxMarginLeft, }) => ({
    marginLeft: searchBoxMarginLeft,
  }),
  cancelBtn: ({ cancelBtnWidth, }) => ({
    width: cancelBtnWidth,
    justifyContent: 'center',
  }),
  cancelBtnText: ({ cancelBtnWidth, searchBoxHeight, }) => ({
    fontSize: 0.7 * Math.sqrt((cancelBtnWidth * searchBoxHeight) / 'cancel'.length),
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#3b3c3d',
  }),
  grayOutArea: ({ screenWidth, screenHeight, headerContentHeight, insetTop, }) => ({
    width: screenWidth,
    height: screenHeight - headerContentHeight - insetTop,
    marginTop: insetTop + headerContentHeight,
    position: 'absolute',
    backgroundColor: '#a6a9abc9',
  }),
  searchResultsPopup: {
    position: 'absolute',
  },
};

export default memo(withScreenSize(ShopHeader));
