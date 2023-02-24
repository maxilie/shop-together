import { Text } from 'react-native';
import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import SquishyButton from './SquishyButton';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

type Props = {
  onSubmit: () => void;
  width: number;
  height: number;
  bntText: string;
  marginTop: number;
}

const SubmitBtn = (props: Props & ScreenSizeProp) => {

  // Get styles
  const style = useFelaNative({
    width: props.width,
    height: props.height,
    marginTop: props.marginTop,
    fontSize: props.height * 0.5,
  });

  // Render the component...
  return (
    <SquishyButton
      style={style(styles.container)}
      onPress={props.onSubmit}>
      <Text
        style={style(styles.text)}>{props.bntText}</Text>
    </SquishyButton>
  );
};

const styles: DynamicStylesheet = {
  container: ({ width, height, marginTop, }) => ({
    width: width,
    height: height,
    marginTop: marginTop,
    borderRadius: height * 0.2,
    shadowOpacity: 0.17,
    shadowColor: THEME_COLORS.blue,
    shadowRadius: height * 0.3,
    shadowOffset: { width: 0, height: height * 0.08, },
    backgroundColor: THEME_COLORS.blue,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',

  }),
  text: ({ fontSize, }) => ({
    fontWeight: 'bold',
    color: 'white',
    fontSize: fontSize,
  }),
};

export default withScreenSize(SubmitBtn);
