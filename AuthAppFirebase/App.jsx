import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import auth from '@react-native-firebase/auth';
import HomeNavigator from './src/navigators/HomeNavigator';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubsribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubsribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
