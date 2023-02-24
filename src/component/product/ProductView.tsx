import { memo, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';
import { THEME_COLORS } from '../../constant/ThemeConstants';

// Minimal primitive props needed to display a product
export type ItemDisplayData = {
  displayName: string;
  image;
  url: string;
  screenWidth: number;
  isHorizontalItem: boolean;
  isLastHorizontalItem: boolean;
}

const ProductView = (props: ItemDisplayData) => {

  // Make openBrowser() a callback to prevent unnecessary re-renders
  const openBrowser = useCallback(() => {
    const openBrowserAsync = async () => {
      await WebBrowser.openBrowserAsync(props.url);
    };
    openBrowserAsync();
  }, [props.url,]);

  // Get styles
  const style = useFelaNative(props);

  // Render the component...
  return (
    <View
      style={style(styles.outerContainer)}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={style(styles.container)}
        onPress={openBrowser}>
        <Image
          style={style(styles.productImg)}
          defaultSource={props.image} />
        <Text
          style={style(styles.name)}>{props.displayName ? props.displayName : 'Loading...'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define styles
const styles: DynamicStylesheet = {
  outerContainer: ({ isHorizontalItem, screenWidth, isLastHorizontalItem, }) => ({
    width: screenWidth * (isHorizontalItem ? 0.7 : 0.5),
    marginLeft: isHorizontalItem ? screenWidth * 0.05 : 0,
    marginTop: screenWidth * 0.05,
    marginRight: isLastHorizontalItem ? screenWidth * 0.25 : 0,
    justifyContent: 'center',
    alignItems: isHorizontalItem ? 'flex-start' : 'center',
    alignSelf: isHorizontalItem ? 'flex-start' : 'center',
  }),
  container: ({ isHorizontalItem, }) => ({
    width: isHorizontalItem ? '100%' : '80%',
    height: 170,
    borderRadius: 3,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    shadowColor: THEME_COLORS.light,
    shadowRadius: 7,
    shadowOpacity: 0.9,
  }),
  productImg: ({ isHorizontalItem, }) => ({
    width: '80%',
    height: isHorizontalItem ? 100 : 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 15,
    resizeMode: 'contain',
  }),
  name: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 'auto',
    fontFamily: 'PlayfairDisplay_400Regular',
  },
};

export default memo(ProductView);
