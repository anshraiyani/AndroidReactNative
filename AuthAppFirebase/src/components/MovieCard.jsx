import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment';
import {genres} from '../data/genres';
import Icon from 'react-native-vector-icons/Ionicons';

const MovieCard = ({item,navigation}) => {
  const getColor = () => {
    if (item.vote_average >= 7) {
      return 'green';
    }
    if (item.vote_average < 7 && item.vote_average >= 5) {
      return 'yellow';
    }
    if (item.vote_average < 5 && item.vote_average >= 3) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  // console.log(item)
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=>navigation.navigate('MovieDetails',{item:item})} >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.date}>
          {moment(item.release_date).format('Do MMMM YYYY')}
        </Text>
        <View style={styles.genreListContainer}>
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
        <View style={styles.ratingContainer}>
          <Icon name={'thumbs-up-sharp'} size={20} color={getColor()} />
          <Text style={styles.ratingText}>{item.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '95%',
    height: 160,
    backgroundColor: 'white',
    margin: 10,
    flexDirection: 'row',
    elevation: 6,
    shadowColor: '#171717',
  },
  imageContainer: {
    height: '100%',
    width: '28%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  infoContainer: {
    width: '72%',
    paddingHorizontal: 10,
    // backgroundColor:'blue'
  },
  titleText: {
    fontFamily: 'Rubik-Bold',
    color: 'black',
    fontSize: 16,
  },
  date: {
    fontFamily: 'Rubik-Light',
  },
  genreContainer: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 11,
  },
  genreListContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop:5,
    gap: 5,
    alignItems: 'center',
  },
  ratingText:{
    fontFamily:'Rubik-Light',
    color:'black'
  }
});
