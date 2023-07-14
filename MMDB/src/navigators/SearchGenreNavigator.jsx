import {View, Text} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SearchByGenre from '../screens/SearchByGenre';
import MovieDetails from '../components/MovieDetails';
import ActorProfile from '../screens/ActorProfile';

const Stack = createStackNavigator();

const SearchGenreNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="SearchByGenre" component={SearchByGenre} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="ActorProfile" component={ActorProfile} />
    </Stack.Navigator>
  );
};

export default SearchGenreNavigator;
