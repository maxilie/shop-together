import { StyleSheet, View } from 'react-native';
import { ScreenSizeProp, withScreenSize } from '../context/ScreenSizeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { memo } from 'react';
import MainHeader from '../component/header/MainHeader';
import PostsView from '../component/post/PostsView';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { SizeConstants } from '../constant/SizeConstants';
import { THEME_COLORS } from '../constant/ThemeConstants';
import useIsReady from '../hook/ReadyDelay';
import BusyIndicator from '../component/BusyIndicator';
import MaterialTopTabBarWrapper from '../component/tab/MaterialTopTabBarWrapper';
import { TabVisibilityContext } from '../context/TabVisibilityContext';

const FeedNavigator = createMaterialTopTabNavigator();

const Feed = (props: ScreenSizeProp) => {

  // Get insets
  const insets = useSafeAreaInsets();

  // Store tab visibility context in state
  const [topTabsVisible, setTopTabsVisible,] = React.useState(true);

  // Show loading wheel for at least half a second
  // If this is not used, then there could be a delay after user logs in on a slow device
  const isReady = useIsReady();
  if (!isReady) return <BusyIndicator />;

  // Calculate component dimensions
  const { screenWidth, screenHeight, } = props.screenSize;
  const headerContentHeight = screenHeight * SizeConstants.FEED.headerHeight;
  const tabBarHeight = screenHeight * SizeConstants.FEED.tabHeight;

  // Define dynamic styles
  const dynStyles = StyleSheet.create({
    navigatorContainer: {
      marginTop: insets.top + headerContentHeight,
      backgroundColor: 'white',
    },
    screenContainer: {
      backgroundColor: 'white',
    },
    tabBarContainer: {
      height: tabBarHeight,
    },
    tabBarText: {
      fontSize: tabBarHeight * 0.37,
      fontWeight: 'bold',
    },
    tabBarTextStyle: {
      backgroundColor: THEME_COLORS.extraLight,
      shadowOpacity: 0.3,
      shadowColor: 'gray',
      shadowRadius: headerContentHeight * 0.03,
      shadowOffset: { width: 0, height: headerContentHeight * 0.06, },
    },
  });

  // Render the component...
  return (
    <TabVisibilityContext.Provider value={topTabsVisible}>

      {/**
       * Feed tabs
       */}
      <FeedNavigator.Navigator
        style={dynStyles.navigatorContainer}
        sceneContainerStyle={dynStyles.screenContainer}
        screenOptions={{
          tabBarPressOpacity: 0.8,
          tabBarContentContainerStyle: dynStyles.tabBarContainer,
          tabBarLabelStyle: dynStyles.tabBarText,
          tabBarStyle: dynStyles.tabBarTextStyle,
        }}
        initialRouteName='MyPosts'

        // Setting initial width supposedly aids performance
        initialLayout={{ width: screenWidth, }}
        tabBar={MaterialTopTabBarWrapper}
      >

        {/**
         * 'My Items' tab
         */}
        <FeedNavigator.Screen
          name='MyPosts'
          options={{ title: 'My Items',}}
        >
          {(props) =>
            <PostsView
              isMyPosts={true}
              setTabBarVisibility={setTopTabsVisible}
              {...props}
            />}
        </FeedNavigator.Screen>

        {/**
         * 'Following' tab
         */}
        <FeedNavigator.Screen
          name='FollowingPosts'
          options={{ title: 'Following', }}
        >
          {(props) =>
            <PostsView
              isMyPosts={false}
              setTabBarVisibility={setTopTabsVisible}
              {...props}
            />}
        </FeedNavigator.Screen>
      </FeedNavigator.Navigator>

      {/**
       * Header
       */}
      <View
        style={{ position: 'absolute', }}>
        <MainHeader />
      </View>

    </TabVisibilityContext.Provider>
  );
};

export default memo(withScreenSize(Feed));
