import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectState} from '../redux/slices/userSlice';
import MovieCard from '../components/MovieCard';

const Watchlist = ({navigation}) => {
  const watchlater = useSelector(selectState).watchlistMovies;

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Watchlist</Text>
      </View>
      <View>
        <FlatList
          style={{marginBottom: 120}}
          data={watchlater}
          renderItem={({item}) => (
            <MovieCard id={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};

export default Watchlist;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: 'Rubik-SemiBold',
    color: '#8f62bf',
    textAlign: 'center',
  },
  titleContainer: {
    padding: 10,
  },
  imageContainer: {
    height: '100%',
    width: '28%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
