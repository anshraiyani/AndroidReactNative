import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

const Profile = () => {
    const handleSignout = () => {
        auth()
          .signOut()
          .then(() => {
            Snackbar.show({
              text: 'Signed out Successfully!',
              duration: Snackbar.LENGTH_LONG,
            });
          });
      };
    
      return (
        <View>
          <Button title="Sign Out" onPress={handleSignout}/>
        </View>
      );
}

export default Profile

const styles = StyleSheet.create({})