import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import FavoriteMovies from '../screens/FavoriteMovies';
import MovieDetails from '../components/MovieDetails';
import ActorProfile from '../screens/ActorProfile';

const Stack = createStackNavigator();

const FavoriteNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="FavoriteMovies" component={FavoriteMovies} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="ActorProfile" component={ActorProfile} />
    </Stack.Navigator>
  );
};

export default FavoriteNavigator;
