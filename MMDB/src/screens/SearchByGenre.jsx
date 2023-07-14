import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import MultiSelect from 'react-native-multiple-select';
import {genres} from '../data/genres';
// import {FlatList} from 'react-native-gesture-handler';
import MovieCard from '../components/MovieCard';

const SearchByGenre = ({navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [genreQuery, setGenreQuery] = useState('');
  const [data, setData] = useState(null);

  const onSelectedItemChange = selectedItem => {
    setSelectedItems(selectedItem);
  };

  const getData = async query => {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=fc6b0f8734f6d710fed11de93fc496cc&with_genres=${query}`;
      const response = await fetch(url);
      const movieData = await response.json();
      setData(movieData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGenreQuery(selectedItems.join(','));
  }, [selectedItems]);

  useEffect(() => {
    getData(genreQuery);
  }, [genreQuery]);

  return (
    <View style={styles.container}>
      <View>
        <MultiSelect
          items={genres}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemChange}
          selectedItems={selectedItems}
          selectedItemFontFamily="Rubik-Regular"
          selectedItemTextColor="#8f62bf"
          selectedItemIconColor="#8f62bf"
          tagTextColor="#8f62bf"
          tagBorderColor="#8f62bf"
          tagRemoveIconColor="#8f62bf"
          searchInputPlaceholderText="Search Genres..."
          styleInputGroup={{padding: 5}}
          displayKey="name"
          selectText="Pick Genre"
          submitButtonColor="#8f62bf"
          fixedHeight={true}
          styleListContainer={{height: 160}}
          itemFontFamily="Rubik-Regular"
          fontFamily="Rubik-Regular"
        />
      </View>
      <View>
        {data && (
          <FlatList
            data={data.results}
            key={item => item.id}
            renderItem={({item}) => (
              <MovieCard id={item.id} navigation={navigation} />
            )}
            style={{marginBottom:90}}
          />
        )}
      </View>
    </View>
  );
};

export default SearchByGenre;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
