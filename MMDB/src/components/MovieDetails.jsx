import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
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
import Icon from 'react-native-vector-icons/Ionicons'

const MovieDetails = ({route, navigation}) => {
  const movieData = route.params['movie'];
  const [data,setData] = useState(null)
  const uid = auth().currentUser.uid;
  const userRef = firestore().collection('users').doc(uid);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();

  const getMovie = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=fc6b0f8734f6d710fed11de93fc496cc`;
      const response = await fetch(url);
      const movieData = await response.json();
      setData(movieData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getMovie(movieData.id)
  },[movieData.id])

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
          if (favoriteMovies.includes(movieData.id)) {
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
          if (watchlist.includes(movieData.id)) {
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
      data &&
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
            <Text style={styles.titleText}>{data.title}</Text>
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
        <View style={{flexDirection: 'row', gap: 5}}>
          <View style={{width: '50%'}}>
            {!isFavorite ? (
              <TouchableOpacity
                style={styles.btnAddFavContainer}
                onPress={handleAddToFavorite}>
                <Text style={styles.addFavText}>Add To Favorite</Text>
                <Icon name={'heart-sharp'} size={26} color={'red'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnRemoveFavContainer}
                onPress={handleRemoveFavorite}>
                <Text style={styles.removeFavText}>Remove</Text>
                <Icon name={'heart-dislike-sharp'} size={26} color={'white'} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{width: '50%'}}>
            {!isInWatchlist ? (
              <TouchableOpacity
                style={styles.btnAddLaterContainer}
                onPress={handleAddToWatchlist}>
                <Text style={styles.addLaterText}>Add To Watchlist</Text>
                <Icon name={'timer-sharp'} size={26} color={'#8f62bf'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnRemoveLaterContainer}
                onPress={handleRemoveFromWatchList}>
                <Text style={styles.removeLaterText}>Remove</Text>
                <Icon name={'timer-sharp'} size={26} color={'white'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.Title}>Similar</Text>
          <SimilarMovies id={data.id} navigation={navigation} />
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
  addFavText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    color: 'red',
  },
  btnAddFavContainer: {
    flexDirection: 'row',
    gap: 5,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
  removeFavText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    color: 'white',
  },
  btnRemoveFavContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
  addLaterText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    color: '#8f62bf',
  },
  btnAddLaterContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: '#8f62bf',
  },
  removeLaterText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    color: 'white',
  },
  btnRemoveLaterContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    backgroundColor: '#8f62bf',
    borderRadius: 20,
    padding: 5,
  },
});
