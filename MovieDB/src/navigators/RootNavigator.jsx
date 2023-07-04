import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#9381ff',
        tabBarStyle: {
          height: '5%',
          paddingTop:5
        },
        tabBarLabel: '',
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart-sharp' : 'heart-outline';
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
