import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {AppwriteContext} from '../appwrite/AppwriteContext';
import {AppwriteProvider} from '../appwrite/AppwriteContext';
import Loading from '../components/Loading';

// Routes
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then(response => {
        setIsLoading(false);
        // console.log(isLoggedIn)
        if (response) {
          setIsLoggedIn(true);
          console.log(isLoggedIn);
        }
      })
      .catch(_ => {
        setIsLoading(false);
        setIsLoggedIn(false);
        console.log(isLoggedIn);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <AppwriteProvider>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </AppwriteProvider>
    </NavigationContainer>
  );
};

export default Router;
