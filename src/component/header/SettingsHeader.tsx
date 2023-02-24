import { ScreenSizeProp, ScreenSizeProps, withScreenSize } from '../../context/ScreenSizeContext';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import { SizeConstants } from '../../constant/SizeConstants';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

const SettingsHeader = (props: ScreenSizeProp) => {

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
          >Settings</Text>

        </View>
      </View>

    </>
  );
};

// Define style variables
const getStyleProps = (screenSize: ScreenSizeProps, insetTop) => {
  const { screenWidth, screenHeight, } = screenSize;
  const mainHeaderContentHeight = screenHeight * SizeConstants.FEED.headerHeight;
  const settingsHeaderContentHeight = mainHeaderContentHeight * SizeConstants.SETTINGS.headerHeight;
  const titleHeight = mainHeaderContentHeight * 0.26;
  return {
    screenWidth,
    screenHeight,
    insetTop,
    mainHeaderContentHeight,
    settingsHeaderContentHeight,
    titleHeight,
  };
};

// Define styles
const styles: DynamicStylesheet = {
  headerContainer: ({ screenWidth, settingsHeaderContentHeight, insetTop, mainHeaderContentHeight, }) => ({
    width: screenWidth,
    height: settingsHeaderContentHeight + insetTop,
    borderBottomWidth: settingsHeaderContentHeight * 0.02,
    shadowOpacity: 0.5,
    shadowColor: 'lightgray',
    shadowRadius: mainHeaderContentHeight * 0.13,
    shadowOffset: { width: 0, height: mainHeaderContentHeight * 0.05, },
    backgroundColor: THEME_COLORS.extraLight,
    borderBottomColor: THEME_COLORS.extraLightBlue,
  }),
  headerContentContainer: ({ screenWidth, settingsHeaderContentHeight, insetTop, }) => ({
    width: screenWidth,
    height: settingsHeaderContentHeight,
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
};

export default withScreenSize(SettingsHeader);
