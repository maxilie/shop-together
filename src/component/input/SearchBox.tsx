import { StyleSheet, TextInput } from 'react-native';
import { THEME_COLORS } from '../../constant/ThemeConstants';

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  width: number;
  height: number;
  onFocus?: () => void;
}

const SearchBox = (props: Props) => {

  // Calculate dynamic styles
  const dynStyles = StyleSheet.create({
    container: {
      width: props.width,
      height: props.height,
      padding: props.height * 0.05,
      paddingLeft: props.height * 0.2,
      borderWidth: props.height * 0.02,
      borderRadius: props.height * 0.5,
      borderColor: '#5797bd',
      fontSize: props.height * 0.35,
      backgroundColor: THEME_COLORS.extraLight,
      shadowOpacity: 0.9,
      shadowColor: '#e3f4fc',
      shadowRadius: props.height * 0.09,
    },
  });

  // Render component...
  return (
    <TextInput
      value={props.value}
      onChange={e => props.onChange(e.nativeEvent.text)}
      placeholder={props.placeholder}
      style={dynStyles.container}
      placeholderTextColor={'#464747'}
      maxLength={26}
      allowFontScaling={false}
      autoCapitalize={'none'}
      autoComplete={'off'}
      clearButtonMode={'while-editing'}
      selectionColor={'#404040'}
      onFocus={props.onFocus}
      autoFocus={false}
    />
  );
};

export default SearchBox;
