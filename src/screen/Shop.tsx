import { StyleSheet, View } from 'react-native';
import React from 'react';
import ShopHeader from '../component/header/ShopHeader';
import ProductCategoriesView from '../component/product/ProductCategoriesView';

const Shop = () => {

  // Render the component...
  return (
    <View
      style={styles.container}>

      {/**
       * Products by category
       */}
      <ProductCategoriesView />

      {/**
       * Header
       */}
      <View
        style={{
          position: 'absolute',
        }}>
        <ShopHeader />
      </View>
    </View>
  );
};

// Define constant styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default Shop;
