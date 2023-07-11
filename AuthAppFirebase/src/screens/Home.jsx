import {StyleSheet, Text, View, Button, ActivityIndicator,FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import MovieCard from '../components/MovieCard';

const Home = ({navigation}) => {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const url =
        'https://api.themoviedb.org/3/movie/popular?api_key=fc6b0f8734f6d710fed11de93fc496cc';
      const response = await fetch(url);
      const moviedata = await response.json();
      setData(moviedata);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <View style={styles.container}>
      {data ? (
        <View>
            <FlatList
                data={data.results}
                renderItem={({item})=>(
                    <MovieCard item={item} navigation={navigation} />
                )} 
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
  container:{
    flex:1,
    alignItems:'center',
    padding:5,
    justifyContent:'center'
  }
});
