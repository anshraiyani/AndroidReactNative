import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  Image,
} from "react-native";
import NewsCard from "../components/NewsCard";
import Header from "../components/Header";
import SliderCards from "../components/SliderCards";
import NewsButtons from "../components/NewsButtons";

export default function App(props) {
  const [data, setData] = React.useState({});
  const [sliderData, setSliderData] = React.useState({});
  const [newsButton, setNewsButton] = React.useState("general");
  const [isLoading, setIsLoading] = React.useState(true);

  async function getdata() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${newsButton}&apiKey=2d6ac73db2144c438b23df594cb4da44`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getSliderdata() {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=2d6ac73db2144c438b23df594cb4da44"
      );
      const json = await response.json();
      setSliderData(json.articles.slice(0, 10));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getSliderdata();
    getdata();
  }, [newsButton]);

  const headerComponent = () => {
    return (
      <View style={styles.horizontalSlider}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginLeft: 10,
            marginBottom: 15,
          }}
        >
          <Image
            source={require("../assets/fire-icon.png")}
            style={{ height: 22, width: 22, marginRight: 5 }}
          />
          <Text style={styles.topNews}>Top News In India</Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={sliderData}
          renderItem={({ item }) =>
            item.urlToImage != null ? (
              <SliderCards
              urlToImage={item.urlToImage}
              source={item.source.name}
              title={item.title}
              date={item.publishedAt}
              description={item.description}
              url={item.url}
              navigation={props.navigation} 
              />
            ) : (
              <></>
            )
          }
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginLeft: 10,
            marginTop: 30,
            marginBottom: 7,
          }}
        >
          <Image
            source={require("../assets/news-icon.png")}
            style={{ height: 22, width: 22, marginRight: 5 }}
          />
          <Text style={styles.topNews}>Today's News</Text>
        </View>

        <NewsButtons setNewsButton={setNewsButton} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.articles}
          ListHeaderComponent={headerComponent}
          renderItem={({ item }) =>
            item.urlToImage != null ? (
              <NewsCard
                urlToImage={item.urlToImage}
                source={item.source.name}
                title={item.title}
                date={item.publishedAt}
                description={item.description}
                url={item.url}
                navigation={props.navigation}
              />
            ) : (
              <></>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  horizontalSlider: {
    marginLeft: 8,
    marginTop: 10,
  },
  topNews: {
    fontSize: 20,
    fontWeight: "600",
  },
});
