import { ScreenSizeProps } from '../../context/ScreenSizeContext';
import { SizeConstants } from '../../constant/SizeConstants';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import { DynamicStylesheet } from '../../hook/UseFelaNative';

export const MAIN_HEADER_STYLES: { styles: DynamicStylesheet, getStyleProps } = {
  styles: {
    headerContainer: ({ screenWidth, headerContentHeight, insetTop, topTabsVisible, }) => ({
      width: screenWidth,
      height: headerContentHeight + insetTop,
      borderBottomWidth: headerContentHeight * 0.015,
      shadowOpacity: topTabsVisible ? 0.0 : 0.3,
      shadowColor: 'gray',
      shadowRadius: headerContentHeight * 0.03,
      shadowOffset: { width: 0, height: headerContentHeight * 0.01, },
      backgroundColor: THEME_COLORS.extraLight,
      borderBottomColor: '#ececec',
    }),
    headerContentContainer: ({ screenWidth, headerContentHeight, insetTop, }) => ({
      width: screenWidth,
      height: headerContentHeight,
      marginTop: insetTop,
      flexDirection: 'column',
    }),
    logo: ({ logoWidth, logoHeight, }) => ({
      width: logoWidth,
      height: logoHeight,
      shadowRadius: logoHeight * 0.1,
      marginLeft: 'auto',
      marginRight: 'auto',
      shadowOpacity: 0.4,
      shadowColor: '#5ee352',
    }),
    headerBottomRow: ({ headerBottomRowTopMargin, headerBottomRowHorizontalPadding, }) => ({
      marginTop: headerBottomRowTopMargin,
      paddingLeft: headerBottomRowHorizontalPadding,
      paddingRight: headerBottomRowHorizontalPadding,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    addFriendsArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addFriendsBtnShadow: ({ headerBottomRowHeight, }) => ({
      borderWidth: headerBottomRowHeight * 0.02,
      borderRadius: headerBottomRowHeight * 0.5,
      shadowRadius: headerBottomRowHeight * 0.05,
      shadowOffset: { width: 0, height: headerBottomRowHeight * 0.03, },
      overflow: 'visible',
      borderColor: '#8dceef',
      shadowOpacity: 0.4,
      shadowColor: '#9adcfc',
    }),
    notificationsBtnShadow: ({ headerBottomRowHeight, }) => ({
      borderWidth: headerBottomRowHeight * 0.02,
      borderRadius: headerBottomRowHeight * 0.5,
      shadowRadius: headerBottomRowHeight * 0.05,
      shadowOffset: { width: 0, height: headerBottomRowHeight * 0.03, },
      overflow: 'visible',
      borderColor: '#9d9d9d',
      shadowOpacity: 0.3,
      shadowColor: '#606060',
    }),
    addFriendsBtn: ({ headerBottomRowHeight, }) => ({
      width: headerBottomRowHeight,
      height: headerBottomRowHeight,
    }),
    addFriendsText: ({ headerBottomRowHeight, }) => ({
      fontSize: headerBottomRowHeight * 0.45,
      marginLeft: headerBottomRowHeight * 0.3,
      textShadowRadius: headerBottomRowHeight * 0.06,
      textShadowColor: '#c8e8f7d2',
    }),
    searchArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cancelBtn: ({ cancelBtnWidth, }) => ({
      width: cancelBtnWidth,
      justifyContent: 'center',
    }),
    cancelBtnText: ({ cancelBtnWidth, headerBottomRowHeight, }) => ({
      fontSize: 0.7 * Math.sqrt((cancelBtnWidth * headerBottomRowHeight) / 'cancel'.length),
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
    notificationsPopup: {
      position: 'absolute',
    },
  },

  getStyleProps: (screenSize: ScreenSizeProps, insetTop, topTabsVisible) => {
    const { screenWidth, screenHeight, } = screenSize;
    const headerContentHeight = screenHeight * SizeConstants.FEED.headerHeight;
    const logoHeight = headerContentHeight * 0.4;
    const logoWidth = logoHeight * (2880 / 717);
    const headerBottomRowHeight = headerContentHeight * 0.35;
    const headerBottomRowTopMargin = 0.5 * (headerContentHeight - logoHeight - headerBottomRowHeight);
    const headerBottomRowHorizontalPadding = screenWidth * 0.053;
    const cancelBtnWidth = headerBottomRowHeight * 1.8;
    const searchResultsTopMargin = insetTop + logoHeight + headerBottomRowTopMargin + headerBottomRowHeight;
    const notificationsWidth = screenWidth - headerBottomRowHorizontalPadding * 2 - headerBottomRowHeight;
    const notificationsLeftMargin = headerBottomRowHorizontalPadding + headerBottomRowHeight * 0.5;
    const notificationsTopMargin = insetTop + logoHeight + headerBottomRowTopMargin + headerBottomRowHeight * 0.5;
    return {
      screenHeight,
      screenWidth,
      insetTop,
      topTabsVisible,
      headerContentHeight,
      logoHeight,
      logoWidth,
      headerBottomRowHeight,
      headerBottomRowTopMargin,
      headerBottomRowHorizontalPadding,
      cancelBtnWidth,
      searchResultsTopMargin,
      notificationsWidth,
      notificationsLeftMargin,
      notificationsTopMargin,
    };
  },
};
