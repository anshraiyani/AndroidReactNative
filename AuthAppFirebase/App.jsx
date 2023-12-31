import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './src/navigators/AuthNavigator';
import auth from '@react-native-firebase/auth';
import HomeNavigator from './src/navigators/HomeNavigator';
import store from './src/redux/store';
import {Provider} from 'react-redux';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubsribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubsribe();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
