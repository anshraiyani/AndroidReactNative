import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import AuthNavigation from './src/navigators/AuthNavigation';
import HomeNavigator from './src/navigators/HomeNavigator';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from './FireBaseConfig';

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(user);
    });
  });
  return (
    <NavigationContainer>
      {!user ? <AuthNavigation /> : <HomeNavigator />}
    </NavigationContainer>
  );
};

export default App;
