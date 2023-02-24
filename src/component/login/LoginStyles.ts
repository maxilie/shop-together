import { THEME_COLORS } from '../../constant/ThemeConstants';
import { SizeConstants } from '../../constant/SizeConstants';
import { ScreenSizeProps } from '../../context/ScreenSizeContext';
import { DynamicStylesheet } from '../../hook/UseFelaNative';

export const LOGIN_STYLES: { styles: DynamicStylesheet, getStyleProps } = {
  styles: {
    title: ({ logoWidth, logoHeight, fieldVerticalMargin, }) => ({
      width: logoWidth,
      height: logoHeight,
      marginTop: fieldVerticalMargin * 1.1,
      marginBottom: fieldVerticalMargin * 2,
      resizeMode: 'contain',
      shadowOpacity: 0.2,
      shadowColor: '#5ee352',
      shadowRadius: logoHeight * 0.15,
    }),
    outerContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',

      // This color applies to the status bar
      backgroundColor: THEME_COLORS.light,
    },
    blankArea: ({ blankAreaHeight, }) => ({
      width: '100%',
      backgroundColor: THEME_COLORS.light,
      height: blankAreaHeight,
    }),
    container: ({ screenWidth, contentHeight, }) => ({
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: THEME_COLORS.extraLight,
      width: screenWidth,
      height: contentHeight,
    }),
    forgotPasswordText: ({ tabFontSize, fieldVerticalMargin, }) => ({
      color: '#404040',
      fontSize: tabFontSize * 0.7,
      marginTop: fieldVerticalMargin,
    }),
    profileArea: ({ screenWidth, fieldVerticalMargin, profileWidthHeight, }) => ({
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 0.15,
      shadowColor: '#52afde',
      width: screenWidth,
      marginTop: fieldVerticalMargin * 2,
      shadowRadius: profileWidthHeight * 0.4,
    }),
    profileImg: ({ profileWidthHeight, }) => ({
      borderColor: THEME_COLORS.blue,
      width: profileWidthHeight,
      height: profileWidthHeight,
      marginRight: profileWidthHeight * 0.22,
      borderRadius: profileWidthHeight * 0.5,
      borderWidth: profileWidthHeight * 0.03,
    }),
    profilePickBtn: ({ profileWidthHeight, fieldHeight, }) => ({
      backgroundColor: '#e1eefa',
      borderColor: '#d7e7f5',
      marginLeft: profileWidthHeight * 0.22,
      padding: fieldHeight * 0.13,
      paddingLeft: fieldHeight * 0.25,
      paddingRight: fieldHeight * 0.27,
      borderRadius: fieldHeight * 0.4,
      borderWidth: fieldHeight * 0.02,
    }),
    profilePickText: ({ tabFontSize, }) => ({
      color: '#5f6b78',
      fontWeight: 'bold',
      fontSize: tabFontSize * 0.8,
    }),
    faceIDText: ({ tabFontSize, fieldVerticalMargin, }) => ({
      color: '#1084b5',
      fontWeight: 'bold',
      fontSize: tabFontSize * 0.85,
      marginTop: fieldVerticalMargin * 1.2,
    }),
    faceIDTextSelected: {
      color: '#7298a8',
    },
    navigatorContainer: ({ insetTop, blankAreaHeight, }) => ({
      marginTop: insetTop + blankAreaHeight,
      backgroundColor: 'white',
      overflow: 'visible',
    }),
    screenContainer: {
      backgroundColor: 'white',
    },
    tabBarContainer: ({ tabAreaHeight, tabBorderWidth, }) => ({
      height: tabAreaHeight,
      borderTopWidth: tabBorderWidth,
      borderColor: '#f0f4f7',
    }),
    tabBarText: ({ tabFontSize, }) => ({
      fontSize: tabFontSize,
      fontWeight: 'bold',
    }),
    tabBarTextStyle: ({ tabAreaHeight, }) => ({
      backgroundColor: THEME_COLORS.extraLight,
      shadowOpacity: 0.6,
      shadowColor: '#e1e9ed',
      shadowRadius: tabAreaHeight * 0.12,
      shadowOffset: { width: 0, height: tabAreaHeight * 0.02, },
    }),
    tabBarItemStyle: ({ tabBorderWidth, }) => ({
      borderRightWidth: tabBorderWidth * 2,
      borderLeftWidth: tabBorderWidth * 2,
      borderColor: '#f2f8fc',
    }),
    tapToDismissKeyboard: ({ screenWidth, screenHeight, }) => ({
      position: 'absolute',
      width: screenWidth,
      height: screenHeight,
    }),
  },

  getStyleProps: (screenSize: ScreenSizeProps) => {
    const { screenWidth, screenHeight, } = screenSize;
    const blankAreaHeight = screenHeight * 0.06;
    const tabAreaHeight = screenHeight * SizeConstants.SIGN_IN_OUT.tabAreaHeight;
    const contentVerticalMargin = tabAreaHeight * SizeConstants.SIGN_IN_OUT.verticalMargin;
    const contentHeight = screenHeight - blankAreaHeight - tabAreaHeight - contentVerticalMargin;
    const tabBorderWidth = tabAreaHeight * 0.02;
    const tabFontSize = Math.sqrt((screenWidth * 0.5 * 0.6 * tabAreaHeight * 0.6) / ' Sign in '.length);
    const logoWidth = screenWidth * 0.8;
    const logoHeight = logoWidth * (1175 / 3216);
    const fieldHeight = tabAreaHeight * SizeConstants.SIGN_IN_OUT.fieldHeight;
    const fieldWidth = fieldHeight * 6;
    const fieldVerticalMargin = fieldHeight * 0.4;
    const profileWidthHeight = fieldHeight * 1.2;
    return {
      screenWidth,
      screenHeight,
      blankAreaHeight,
      tabAreaHeight,
      contentVerticalMargin,
      contentHeight,
      tabBorderWidth,
      tabFontSize,
      logoWidth,
      logoHeight,
      fieldHeight,
      fieldWidth,
      fieldVerticalMargin,
      profileWidthHeight,
    };
  },
};
