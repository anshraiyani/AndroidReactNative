import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';

import Icon from 'react-native-vector-icons/Ionicons';
import MovieNavigator from './MovieNavigator';
import SearchNavigator from './SearchNavigator';
import WatchlistNavigator from './WatchlistNavigator';
import FavoriteNavigator from './FavoriteNavigator';

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
          } else if (route.name === 'WatchlistNavigator') {
            iconname = focused ? 'eye-sharp' : 'eye-outline';
          } else if (route.name === 'FavoriteNavigator') {
            iconname = focused ? 'heart-sharp' : 'heart-outline';
          }
          return <Icon name={iconname} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#8f62bf',
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
      <Tab.Screen
        name="WatchlistNavigator"
        component={WatchlistNavigator}
        options={{title: 'Watchlist'}}
      />
      <Tab.Screen
        name="FavoriteNavigator"
        component={FavoriteNavigator}
        options={{title: 'Favorite'}}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
