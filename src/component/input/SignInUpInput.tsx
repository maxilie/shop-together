import { StyleSheet, TextInput } from 'react-native';
import { THEME_COLORS } from '../../constant/ThemeConstants';

type Props = {
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  width: number;
  height: number;
  isPassword: boolean;
  marginTop: number;
  marginBottom: number;
}

const SignInUpInput = (props: Props) => {

  // Calculate dynamic styles
  const dynStyles = StyleSheet.create({
    container: {
      width: props.width,
      height: props.height,
      padding: props.height * 0.05,
      paddingLeft: props.height * 0.2,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      borderWidth: props.height * 0.02,
      borderRadius: props.height * 0.2,
      borderColor: '#5797bd',
      fontSize: props.height * 0.35,
      backgroundColor: THEME_COLORS.extraLight,
      shadowOpacity: 0.9,
      shadowColor: '#e3f4fc',
      shadowRadius: props.height * 0.09,
    },
  });

  // Render component
  return (
    <TextInput
      secureTextEntry={props.isPassword}
      value={props.value}
      onChange={e => props.setValue(e.nativeEvent.text)}
      placeholder={props.placeholder}
      style={dynStyles.container}
      placeholderTextColor={'#464747'}
      maxLength={20}
      allowFontScaling={false}
      autoCapitalize={'none'}
      autoComplete={'off'}
      clearButtonMode={'while-editing'}
      selectionColor={'#404040'}
    />
  );
};

export default SignInUpInput;
