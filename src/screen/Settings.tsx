import SettingsHeader from '../component/header/SettingsHeader';
import SubmitBtn from '../component/button/SubmitBtn';
import { SizeConstants } from '../constant/SizeConstants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenSizeProp, withScreenSize } from '../context/ScreenSizeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME_COLORS } from '../constant/ThemeConstants';

type Props = {
  signOutFunc: () => void;
}

const Settings = (props: Props & ScreenSizeProp) => {

  // Get insets
  const insets = useSafeAreaInsets();

  // Calculate component dimensions
  const screenWidth = props.screenSize.screenWidth;
  const screenHeight = props.screenSize.screenHeight;
  const mainHeaderContentHeight = screenHeight * SizeConstants.FEED.headerHeight;
  const settingsHeaderContentHeight = mainHeaderContentHeight * SizeConstants.FEED.headerHeight;
  const submitBtnHeight = screenHeight * SizeConstants.SIGN_IN_OUT.tabAreaHeight * SizeConstants.SIGN_IN_OUT.fieldHeight * SizeConstants.SIGN_IN_OUT.submitBtnHeight;

  // Define dynamic styles
  const dynStyles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingTop: settingsHeaderContentHeight + insets.top,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  // Render the component...
  return (
    <>

      {/**
       * Content container
       */}
      <View
        style={dynStyles.contentContainer}>

        {/**
         * Sign out button
         */}
        <SubmitBtn
          onSubmit={props.signOutFunc}
          width={screenWidth * SizeConstants.SIGN_IN_OUT.submitBtnWidth}
          height={submitBtnHeight}
          bntText='Sign Out'
          marginTop={0} />
      </View>

      {/**
       * Header
       */}
      <View
        style={{ position: 'absolute', }}>
        <SettingsHeader signOutFunc={props.signOutFunc} />
      </View>

    </>
  );
};

export default withScreenSize(Settings);
