import { UserData } from '../type/UserData';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { ScreenSizeProp, withScreenSize } from '../context/ScreenSizeContext';
import React, { useCallback, useState } from 'react';

// @ts-ignore
import { logo } from '../../assets/logo.png';
import { getDummyPost } from '../constant/DummyData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialTopTabBarWrapper from '../component/tab/MaterialTopTabBarWrapper';
import SignIn from '../component/login/SignIn';
import SignUp from '../component/login/SignUp';
import { LOGIN_STYLES } from '../component/login/LoginStyles';
import { useFelaNative } from '../hook/UseFelaNative';
import useIsReady from '../hook/ReadyDelay';
import BusyIndicator from '../component/BusyIndicator';

const SignInUpNavigator = createMaterialTopTabNavigator();

type Props = {
  setUserData: (userData: UserData) => void;
}

const SignInUpPage = (props: Props & ScreenSizeProp) => {

  // Initialize state
  const [username, setUsername,] = useState('');
  const [password, setPassword,] = useState('');
  const [passwordConfirm, setPasswordConfirm,] = useState('');
  const [selectedImage, setSelectedImage,] = useState(null);

  // Create styles
  const styleProps = {
    ...LOGIN_STYLES.getStyleProps(props.screenSize),
    insetTop: useSafeAreaInsets().top,
  };
  const style = useFelaNative(styleProps);
  const styles = LOGIN_STYLES.styles;

  // Define function to create user data
  const createUserData = useCallback((): UserData => {
    return {
      name: username || 'Test User',
      posts: [
        getDummyPost(),
        getDummyPost(),
        getDummyPost(),
        getDummyPost(),
        getDummyPost(),
        getDummyPost(),
      ],
      isFollowed: false,
      image: selectedImage !== null
        ? { uri: selectedImage, }
        : require('../../assets/default_profile.png'),
    };
  }, [username, selectedImage,]);

  // Show loading wheel for at least half a second
  // If this is not used, then there could be a delay after user logs out on a slow device
  const isReady = useIsReady();
  if (!isReady) return <BusyIndicator />;

  // Render component
  return (
    <>
      {/**
       * Tap-to-dismiss-keyboard area
       */}
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View
          style={style(styles.tapToDismissKeyboard)} />
      </TouchableWithoutFeedback>

      {/**
       * Tab buttons area
       */}
      <SignInUpNavigator.Navigator
        style={style(styles.navigatorContainer)}
        sceneContainerStyle={style(styles.screenContainer)}
        screenOptions={{
          tabBarPressOpacity: 0.8,
          tabBarContentContainerStyle: style(styles.tabBarContainer),
          tabBarLabelStyle: style(styles.tabBarText),
          tabBarStyle: style(styles.tabBarTextStyle),
        }}
        initialRouteName='SignIn'

        // Setting initial width supposedly aids performance
        initialLayout={{ width: styleProps.screenWidth, }}
        tabBar={MaterialTopTabBarWrapper}
      >

        {/**
         * 'Sign In' tab
         */}
        <SignInUpNavigator.Screen
          name='SignIn'
          options={{
            title: 'Sign In',
          }}
        >
          {(navProps) =>
            <SignIn
              setUserData={props.setUserData}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              createUserData={createUserData}
              {...navProps}
            />}
        </SignInUpNavigator.Screen>

        {/**
         * 'Sign Up' tab
         */}
        <SignInUpNavigator.Screen
          name='SignUp'
          options={{
            title: 'Sign Up',
          }}
        >
          {(navProps) =>
            <SignUp
              setUserData={props.setUserData}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              passwordConfirm={passwordConfirm}
              setPasswordConfirm={setPasswordConfirm}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              createUserData={createUserData}
              {...navProps}
            />}
        </SignInUpNavigator.Screen>
      </SignInUpNavigator.Navigator>
    </>
  );
};

export default withScreenSize(SignInUpPage);
