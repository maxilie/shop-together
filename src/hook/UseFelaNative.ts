import { useFela } from 'react-fela';
import { ImageStyle, StyleProp, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import NamedStyles = StyleSheet.NamedStyles;

export type RNStyleRule = ViewStyle | TextStyle | ImageStyle;

export type RNStyleRuleFunc = (props?) => RNStyleRule;

export type DynamicStylesheet = {[key: string]: RNStyleRule | RNStyleRuleFunc}

export type FelaStyleFunc = (...args: (RNStyleRule | RNStyleRuleFunc)[]) => NamedStyles<any>;

export const useFelaNative = (props?): FelaStyleFunc => {
  /**
   * Wrapper for `react-fela`'s useFela() hook. Adds types for use with React Native and `fela-native`'s Renderer.
   */
  const { css, } = useFela(props);

  // @ts-ignore
  return css as FelaStyleFunc;
};
