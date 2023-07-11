import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '769499210560-33ib5om9h2dm5kgalmnepskaua1an3ap.apps.googleusercontent.com',
  //   });
  // },[]);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        Snackbar.show({
          text: 'Logged in Successfully!',
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // const handleGoogleSignin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={pass}
        onChangeText={text => setPass(text)}
      />
      <View style={styles.btnContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
        {/* <Button title="Login with google" onPress={handleGoogleSignin} /> */}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  btnContainer: {
    margin: 10,
    gap: 10,
  },
});
