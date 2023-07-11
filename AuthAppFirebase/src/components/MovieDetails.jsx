import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {genres} from '../data/genres';

const MovieDetails = ({route}) => {
  const item = route.params['item'];
  return (
    <ScrollView style={styles.container}>
      <View style={{height: 370}}>
        <ImageBackground
          style={styles.bgImage}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
          }}>
          <View style={styles.shadow}></View>
        </ImageBackground>
        <View
          style={{
            position: 'absolute',
            top: 160,
            left: 10,
            flexDirection: 'row',
          }}>
          <View style={styles.posterContainer}>
            <Image
              style={styles.poster}
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
              }}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.date}>
              {moment(item.release_date).format('Do MMMM YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{padding: 10, gap: 15}}>
        <View style={styles.genreMainContainer}>
          <Text style={styles.Title}>Genres</Text>
          <View style={{flexDirection: 'row', gap: 15, flexWrap: 'wrap'}}>
            {item.genre_ids.map(genre => {
              if (genre in genres) {
                return (
                  <View key={genre} style={styles.genreContainer}>
                    <Text style={styles.genreText}>{genres[genre]}</Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
        <View>
          <Text style={styles.Title}>Rating: {item.vote_average}</Text>
        </View>
        <View>
          <Text style={styles.Title}>Overview</Text>
          <Text style={styles.overviewText}>{item.overview}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: '100%',
    height: 221,
    resizeMode: 'contain',
  },
  shadow: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  posterContainer: {
    height: 200,
    width: 130,
    borderColor:'white',
    borderWidth:.2
  },
  poster: {
    height: '100%',
    width: '100%',
  },
  titleText: {
    marginTop: 70,
    marginLeft: 10,
    fontFamily: 'Rubik-Regular',
    fontSize: 25,
    width: '45%',
    color: 'black',
  },
  date: {
    marginLeft: 10,
    fontSize: 17,
    fontFamily: 'Rubik-Light',
  },
  genreMainContainer: {},
  Title: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Rubik-Regular',
  },
  genreContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Rubik-Light',
  },
  rating: {
    fontFamily: 'Rubik-Regular',
    color: 'black',
    fontSize: 18,
  },
  overviewText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
  },
});
