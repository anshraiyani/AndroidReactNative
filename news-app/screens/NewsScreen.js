import {
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import moment from "moment";
import * as WebBrowser from 'expo-web-browser'


export default function NewsScreen(props) {
  const { urlToImage, source, title, date, description, url } =
  props.route.params;
  
  loadInBrowser = () => {
    WebBrowser.openBrowserAsync(url, {showTitle: true})
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: urlToImage }} style={styles.image} />
      <View style={styles.titleContainer}>
        <View style={styles.verticalLine} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 15 }}>
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceText}>{source}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment(new Date(date)).format("MMM Do YY")}
          </Text>
        </View>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.descText}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.readMoreBtn} onPress={loadInBrowser}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "30%",
  },
  titleText: {
    fontSize: 17,
    fontWeight: 700,
    flexWrap: "wrap",
    width: "95%",
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    maxHeight: "10%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  verticalLine: {
    backgroundColor: "#ff6e63",
    width: 5,
    height: "60%",
    marginRight: 10,
    borderRadius: 20,
  },
  sourceContainer: {
    backgroundColor: "#ff6e63",
    alignSelf: "flex-start",
    padding: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
  sourceText: {
    color: "white",
    fontSize: 13,
  },
  dateContainer: {
    alignSelf: "flex-start",
    padding: 6,
    borderRadius: 10,
    marginLeft: 10,
    borderColor: "#ff6e63",
    borderWidth: 1,
  },
  dateText: {
    color: "#ff6e63",
    fontSize: 13,
  },
  descContainer: {
    padding: 15,
  },
  descText: {
    fontSize: 17,
  },
  readMoreBtn: {
    backgroundColor: "#ff6e63",
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 12,
    marginLeft: 10,
    marginTop: 5,
  },
  readMoreText: {
    color: "white",
    fontSize: 15,
  },
});
