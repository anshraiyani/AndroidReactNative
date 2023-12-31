import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SearchMovies from '../screens/SearchMovies';
import MovieDetails from '../components/MovieDetails';
import ActorProfile from '../screens/ActorProfile';
import SearchGenreNavigator from './SearchGenreNavigator';

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
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="ActorProfile" component={ActorProfile} />
      <Stack.Screen name="SearchGenreNavigator" component={SearchGenreNavigator} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
