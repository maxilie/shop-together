// These are multiples of screen width or height
export const SizeConstants = {
  SIGN_IN_OUT: {
    submitBtnWidth: 0.8,
    tabAreaHeight: 0.055,
    verticalMargin: 0.5, // * tabAreaHeight
    fieldHeight: 1.15, // * tabAreaHeight
    submitBtnHeight: 1.05, // * fieldHeight
  },
  BOTTOM_TABS: {
    paddingBottom: 0.01, // + insets.bottom
    tabBarHeight: 0.04, // + paddingBottom
  },
  FEED: {
    headerHeight: 0.13,
    tabHeight: 0.05,
    postHeight: 0.4,
    commentsBtnHeight: 0.03,
  },
  SETTINGS: {
    headerHeight: 0.5, // * FEED.headerHeight
  },
};
