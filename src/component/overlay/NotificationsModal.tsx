import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import { SizeConstants } from '../../constant/SizeConstants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

type Props = {
  width: number;
  height: number;
  marginTop: number;
  marginLeft: number;
  closeBtnWidth: number;
  closeBtnMarginLeft: number;
  onClose: () => void;
}

const NotificationsModal = (props: Props & ScreenSizeProp) => {

  // Get styles
  const insets = useSafeAreaInsets();
  const styleProps = getStyleProps(props, insets.top, insets.bottom);
  const style = useFelaNative(styleProps);

  // Render the component...
  return (
    <>

      {/**
       * Press-to-close area
       */}
      <TouchableOpacity
        onPress={props.onClose}
        style={style(styles.pressToClose)} />

      {/**
       * Notifications area
       */}
      <View
        style={style(styles.container)}>

        {/**
         * Title text
         */}
        <Text
          style={style(styles.titleText)}>NOTIFICATIONS</Text>

        {/**
         * No notifications area
         */}
        <View
          style={style(styles.noNewArea)}
        >
          <Image
            style={style(styles.bellIcon)}
            defaultSource={require('../../../assets/bell_2_icon.png')} />
          <Text
            style={style(styles.noNewText)}>No new notifications</Text>

        </View>
      </View>

      {/**
       * Close button
       */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onClose}
        style={style(styles.closeBtnContainer)}>
        <Image
          style={style(styles.closeBtn)}
          defaultSource={require('../../../assets/x_icon.png')}
        />
      </TouchableOpacity>

    </>
  );
};

// Define style variables
const getStyleProps = (props: Props & ScreenSizeProp, insetTop, insetBottom) => {
  const { screenWidth, screenHeight, } = props.screenSize;
  const tabBarPaddingBottom = screenHeight * SizeConstants.BOTTOM_TABS.paddingBottom + insetBottom;
  const tabBarHeight = screenHeight * SizeConstants.BOTTOM_TABS.tabBarHeight + tabBarPaddingBottom;
  const headerHeight = screenHeight * SizeConstants.FEED.headerHeight;
  return {
    screenWidth,
    screenHeight,
    tabBarPaddingBottom,
    tabBarHeight,
    headerHeight,
    insetTop,
    width: props.width,
    height: props.height,
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    closeBtnWidth: props.closeBtnWidth,
    closeBtnMarginLeft: props.closeBtnMarginLeft,
  };
};

// Define styles
const styles: DynamicStylesheet = {
  container: ({ width, height, marginTop, marginLeft, }) => ({
    width: width,
    height: height,
    marginTop: marginTop,
    marginLeft: marginLeft,
    borderRadius: width * 0.02,
    shadowOpacity: 0.5,
    shadowColor: 'gray',
    shadowRadius: width * 0.01,
    shadowOffset: { width: 0, height: width * 0.002, },
    backgroundColor: THEME_COLORS.extraLight,
  }),
  titleText: ({ closeBtnWidth, height, }) => ({
    marginTop: closeBtnWidth * 0.6,
    fontSize: height * 0.05,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  }),
  bellIcon: ({ closeBtnWidth, }) => ({
    width: closeBtnWidth * 2,
    height: closeBtnWidth * 2,
  }),
  closeBtnContainer: ({ marginTop, closeBtnWidth, closeBtnMarginLeft, }) => ({
    position: 'absolute',
    marginTop: marginTop - closeBtnWidth * 0.5,
    marginLeft: closeBtnMarginLeft,
  }),
  closeBtn: ({ closeBtnWidth, }) => ({
    width: closeBtnWidth,
    height: closeBtnWidth,
  }),
  noNewArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  noNewText: ({ closeBtnWidth, height, }) => ({
    marginTop: closeBtnWidth * 0.6,
    fontSize: height * 0.04,
    color: '#363638',
  }),
  pressToClose: ({ screenWidth, screenHeight, tabBarHeight, headerHeight, insetTop,}) => ({
    width: screenWidth,
    height: screenHeight - tabBarHeight - headerHeight - insetTop,
    marginTop: headerHeight + insetTop,
    backgroundColor: '#a6a9abc9',
    position: 'absolute',
  }),
};

export default withScreenSize(NotificationsModal);
