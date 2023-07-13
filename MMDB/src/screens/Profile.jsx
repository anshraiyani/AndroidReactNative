import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import { clearArrays } from '../redux/slices/userSlice';

const Profile = () => {
  const dispatch=useDispatch()
  const handleSignout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(clearArrays())
        Snackbar.show({
          text: 'Signed out Successfully!',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleSignout} style={styles.btnContainer}>
          <Text style={styles.btnText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8f62bf',
    width: 100,
    padding: 10,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: 'Rubik-Regular',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
