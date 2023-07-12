import {View, Text} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SearchMovies from '../screens/SearchMovies';
import MovieCard from '../components/MovieCard';
import MovieDetails from '../components/MovieDetails';

const Stack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="SearchMovies">
      <Stack.Screen name="SearchMovies" component={SearchMovies} />
      <Stack.Screen name="MovieCard" component={MovieCard} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
