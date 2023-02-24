import { MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { withScreenSize } from '../../context/ScreenSizeContext';
import Animated, { Easing, FadeInUp, SlideOutUp } from 'react-native-reanimated';
import { useTabVisibility } from '../../hook/UseTabVisibility';


const MaterialTopTabBarWrapper = (props) => {

  // Pull visibility state from context
  const topTabsVisible = useTabVisibility();

  // Render the component...
  return (
    <>
      {topTabsVisible &&
        <Animated.View

          entering={FadeInUp.duration(200).easing(Easing.quad)}
          exiting={SlideOutUp.duration(700).easing(Easing.exp)}
          style={{

            // Allows shadow (defined in Feed component) to show
            zIndex: 2,
          }}>
          <MaterialTopTabBar{...props} />
        </Animated.View>
      }
    </>
  );
};

export default withScreenSize(MaterialTopTabBarWrapper);
