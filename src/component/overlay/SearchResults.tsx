import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

type Props = {
  width: number;
  minHeight: number;
  maxHeight: number;
  marginTop: number;
  marginLeft: number;
  children: React.ReactNode;
}

const SearchResults = (props: Props) => {

  // Create styles
  const dynStyles = StyleSheet.create({
    container: {
      width: props.width,
      minHeight: props.minHeight,
      maxHeight: props.maxHeight,
      marginTop: props.marginTop,
      marginLeft: props.marginLeft,
      borderRadius: props.width * 0.05,
      borderWidth: props.width * 0.004,
      shadowOpacity: 0.17,
      shadowColor: '#e3f4fc',
      shadowRadius: props.width * 0.006,
      shadowOffset: { width: 0, height: props.width * 0.002, },
      position: 'absolute',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderColor: '#f7f7f7',
      overflow: 'hidden',
    },
    scrollable: {
      flexGrow: 0,
    },
  });

  // Render the component...
  return (
    <View
      style={dynStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        style={dynStyles.scrollable}>
        {props.children}
      </ScrollView>
    </View>
  );
};

export default SearchResults;
