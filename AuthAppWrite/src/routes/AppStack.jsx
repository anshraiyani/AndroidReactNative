import {View, Text} from 'react-native';
import React from 'react';

import Home from '../screens/Home';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     headerTitleAlign: 'center',
    //     headerBackTitleVisible: false,
    //   }}>
    //   <Stack.Screen name="Home" component={Home} />
    // </Stack.Navigator>
    <Home/>
  );
};

export default AppStack;
