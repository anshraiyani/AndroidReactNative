import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";

export default function SliderCards(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate("NewsScreen",{
      urlToImage:props.urlToImage,
      source:props.source,
      title:props.title,
      date:props.date,
      description:props.description,
      url:props.url
    })}>
      <ImageBackground
        source={{
          uri: props.urlToImage
        }}
        style={styles.image}
        imageStyle={{borderRadius:15}}
      >
        <View style={styles.darkness}>
          <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    height: 150,
    width: 185,
    borderRadius: 10,
    marginHorizontal:10
  },
  darkness: {
    backgroundColor: "rgba(0,0,0,0.35)",
    height: "100%",
    width: "100%",
    justifyContent:"flex-end",
    alignItems:'center',
    paddingBottom:'6%',
    borderRadius: 15,
  },
  title:{
    color:'white',
    textAlign:'center',
    fontSize:13
  }

});
