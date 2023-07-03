import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import moment from "moment/moment";

export default function NewsCard(props) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=>props.navigation.navigate("NewsScreen",{
      urlToImage:props.urlToImage,
      source:props.source,
      title:props.title,
      date:props.date,
      description:props.description,
      url:props.url
    })}>

      <Image source={{ uri: props.urlToImage }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={2} style={{ fontSize: 15, fontWeight: "600" }}>
          {props.title}
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={{ fontSize: 11 }}>{props.source} ● </Text>
          <Text style={{ fontSize: 11 }}>
            {moment(new Date(props.date)).startOf("hour").fromNow()}
          </Text>
        </View> 

      </View>

      <View style={styles.viewMore}>
        <Text style={{ fontSize: 25, color: "white" }}>⟫</Text>
      </View>
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    height: 70,
  },
  info: {
    width: "55%",
    justifyContent: "space-between",
    paddingVertical: 3,
    marginRight: "auto",
  },
  viewMore: {
    backgroundColor: "#ff6e63",
    width: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: "100%",
    marginRight: 15,
    resizeMode: "cover",
  },
});
