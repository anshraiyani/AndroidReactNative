import {StyleSheet, Text, View, Image, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addToCart, removeFromCart} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';

export default function Products(props) {
  const item = props.item;
  const [isAdded, setIsAdded] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item));
    setIsAdded(false)
  };

  useEffect(() => {
    if (cartItems && cartItems.length) {
      cartItems.forEach(el => {
        if (el.name === item.name) {
          setIsAdded(true);
        }
      });
    }
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <View>
        <Image style={{width: 120, height: 120}} source={{uri: item.image}} />
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <View>
          <Text style={{fontSize: 20, color: 'black'}}>{item.name}</Text>
          <Text>{item.color}</Text>
          <Text>{item.price}</Text>
        </View>
        <View style={{width: 110}}>
          {isAdded ? (
            <Button
              title="Remove From Cart"
              onPress={() => handleRemoveFromCart(item)}
            />
          ) : (
            <Button title="Add to cart" onPress={() => handleAddToCart(item)} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    paddingHorizontal: 15,
    gap: 25,
  },
});
