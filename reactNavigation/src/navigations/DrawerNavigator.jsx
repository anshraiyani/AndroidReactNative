import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Wallet from '../screens/Wallet';
import Settings from '../screens/Settings';
import Notifications from '../screens/Notifications';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTab" component={BottomTabNavigator} />
      <Drawer.Screen name="WalletDrawer" component={Wallet} />
      <Drawer.Screen name="NotificationsDrawer" component={Notifications} />
      <Drawer.Screen name="SettingsDrawer" component={Settings} />
    </Drawer.Navigator>
  );
}
