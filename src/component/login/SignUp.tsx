import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { memo } from 'react';

// @ts-ignore
import { logo } from '../../../assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import { UserData } from '../../type/UserData';
import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import { SizeConstants } from '../../constant/SizeConstants';
import SignInUpInput from '../input/SignInUpInput';
import SubmitBtn from '../button/SubmitBtn';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';
import { LOGIN_STYLES } from './LoginStyles';

type Props = {
  setUserData: (userData: UserData) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (confirmPassword: string) => void;
  selectedImage;
  setSelectedImage;
  createUserData: () => UserData;
}

const SignUp = (props: Props & ScreenSizeProp) => {

  // Create styles
  const styleProps = LOGIN_STYLES.getStyleProps(props.screenSize);
  const styles = LOGIN_STYLES.styles as DynamicStylesheet;
  const style = useFelaNative(styleProps);

  // Define function to handle image picker
  const handlePickProfile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      props.setSelectedImage(result.assets[0].uri);
    }
  };

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
         * Confirm password field
         */}
        <SignInUpInput
          width={styleProps.fieldWidth}
          height={styleProps.fieldHeight}
          placeholder={'Confirm Password'}
          value={props.passwordConfirm}
          setValue={props.setPasswordConfirm}
          isPassword={true}
          marginTop={styleProps.fieldVerticalMargin}
          marginBottom={0} />

        {/**
         * Profile picture area
         */}
        <TouchableOpacity
          hitSlop={{ left: -styleProps.screenWidth * 0.07, right: -styleProps.screenWidth * 0.07, }}
          activeOpacity={0.9}
          onPress={handlePickProfile}
          style={style(styles.profileArea)}>
          <Image
            source={props.selectedImage !== null
              ? { uri: props.selectedImage, }
              : require('../../../assets/default_profile.png')}
            defaultSource={require('../../../assets/default_profile.png')}
            style={style(styles.profileImg)}
          />
          <View
            style={style(styles.profilePickBtn)}>
            <Text
              style={style(styles.profilePickText)}>Choose Profile Picture</Text>
          </View>
        </TouchableOpacity>

        {/**
         * Submit button
         */}
        <SubmitBtn
          width={styleProps.screenWidth * SizeConstants.SIGN_IN_OUT.submitBtnWidth}
          height={styleProps.fieldHeight * SizeConstants.SIGN_IN_OUT.submitBtnHeight}
          bntText={'SIGN UP'}
          marginTop={styleProps.fieldVerticalMargin * 2}
          onSubmit={() => {
            props.setUserData(props.createUserData());
          }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(withScreenSize(SignUp));
