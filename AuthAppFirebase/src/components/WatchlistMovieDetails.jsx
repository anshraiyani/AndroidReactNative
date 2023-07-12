import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import SimilarMovies from './SimilarMovies';
import Cast from './Cast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {useDispatch} from 'react-redux';
import {
  addFavoriteMovies,
  addToWatchlist,
  removeFavoriteMovie,
  removeFromWatchlist,
} from '../redux/slices/userSlice';

const WatchlistMovieDetails = ({route,navigation}) => {
  const data = route.params['movie'];
  const uid = auth().currentUser.uid;
  const userRef = firestore().collection('users').doc(uid);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    constainsFavoriteMovie();
    constainsWatchListMovie();
  }, [isFavorite, isInWatchlist]);

  const constainsFavoriteMovie = () => {
    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const favoriteMovies = doc.data().favorite;
          if (favoriteMovies.includes(data.id)) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        } else {
          console.log('User document does not exist');
        }
      })
      .catch(error => {
        console.error('Error checking movie ID in favorites:', error);
      });
  };

  const constainsWatchListMovie = () => {
    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const watchlist = doc.data().watchlist;
          if (watchlist.includes(data.id)) {
            setIsInWatchlist(true);
          } else {
            setIsInWatchlist(false);
          }
        } else {
          console.log('User document does not exist');
        }
      })
      .catch(error => {
        console.error('Error checking movie ID in watchlist:', error);
      });
  };

  const handleAddToFavorite = () => {
    userRef
      .update({
        favorite: firestore.FieldValue.arrayUnion(data.id),
      })
      .then(() => {
        Snackbar.show({
          text: 'Movie Added to Favorites!',
        });
        setIsFavorite(true);
        dispatch(addFavoriteMovies(data.id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRemoveFavorite = () => {
    userRef
      .update({
        favorite: firestore.FieldValue.arrayRemove(data.id),
      })
      .then(() => {
        Snackbar.show({
          text: 'Movie Removed from Favorites!',
        });
        setIsFavorite(false);
        dispatch(removeFavoriteMovie(data.id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddToWatchlist = () => {
    userRef
      .update({
        watchlist: firestore.FieldValue.arrayUnion(data.id),
      })
      .then(() => {
        Snackbar.show({
          text: 'Movie Added to Watchlist!',
        });
        setIsInWatchlist(true);
        dispatch(addToWatchlist(data.id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRemoveFromWatchList = () => {
    userRef
      .update({
        watchlist: firestore.FieldValue.arrayRemove(data.id),
      })
      .then(() => {
        Snackbar.show({
          text: 'Movie Removed from Watchlist!',
        });
        setIsInWatchlist(false);
        dispatch(removeFromWatchlist(data.id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{height: 370}}>
        <ImageBackground
          style={styles.bgImage}
          source={{
            uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
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
                uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
              }}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.titleText}>{data.original_title}</Text>
            <Text style={styles.date}>
              {moment(data.release_date).format('Do MMMM YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{padding: 10, gap: 15}}>
        <View style={styles.genreMainContainer}>
          <Text style={styles.Title}>Genres</Text>
          <View style={{flexDirection: 'row', gap: 15, flexWrap: 'wrap'}}>
            {data.genres.map(genre => {
              return (
                <View key={genre.id} style={styles.genreContainer}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View>
          <Text style={styles.Title}>
            Rating: {data.vote_average.toFixed(2)}
          </Text>
        </View>
        <View>
          <Text style={styles.Title}>Overview</Text>
          <Text style={styles.overviewText}>{data.overview}</Text>
        </View>
        <View>
          <Text style={styles.Title}>Cast</Text>
          <Cast id={data.id} navigation={navigation} />
        </View>
        <View>
          {!isFavorite ? (
            <Button title="Add to favorites" onPress={handleAddToFavorite} />
          ) : (
            <Button
              title="Remove from favorites"
              onPress={handleRemoveFavorite}
            />
          )}
        </View>
        <View>
          {!isInWatchlist ? (
            <Button title="Add to watchlist" onPress={handleAddToWatchlist} />
          ) : (
            <Button
              title="Remove from watchlist"
              onPress={handleRemoveFromWatchList}
            />
          )}
        </View>
        <View>
          <Text style={styles.Title}>Similar</Text>
          <SimilarMovies id={data.id} navigation={navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

export default WatchlistMovieDetails;

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
    borderColor: 'white',
    borderWidth: 0.2,
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
    color: 'grey',
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
    color: 'grey',
  },
});
