import { Image, Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

// @ts-ignore
import { logo } from '../../../assets/logo.png';
import { UserData } from '../../type/UserData';
import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import { SizeConstants } from '../../constant/SizeConstants';
import SignInUpInput from '../input/SignInUpInput';
import SubmitBtn from '../button/SubmitBtn';
import { LOGIN_STYLES } from './LoginStyles';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

type Props = {
  setUserData: (userData: UserData) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  createUserData: () => UserData;
}

const SignIn = (props: Props & ScreenSizeProp) => {

  // Initialize state
  const [faceIDPressed, setFaceIDPressed,] = useState(false);

  // Create styles
  const styleProps = LOGIN_STYLES.getStyleProps(props.screenSize);
  const styles = LOGIN_STYLES.styles as DynamicStylesheet;
  const style = useFelaNative(styleProps);

  // Define function to handle Face ID
  const handleFaceID = useCallback(async () => {
    /**
     * Scan user's biometric ID (face or fingerprint) if possible.
     */
    const bioCapable = await LocalAuthentication.hasHardwareAsync();
    if (!bioCapable) return;
    const bioEnabled = await LocalAuthentication.isEnrolledAsync();
    if (!bioEnabled) return;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Use Biometric ID to sign in',
      disableDeviceFallback: true,
    });
    if (!result.success) return;

    // Set user data after user successfully authenticates
    props.setUserData(props.createUserData());
  }, [props.createUserData,]);

  // Render component
  return (
    /**
     * Tap-to-dismiss-keyboard area
     */
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}>

      {/**
       * Content container
       */}
      <View
        style={style(styles.container)}>

        {/**
         * Logo
         */}
        <Image
          defaultSource={require('../../../assets/logo.png')}
          style={style(styles.title)}
        />

        {/**
         * Name field
         */}
        <SignInUpInput
          width={styleProps.fieldWidth}
          height={styleProps.fieldHeight}
          placeholder={'Name'}
          value={props.username}
          setValue={props.setUsername}
          isPassword={false}
          marginTop={0}
          marginBottom={0} />

        {/**
         * Password field
         */}
        <SignInUpInput
          width={styleProps.fieldWidth}
          height={styleProps.fieldHeight}
          placeholder={'Password'}
          value={props.password}
          setValue={props.setPassword}
          isPassword={true}
          marginTop={styleProps.fieldVerticalMargin}
          marginBottom={0} />

        {/**
         * Forgot password button
         */}
        <Pressable>
          <Text
            style={style(styles.forgotPasswordText)}>Forgot Password?</Text>
        </Pressable>


        {/**
         * Submit button
         */}
        <SubmitBtn
          width={styleProps.screenWidth * SizeConstants.SIGN_IN_OUT.submitBtnWidth}
          height={styleProps.fieldHeight * SizeConstants.SIGN_IN_OUT.submitBtnHeight}
          bntText={'SIGN IN'}
          marginTop={styleProps.fieldVerticalMargin * 2}
          onSubmit={() => {
            props.setUserData(props.createUserData());
          }} />

        {/**
         * Face ID button
         */}
        <Pressable
          onPressIn={() => setFaceIDPressed(true)}
          onPressOut={() => setFaceIDPressed(false)}
          onPress={handleFaceID}>
          <Text
            style={[style(styles.faceIDText), faceIDPressed ? style(styles.faceIDTextSelected) : null,]}>Login
            with Face ID</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(withScreenSize(SignIn));
