import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSignin = () => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const uid = auth().currentUser.uid;
        firestore()
          .collection('users')
          .doc(uid)
          .set({favorite: [],watchlist:[]})
          .then(() => {
            Snackbar.show({
              text: 'Account Created Successfully!',
              duration: Snackbar.LENGTH_LONG,
            });
          });
      })
      .catch(error => {
        Snackbar.show({
          text: 'Error',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

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
        <Button title="Signup" onPress={handleSignin} />
      </View>
    </View>
  );
};

export default Signup;

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
