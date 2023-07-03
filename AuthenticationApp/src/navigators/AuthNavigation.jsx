import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import Pages from '../constants/Pages';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={Pages.LOGIN_PAGE}>
      <Stack.Screen
        name={Pages.LOGIN_PAGE}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name={Pages.SIGNUP_PAGE} component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
