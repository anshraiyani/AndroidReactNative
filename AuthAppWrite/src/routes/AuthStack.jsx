import {View, Text} from 'react-native';
import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled:true,
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{headerTitle: 'Sign Up'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
