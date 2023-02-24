import { Image, TouchableOpacity } from 'react-native';
import { THEME_COLORS } from '../../constant/ThemeConstants';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';

const ICONS = {
  shop: require('../../../assets/shop_icon.png'),
  feed: require('../../../assets/comment_icon.png'),
  settings: require('../../../assets/settings_icon.png'),
};

type Props = {
  isFocused: boolean;
  name: string;
  onPress: () => void;
  areaWidth: number;
  areaHeight: number;
  tabWidthHeight: number;
}

const CustomBottomTab = (props: Props) => {

  // Get styles
  const style = useFelaNative({
    areaWidth: props.areaWidth,
    areaHeight: props.areaHeight,
    tabWidthHeight: props.tabWidthHeight,
    isFocused: props.isFocused,
    isLastItem: props.name.toLowerCase() == 'settings',
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={style(styles.container)}>
      <Image
        source={ICONS[props.name.toLowerCase()]}
        style={style(styles.tabImg)} />
    </TouchableOpacity>
  );
};

// Define dynamic styles
const styles: DynamicStylesheet = {
  container: ({ areaWidth, areaHeight, isLastItem, tabWidthHeight, }) => ({
    width: areaWidth,
    height: areaHeight,
    borderRightWidth: isLastItem ? 0 : tabWidthHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#d8dee3',
  }),
  tabImg: ({ tabWidthHeight, isFocused, }) => ({
    transform: [{ scale: 0.85, },], // Scale down the icon so that border is taller than icon
    width: tabWidthHeight,
    height: tabWidthHeight,
    tintColor: isFocused ? THEME_COLORS.blue : 'black',
  }),
};

export default CustomBottomTab;
