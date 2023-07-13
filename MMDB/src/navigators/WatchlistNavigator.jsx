import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Watchlist from '../screens/Watchlist';
import MovieDetails from '../components/MovieDetails';
import ActorProfile from '../screens/ActorProfile';

const Stack = createStackNavigator();

const WatchlistNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="Watchlist">
      <Stack.Screen name="Watchlist" component={Watchlist} />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
      />
      <Stack.Screen name="ActorProfile" component={ActorProfile} />
    </Stack.Navigator>
  );
};

export default WatchlistNavigator;
