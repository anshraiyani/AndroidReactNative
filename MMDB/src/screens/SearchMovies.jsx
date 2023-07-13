import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MovieCard from '../components/MovieCard';

const SearchMovies = ({navigation}) => {
  const [search, setSearch] = useState(null);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState(null);

  const getMovies = async query => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=fc6b0f8734f6d710fed11de93fc496cc`,
      );
      const moviedata = await response.json();
      setData(moviedata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) {
      let searchQuery = search.split(' ').join('+');
      setQuery(searchQuery);
      getMovies(query);
    } else {
      setData(null);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          style={styles.input}
          onChangeText={text => setSearch(text)}
        />
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => getMovies(query)}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
      {data ? (
        <View>
          <FlatList
            style={{marginBottom:100}}
            data={data.results}
            renderItem={({item}) => (
              <MovieCard id={item.id} navigation={navigation} />
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
          <Text>No Results...</Text>
        </View>
      )}
    </View>
  );
};

export default SearchMovies;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: '75%',
    borderColor: 'rgba(0,0,0,0.2)',
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    backgroundColor: 'white',
    color: 'black',
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
    backgroundColor: '#8f62bf',
    borderRadius: 10,
    elevation: 10,
  },
  searchText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Rubik-Regular',
  },
});
