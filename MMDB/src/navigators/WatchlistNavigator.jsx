import {View, Text} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Watchlist from '../screens/Watchlist';
import WatchlistMovieDetails from '../components/WatchlistMovieDetails';

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
        name="WatchlistMovieDetails"
        component={WatchlistMovieDetails}
      />
    </Stack.Navigator>
  );
};

export default WatchlistNavigator;
