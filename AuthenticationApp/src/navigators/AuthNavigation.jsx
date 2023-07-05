import {StyleSheet} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import Pages from '../constants/Pages';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={Pages.LOGIN_PAGE}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled:true
      }}>
      <Stack.Screen
        name={Pages.LOGIN_PAGE}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={Pages.SIGNUP_PAGE} component={SignUp} />
      <Stack.Screen name={Pages.RESET_PAGE} component={ResetPassword} options={{headerTitle:'Reset Password'}}/>
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
