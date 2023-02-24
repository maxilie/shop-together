import Shop from './Shop';
import Feed from './Feed';
import Settings from './Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTabBar from '../component/tab/CustomBottomTabsBar';
import React from 'react';

const HomeTabs = createBottomTabNavigator();

type Props = {
  signOutFunc: () => void;
}

const Home = (props: Props) => {

  // Render component...
  return (
    /**
     * Bottom-of-page tabs
     */
    <HomeTabs.Navigator
      initialRouteName='Feed'
      screenOptions={{ headerShown: false, }}
      tabBar={(props) => <CustomBottomTabBar {...props} />}>

      {/**
       * Shopping tab
       */}
      <HomeTabs.Screen
        name='Shop'
        component={Shop}
      />

      {/**
       * Feed tab
       */}
      <HomeTabs.Screen
        name='Feed'
        component={Feed}
      />

      {/**
       * Settings tab
       */}
      <HomeTabs.Screen
        name='Settings'
      >
        {(navProps) =>
          <Settings signOutFunc={props.signOutFunc} {...navProps} />}
      </HomeTabs.Screen>

    </HomeTabs.Navigator>
  );
};

export default Home;
