import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const WatchListCard = ({id, navigation}) => {
  const [movie, setMovie] = useState(null);

  const getColor = () => {
    if (movie.vote_average >= 7) {
      return 'green';
    }
    if (movie.vote_average < 7 && movie.vote_average >= 5) {
      return 'yellow';
    }
    if (movie.vote_average < 5 && movie.vote_average >= 3) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const getMovie = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=fc6b0f8734f6d710fed11de93fc496cc`;
      const response = await fetch(url);
      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

  console.log(movie);

  return (
    <View>
      {movie && (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() =>
            navigation.navigate('WatchlistMovieDetails', {movie: movie})
          }>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>{movie.title}</Text>
            <Text style={styles.date}>
              {moment(movie.release_date).format('Do MMMM YYYY')}
            </Text>
            <View style={styles.genreListContainer}>
              {movie.genres.slice(0, 3).map(genre => {
                return (
                  <View key={genre.id} style={styles.genreContainer}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.ratingContainer}>
              <Icon name={'thumbs-up-sharp'} size={20} color={getColor()} />
              <Text style={styles.ratingText}>
                {movie.vote_average.toFixed(2)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WatchListCard;

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
    color: 'black',
  },
  genreContainer: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 11,
    color: 'black',
  },
  genreListContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 5,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Rubik-Light',
    color: 'black',
  },
});
