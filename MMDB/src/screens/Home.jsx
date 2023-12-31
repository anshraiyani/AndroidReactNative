import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useDispatch } from 'react-redux';
import { updateFavoriteMovies,updateWatchlist } from '../redux/slices/userSlice';
import MovieCard from '../components/MovieCard';

const Home = ({navigation}) => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const scroll = React.createRef();
  const dispatch=useDispatch()

  const getData = async page => {
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=fc6b0f8734f6d710fed11de93fc496cc`;
      const response = await fetch(url);
      const moviedata = await response.json();
      setData(moviedata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(page);
    const uid=auth().currentUser.uid
        const firestoreRef=firestore().collection('users').doc(uid)
        firestoreRef.get().then((doc)=>{
          if(doc.exists){
            const data=doc.data()
            const favoriteMovies=data.favorite||[]
            const watchListMovies=data.watchlist||[]
            dispatch(updateFavoriteMovies(favoriteMovies))
            dispatch(updateWatchlist(watchListMovies))
          }
        })
  }, [page]);

  return (
    <View style={styles.container}>
      {data ? (
        <View>
          <FlatList
            ref={scroll}
            data={data.results}
            renderItem={({item}) => (
              <MovieCard id={item.id} navigation={navigation} />
            )}
            ListHeaderComponent={
              <View style={{flexDirection:'row',gap:10,paddingHorizontal:10}}>
                <Text style={{color:'#8f62bf',fontFamily:'Rubik-Regular',fontSize:25}}>Popular Movies</Text>
                <Icon name={'trending-up-sharp'} size={30} color={'#8f62bf'}/>
              </View>
            }
            ListFooterComponent={
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  {page != 1 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setPage(prev => prev - 1);
                        scroll.current.scrollToOffset({offest:0,animated:true})
                      }}>
                      <Icon
                        name={'arrow-back-circle-sharp'}
                        color={'#8f62bf'}
                        size={35}
                      />
                    </TouchableOpacity>
                  ) : null}
                  <View
                    style={{
                      backgroundColor: '#8f62bf',
                      paddingHorizontal: 10,
                      paddingVertical:0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      height: 'auto',
                    }}>
                    <Text style={{color: 'white', fontSize: 15}}>{page}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setPage(prev => prev + 1);
                      scroll.current.scrollToOffset({offest:0,animated:true})
                    }}>
                    <Icon
                      name={'arrow-forward-circle-sharp'}
                      color={'#8f62bf'}
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </View>
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}>
          <View style={{width: 100, height: 100}}>
            <ActivityIndicator size={'large'} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    backgroundColor:'white'
  },
});
