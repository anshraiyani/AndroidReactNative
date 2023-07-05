import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fetchAsync} from './productsSlice';
import {useDispatch, useSelector} from 'react-redux';
import { popData } from './productsSlice';

const Products = () => {
  const disptach = useDispatch();
  const products = useSelector(state => state.products);
  return (
    <View>
      <Button title="call api" onPress={() => disptach(fetchAsync())} />
      {products.isLoading ? (
        <Text>Loading...</Text>
      ) : products.isError ? (
        <Text>Error</Text>
      ) : (
        <ScrollView>
          {products.data.map(el => (
            <Text key={el.id}>{el.title}</Text>
          ))}
        </ScrollView>
      )}
      <Button title='Pop Data' onPress={()=>disptach(popData())} />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({});
