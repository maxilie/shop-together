import { StyleSheet, View } from 'react-native';
import { ScreenSizeProp, withScreenSize } from '../../context/ScreenSizeContext';
import CustomBottomTab from './CustomBottomTab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SizeConstants } from '../../constant/SizeConstants';

const NUM_TABS = 3;

type Props = {
  state;
  descriptors;
  navigation;
}

const CustomBottomTabsBar = (props: Props & ScreenSizeProp) => {

  // Get insets
  const insets = useSafeAreaInsets();

  // Calculate component dimensions
  const screenWidth = props.screenSize.screenWidth;
  const screenHeight = props.screenSize.screenHeight;
  const paddingBottom = screenHeight * SizeConstants.BOTTOM_TABS.paddingBottom + insets.bottom;
  const tabBarHeight = screenHeight * SizeConstants.BOTTOM_TABS.tabBarHeight + paddingBottom;
  const tabImgAreaHeight = tabBarHeight - paddingBottom;
  const tabImgWidthHeight = Math.min(tabImgAreaHeight * 0.75, (0.95 * screenWidth) / NUM_TABS);

  // Define dynamic styles
  const dynStyles = StyleSheet.create({
    tabBar: {
      width: screenWidth,
      height: tabBarHeight,
      borderTopWidth: tabImgWidthHeight * 0.005,
      paddingBottom: insets.bottom * 0.5,
      shadowOpacity: 0.4,
      shadowColor: 'lightgray',
      shadowRadius: tabBarHeight * 0.04,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopColor: 'lightgray',
    },
  });

  // Render tab bar...
  return <View
    style={dynStyles.tabBar}>
    {props.state.routes.map((route, index) => {
      const isFocused = props.state.index === index;

      const onPress = () => {
        const event = props.navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          props.navigation.navigate(route.name);
        }
      };

      return (<CustomBottomTab
          key={route.name}
          isFocused={isFocused}
          name={route.name}
          onPress={onPress}
          areaHeight={tabImgAreaHeight}
          areaWidth={screenWidth / NUM_TABS}
          tabWidthHeight={tabImgWidthHeight} />
      );
    })}
  </View>;
};

export default withScreenSize(CustomBottomTabsBar);
