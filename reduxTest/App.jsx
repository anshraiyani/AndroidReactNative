import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from './components/Header';
import Products from './components/Products';
import productData from './data/productData';

export default function App() {
  return (
    <View>
      <Header />
      <View style={{paddingBottom: 110}}>
        <FlatList
          data={productData}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: 'black',
              }}></View>
          }
          renderItem={({item}) => (
            <Products
              item={item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
