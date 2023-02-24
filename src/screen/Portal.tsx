import { useEffect, useState } from 'react';
import { Dimensions, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import { Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { NothingYouCouldDo_400Regular } from '@expo-google-fonts/nothing-you-could-do';
import { PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';
import Home from './Home';
import SignInUpPage from './SignInUpPage';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from '../context/UserContext';
import { ScreenSizeProvider } from '../context/ScreenSizeContext';
import { createRenderer } from 'fela-native';
import { RendererProvider } from 'react-fela';

// Create providers
const PortalStack = createStackNavigator();
const felaRenderer = createRenderer();

// Show splash screen while fonts are loading
SplashScreen.preventAutoHideAsync();

const Portal = () => {

  // Set state vars
  const [user, setUser,] = useState({ signedIn: false, userData: undefined, });
  const [screenSize, setScreenSize,] = useState({
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    statusBarHeight: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
  });

  // Listen for changes to screen size
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, }) => {
      setScreenSize({
        screenWidth: window.width,
        screenHeight: window.height,
        statusBarHeight: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
      });
    });
    return () => subscription?.remove();
  });

  // Load fonts asynchronously while splash screen is visible
  useEffect(() => {
    async function prepare() {
      try {

        // Load fonts
        await Font.loadAsync({
          RobotoCondensed_400Regular,
          RobotoCondensed_700Bold,
          Montserrat_400Regular,
          Montserrat_500Medium,
          NothingYouCouldDo_400Regular,
          PlayfairDisplay_400Regular,
          PlayfairDisplay_600SemiBold,
        })

          // Mark fonts as loaded and hide splash screen on a delay (allowing for content to render)
          .then(() => {
            setTimeout(() => SplashScreen.hideAsync(), 400);
          });
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  });

  // Define sign out function
  const signOut = () => {
    setUser({ signedIn: false, userData: undefined, });
  };

  // Show content...
  return (
    <RendererProvider renderer={felaRenderer}>
      <ScreenSizeProvider value={screenSize}>
        <UserProvider value={user}>
          <SafeAreaProvider>

            {/**
             * Status bar text
             */}
            <StatusBar barStyle={'dark-content'} />

            {/**
             * Navigation: home page or sign-in/up page
             */}
            <PortalStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              {(user.signedIn && user.userData) ?
                <PortalStack.Screen
                  name='Home'
                >
                  {(props) =>
                    <Home signOutFunc={signOut} />}
                </PortalStack.Screen>
                :
                <PortalStack.Screen
                  name='Sign In'
                  options={{
                    animationTypeForReplace: 'pop',
                  }}>
                  {(props) => {
                    return <SignInUpPage  {...props} setUserData={(userData) => setUser({
                      signedIn: true,
                      userData,
                    })} />;
                  }}</PortalStack.Screen>}
            </PortalStack.Navigator>

          </SafeAreaProvider>
        </UserProvider>
      </ScreenSizeProvider>
    </RendererProvider>
  );
};

export default Portal;
