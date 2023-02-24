import { Image, StyleSheet, Text, View } from 'react-native';
import { ScreenSizeProp, ScreenSizeProps, withScreenSize } from '../../context/ScreenSizeContext';
import { lightenHex, prettyFormatTime } from '../../util/Util';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { fetchProductDetails, UserPostResponse } from '../../util/APIUtil';
import SquishyButton from '../button/SquishyButton';
import * as WebBrowser from 'expo-web-browser';
import PostComments from './PostComments';
import { Product } from '../../type/Product';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

const UserPostView = (props: UserPostResponse & ScreenSizeProp) => {

  // Init state
  const [productDetails, setProductDetails,] = useState<Product>({
    name: 'Loading...',
    url: 'https://www.shop.com',
    image: require('../../../assets/default-products/default_product.png'),
  });

  // Load product details from shop API
  useEffect(() => {
    const loadProductDetails = async () => {
      const productDetails = await fetchProductDetails(props.postData.productID);
      setProductDetails(productDetails);
    };
    loadProductDetails();
  }, [props.postData.productID,]);

  // Make openBrowser() a callback to prevent unnecessary re-renders
  const openBrowser = useCallback(() => {
    const openBrowserAsync = async () => {
      await WebBrowser.openBrowserAsync(productDetails.url);
    };
    openBrowserAsync();
  }, [productDetails,]);

  // Get styles
  const styleProps = useMemo(() => getStyleProps(props.screenSize, props.postData.hasBought, productDetails.name), [props.postData.hasBought, productDetails.name,]);
  const style = useFelaNative(styleProps);

  // Render the component...
  return (
    <View
      style={style(styles.container)}>

      {/**
       * Top area
       */}
      <View
        style={style(styles.topArea)}>

        {/**
         * Top Row
         */}
        <View
          style={style(styles.topRow)}>

          {/**
           * Profile picture
           */}
          <Image
            style={style(styles.profileImage)}
            defaultSource={props.userData.image} />

          {/**
           * Profile name
           */}
          <Text
            style={style(styles.profileNameText)}>{props.userData.name}</Text>

          {/**
           * Time posted
           */}
          <Text
            style={style(styles.timeText)}>{prettyFormatTime(new Date(props.postData.timePosted))}</Text>

        </View>

        {/**
         * 'Bought' or 'thinking about buying' text
         */}
        <Text
          style={style(styles.boughtText)}>{props.postData.hasBought ? 'Just bought...' : 'Thinking about...'}</Text>

        {/**
         * Product area
         */}
        <SquishyButton
          onPress={openBrowser}
          style={style(styles.productContainer)}>

          {/**
           * Product title
           */}
          <Text
            style={style(styles.productTitle)}>{styleProps.productTruncatedName}</Text>

          {/**
           * Product image
           */}
          <Image
            style={style(styles.productImg)}
            defaultSource={productDetails.image} />
        </SquishyButton>

      </View>

      {/**
       * Bottom area
       */}
      <View
        style={style(styles.bottomArea)}>

        {/**
         * Post message
         */}
        <Text
          style={style(styles.messageText)}>{props.postData.message}</Text>

        {/**
         * Comments
         */}
        {props.postData.comments.length > 0 &&
          <PostComments
            color={styleProps.bgColor}
            comments={props.postData.comments} />}
      </View>

    </View>
  );
};

// Define style variables
const getStyleProps = (screenSize: ScreenSizeProps, hasBought, productName) => {
  const { screenWidth, screenHeight, } = screenSize;
  const containerWidth = screenWidth * 0.95;
  const padding = screenWidth * 0.04;
  const verticalMargin = screenHeight * 0.02;
  const profileWidthHeight = screenHeight * 0.04;
  const productWidth = containerWidth * 0.85;
  const productHeight = screenHeight * 0.18;
  const productVerticalMargin = productHeight * 0.08;
  const productTruncatedName = productName.length < 80 ? productName : productName.substring(0, 28) + '...';
  const productTitleFontSize = Math.max(profileWidthHeight * 0.53, Math.min(profileWidthHeight * 0.6, Math.sqrt((profileWidthHeight * 0.6 * productWidth) / productTruncatedName.length)));
  const productImgWidth = productWidth * 0.8;
  const productImgHeight = productHeight * 0.8;
  const bgColor = hasBought ? THEME_COLORS.postBought : THEME_COLORS.postThinkingAbout;
  return {
    screenWidth,
    screenHeight,
    containerWidth,
    padding,
    verticalMargin,
    profileWidthHeight,
    productWidth,
    productHeight,
    productVerticalMargin,
    productTruncatedName,
    productTitleFontSize,
    productImgWidth,
    productImgHeight,
    bgColor,
  };
};

// Define constant styles
const styles: DynamicStylesheet = {
  container: ({ containerWidth, bgColor, verticalMargin, }) => ({
    width: containerWidth,
    backgroundColor: lightenHex(bgColor, 25),
    borderColor: lightenHex(bgColor, -25),
    borderRadius: containerWidth * 0.02,
    shadowOpacity: 0.5,
    shadowColor: 'lightgray',
    shadowRadius: verticalMargin * 0.3,
    shadowOffset: { width: verticalMargin * 0.1, height: verticalMargin * 0.1, },
    marginTop: verticalMargin * 1.2,
    marginBottom: verticalMargin * 1.2,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: StyleSheet.hairlineWidth * 9,
  }),
  topArea: ({ padding, }) => ({
    width: '100%',
    padding: padding,
    paddingBottom: 0,
    flexDirection: 'column',
  }),
  bottomArea: ({ verticalMargin, padding, }) => ({
    width: '100%',
    paddingTop: verticalMargin * 0.8,
    paddingBottom: verticalMargin * 1.1,
    paddingLeft: padding,
    paddingRight: padding,
    flexDirection: 'column',
  }),
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: ({ profileWidthHeight, bgColor, }) => ({
    width: profileWidthHeight,
    height: profileWidthHeight,
    borderRadius: profileWidthHeight * 0.5,
    borderWidth: profileWidthHeight * 0.05,
    borderColor: lightenHex(bgColor, -20),
    shadowColor: lightenHex(bgColor, -40),
    shadowOpacity: 1.0,
    shadowRadius: profileWidthHeight * 0.5,
  }),
  profileNameText: ({ profileWidthHeight, }) => ({
    marginLeft: profileWidthHeight * 0.3,
    fontSize: profileWidthHeight * 0.55,
    fontFamily: 'RobotoCondensed_700Bold',
    color: '#3a3939',
  }),
  timeText: ({ profileWidthHeight, }) => ({
    fontSize: profileWidthHeight * 0.45,
    marginLeft: 'auto',
  }),
  boughtText: ({ verticalMargin, profileWidthHeight, bgColor, }) => ({
    marginTop: verticalMargin,
    fontSize: profileWidthHeight * 0.55,
    color: lightenHex(bgColor, -95),
    fontFamily: 'Montserrat_500Medium',
  }),
  productContainer: ({ productWidth, verticalMargin, bgColor, productHeight, }) => ({
    width: productWidth,
    marginTop: verticalMargin,
    marginBottom: verticalMargin * 1.1,
    paddingLeft: productWidth * 0.03,
    paddingRight: productWidth * 0.03,
    borderRadius: productWidth * 0.04,
    shadowOpacity: 0.3,
    shadowColor: lightenHex(bgColor, 30),
    shadowRadius: productHeight * 0.03,
    shadowOffset: { width: 0, height: productHeight * 0.02, },
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    flexDirection: 'column',
  }),
  productTitle: ({ productTitleFontSize, productVerticalMargin, }) => ({
    fontSize: productTitleFontSize,
    marginTop: productVerticalMargin,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay_400Regular',
  }),
  productImg: ({ productImgWidth, productImgHeight, productVerticalMargin, }) => ({
    width: productImgWidth,
    height: productImgHeight,
    marginTop: productVerticalMargin,
    marginBottom: productVerticalMargin,
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
  }),
  messageText: ({ profileWidthHeight, }) => ({
    fontSize: profileWidthHeight * 0.6,
    color: '#111111',
    fontFamily: 'Montserrat_400Regular',
  }),
};

// Only re-render the component when postID changes
export default memo(withScreenSize(UserPostView), (prevProps, nextProps) => {
  return prevProps.postData.postID == nextProps.postData.postID;
});
