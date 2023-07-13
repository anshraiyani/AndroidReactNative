import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';

import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSignin = () => {
    if (pass === '' || email === '' || confirmPass === '') {
      Snackbar.show({
        text: 'All Fields are compulsory',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    } else if (pass.length < 6) {
      Snackbar.show({
        text: 'Password should be atleast 6 characters long',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    } else if (pass !== confirmPass) {
      Snackbar.show({
        text: 'Passwords do not match!',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        const uid = auth().currentUser.uid;
        firestore()
          .collection('users')
          .doc(uid)
          .set({favorite: [], watchlist: []})
          .then(() => {
            Snackbar.show({
              text: 'Account Created Successfully!',
              duration: Snackbar.LENGTH_SHORT,
              marginBottom:50
            });
          });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email': {
            Snackbar.show({
              text: 'Invalid Email',
              duration: Snackbar.LENGTH_LONG,
            });
            break;
          }
          case 'auth/email-already-in-use': {
            Snackbar.show({
              text: 'Email already in use!',
              duration: Snackbar.LENGTH_LONG,
            });
            break;
          }
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={pass}
            onChangeText={text => setPass(text)}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPass}
            onChangeText={text => setConfirmPass(text)}
            placeholderTextColor={'grey'}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.loginContainer}
              onPress={handleSignin}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'space-between',
    height: '100%',
  },
  titleText: {
    fontFamily: 'Rubik-Black',
    fontSize: 40,
    color: '#8f62bf',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    marginVertical: 30,
  },
  loginTitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 25,
    color: '#8f62bf',
  },
  input: {
    borderWidth: 0.5,
    margin: 10,
    padding: 10,
    color: 'black',
    fontFamily: 'Rubik-Regular',
    borderRadius: 10,
    width: '85%',
  },
  btnContainer: {
    alignItems: 'center',
    gap: 15,
  },
  loginContainer: {
    padding: 10,
    backgroundColor: '#8f62bf',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  loginText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  resetContainer: {
    padding: 7,
    backgroundColor: 'white',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: '#8f62bf',
  },
  resetText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 18,
    color: '#8f62bf',
  },
  logo: {
    height: 70,
    width: 70,
  },
  formContainer: {
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    color: 'black',
  },
  signupText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 18,
    color: '#8f62bf',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
