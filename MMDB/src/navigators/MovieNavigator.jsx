import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from '../screens/Home';
import ActorProfile from '../screens/ActorProfile';
import MovieDetails from '../components/MovieDetails';

const Stack = createStackNavigator();

const MovieNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled:false
      }}
      initialRouteName='Home'
      >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='MovieDetails' component={MovieDetails} /> 
      <Stack.Screen name='ActorProfile' component={ActorProfile} />
    </Stack.Navigator>
  );
};

export default MovieNavigator;
