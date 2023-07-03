import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#9b63db',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomePage" component={DrawerNavigator} options={{headerShown:false}} />  
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
