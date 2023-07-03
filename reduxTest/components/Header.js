import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export default function Header() {
  const cardData = useSelector(state => state.reducer);
  const [carItems, setCardItems] = useState(0);

  useEffect(() => {
    setCardItems(cardData.length);
  }, [cardData]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'black'}}>Cart: {carItems}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    backgroundColor: 'lightblue',
  },
});
