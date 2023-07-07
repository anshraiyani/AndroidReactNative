import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {FAB} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';

import {AppwriteContext} from '../appwrite/AppwriteContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = () => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);

  const [userData, setUserData] = useState();

  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successful',
        duration: Snackbar.LENGTH_LONG,
      });
    });
  };

  useEffect(() => {
    appwrite.getCurrentUser().then(response => {
      if (response) {
        const user = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);

  return (
    <SafeAreaView>
      <View>
        {userData && (
          <View>
            <Text>{userData.name}</Text>
            <Text>{userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        title="Logout"
        icon={{name: 'logout', color: '#ffffff'}}
        placement="right"
        onPress={() => handleLogout()}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
