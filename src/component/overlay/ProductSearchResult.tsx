import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import * as WebBrowser from 'expo-web-browser';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

type Props = {
  width: number;
  height: number;
  productName: string;
  productUrl: string;
  isLastItem: boolean;
  productImage;
}

const ProductSearchResult = (props: Props) => {

  // Get styles
  const styleProps = getStyleProps(props);
  const style = useFelaNative(styleProps);

  // Define function to view the product within an in-app browser
  const openBrowser = async () => {
    await WebBrowser.openBrowserAsync(props.productUrl);
  };

  // Shorten product name if it's too long
  const productDisplayName = props.productName.length < 60 ? props.productName : props.productName.substring(0, 57).trim() + '...';

  // Render the component...
  return (
    <TouchableOpacity
      onPress={openBrowser}
      activeOpacity={0.75}
      style={style(styles.container)}>

      {/**
       * Product image
       */}
      <View
        style={style(styles.imgContainer)}>
        <Image
          defaultSource={props.productImage}
          source={props.productImage}
          style={style(styles.productImage)} />
      </View>

      {/**
       * Product name
       */}
      <View
        style={style(styles.nameContainer)}>
        <Text
          style={style(styles.nameText)}>{productDisplayName}</Text>
      </View>

    </TouchableOpacity>
  );
};

// Define style variables
const getStyleProps = (props: Props) => {
  const imgWidth = props.width * 0.2;
  const imgHeight = props.height * 0.7;
  return {
    width: props.width,
    height: props.height,
    isLastItem: props.isLastItem,
    imgWidth,
    imgHeight,
  };
};

// Define styles
const styles: DynamicStylesheet = {
  container: ({ width, height, isLastItem, }) => ({
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: isLastItem ? 0 : 2,
    borderBottomColor: 'lightgray',
  }),
  imgContainer: ({ imgWidth, imgHeight, imgLeftMargin, }) => ({
    width: imgWidth,
    height: imgHeight,
    marginLeft: 15,
    marginRight: 18,
  }),
  productImage: ({ imgWidth, imgHeight, }) => ({
    width: imgWidth,
    height: imgHeight,
    resizeMode: 'contain',
  }),
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  nameText: ({ height, }) => ({
    fontSize: height * 0.08,
    fontFamily: 'Montserrat_500Medium',
    color: '#2a2a2a',
  }),
};

export default memo(ProductSearchResult, (prevProps: Props, nextProps: Props) => prevProps.productUrl == nextProps.productUrl);
