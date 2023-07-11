import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

import Icon from 'react-native-vector-icons/Ionicons';
import MovieNavigator from './MovieNavigator';
import SearchMovies from '../screens/SearchMovies';
import SearchNavigator from './SearchNavigator';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => {
          let iconname;
          if (route.name === 'MovieNavigator') {
            iconname = focused ? 'film-sharp' : 'film-outline';
          } else if (route.name === 'SearchNavigator') {
            iconname = focused ? 'search-sharp' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconname = focused ? 'person-sharp' : 'person-outline';
          }
          return <Icon name={iconname} size={22} color={color} />;
        },
      })}
      initialRouteName="MovieNavigator">
      <Tab.Screen
        name="MovieNavigator"
        component={MovieNavigator}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{title: 'Search', headerShown: false}}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
