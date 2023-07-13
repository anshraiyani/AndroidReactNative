import {StyleSheet, Text, View,Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const Cast = ({id, navigation}) => {
  const [data, setData] = useState(null);

  const getCast = async id => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=fc6b0f8734f6d710fed11de93fc496cc`;
      const response = await fetch(url);
      const castData = await response.json();
      setData(castData.cast.slice(0,15));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCast(id);
  }, [id]);

  return (
    <View>
      <FlatList
      showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({item}) => (
            <TouchableOpacity style={styles.container} onPress={()=>navigation.push('ActorProfile',{id:item.id})}>
                <Image style={styles.image} source={{uri:`https://image.tmdb.org/t/p/original${item.profile_path}`}} />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.character}>{item.character}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
    image:{
        height:170,
        width:"100%"
    },
    container:{
        marginRight:7,
        // height:170,
        width:100,
        // flexWrap:'wrap'
    },
    name:{
        fontFamily:'Rubik-Regular',
        color:'black',
        fontSize:15
    },
    character:{
        fontFamily:'Rubik-Light',
        color:'grey'
    }
});
