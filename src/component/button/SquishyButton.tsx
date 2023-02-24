import { Pressable, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import React, { memo, useState } from 'react';
import Animated, { EasingNode } from 'react-native-reanimated';

type Props = {
  onPress: () => void;

  // Set below 1 to squish in; set above 1 to expand
  scaleTo?: number;

  // Number of ms it takes to squish in or expand out
  squishInDuration?: number;

  // Number of ms after squishing/expanding before reversing the animation
  squishOutDelay?: number;

  // Number of ms it takes to reverse the animation
  squishOutDuration?: number;

  // Number of ms to wait after pressing before calling onPress()
  pressFuncDelay?: number;
  squishInEasing?: Animated.EasingNodeFunction;
  squishOutEasing?: Animated.EasingNodeFunction;
  style?;

  // Used for entering and exiting animations
  otherProps?;
  children: React.ReactNode;
}

const SquishyButton = (props: Props) => {

  // Use default props where needed.
  const {
    onPress,
    scaleTo = defaultScaleTo,
    squishInDuration = defaultSquishInDuration,
    squishOutDelay = defaultSquishOutDelay,
    squishOutDuration = defaultSquishOutDuration,
    pressFuncDelay = defaultPressFuncDelay,
    squishInEasing = defaultSquishInEasing,
    squishOutEasing = defaultSquishOutEasing,
    style = defaultStyles.button,
    otherProps = defaultOtherProps,
  } = props;

  // Create state vars for animation.
  const scaleValFloat = new Animated.Value(1.0);
  const [scaleVal,] = useState(scaleValFloat);
  const isAnimatingBool = false;
  const [isAnimating, setIsAnimating,] = useState(isAnimatingBool);

  return (
    <Animated.View
      {...otherProps}
      style={{ transform: [{ scale: scaleVal, },], }}>
      <Pressable
        onPress={() => setTimeout(() => onPress(), pressFuncDelay)}
        onPressIn={() => {
          if (isAnimating) return;
          setIsAnimating(true);
          Animated.timing(scaleVal, {
            toValue: scaleTo,
            duration: squishInDuration,
            easing: EasingNode.in(squishInEasing),
          }).start(() => {
            setTimeout(() => {
              Animated.timing(scaleVal, {
                toValue: 1,
                duration: squishOutDuration,
                easing: EasingNode.in(squishOutEasing),
              }).start(() => setIsAnimating(false));
            }, squishOutDelay);

          });
        }}
        style={style}
      >{props.children}
      </Pressable>
    </Animated.View>
  );
};

const defaultScaleTo = 0.95;
const defaultSquishInDuration = 150;
const defaultSquishOutDelay = 100;
const defaultSquishOutDuration = 100;
const defaultPressFuncDelay = 200;
const defaultSquishInEasing = EasingNode.exp;
const defaultSquishOutEasing = EasingNode.ease;
const defaultStyles = StyleSheet.create({
  button: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
});
const defaultOtherProps = {};

export default memo(SquishyButton);
