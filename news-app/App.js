import { View, Text } from "react-native";
import React from "react";

import MainScreen from "./screens/MainScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsScreen from "./screens/NewsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName="MainScreen" 
       nav
      >
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NewsScreen" component={NewsScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
