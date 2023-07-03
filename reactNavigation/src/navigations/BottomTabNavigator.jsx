import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Wallet from '../screens/Wallet';
import Settings from '../screens/Settings';
import Notifications from '../screens/Notifications';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel:'',
        tabBarIcon: ({color, size, focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          }
          if (route.name === 'Wallet') {
            iconName = focused ? 'wallet-sharp' : 'wallet-outline';
          }
          if (route.name === 'Notifications') {
            iconName = focused
              ? 'ios-notifications-sharp'
              : 'ios-notifications-outline';
          }
          if (route.name === 'Setting') {
            iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline';
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
