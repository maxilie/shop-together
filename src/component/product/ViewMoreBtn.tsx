import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useReducer } from 'react';
import { DynamicStylesheet, useFelaNative } from '../../hook/UseFelaNative';
import { THEME_COLORS } from '../../constant/ThemeConstants';

type Props = {
  screenWidth: number;
  loadNextProductsInCategory: () => void;
};

const ViewMoreBtn = (props: Props) => {

  // Init state
  const [isPressed, toggleIsPressed,] = useReducer(pressed => !pressed, false);

  // Get styles
  const style = useFelaNative({ screenWidth: props.screenWidth, isPressed: isPressed, });

  // Render the component...
  return (
    <View
      style={style(styles.container)}>
      <Pressable
        onPressIn={toggleIsPressed}
        onPressOut={toggleIsPressed}
        onPress={props.loadNextProductsInCategory}
        style={style(styles.button)}>
        <Text
          style={style(styles.text)}>Load More</Text>
      </Pressable>
    </View>
  );
};

// Define styles
const styles: DynamicStylesheet = {
  container: ({ screenWidth, }) => ({
    width: screenWidth,
    marginTop: 30,
    marginBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
  button: ({ isPressed, }) => ({
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: isPressed ? '#edf5ff' : '#fafcff',
    borderColor: isPressed ? '#6ba5d0' : THEME_COLORS.blue,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 9,
    shadowColor: 'lightgray',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
  }),
  text: {
    color: '#3a3a3a',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default ViewMoreBtn;
