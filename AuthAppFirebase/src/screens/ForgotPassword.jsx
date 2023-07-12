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

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleReset = (async = () => {
    if(email===''){
      Snackbar.show({
        text: 'All Fields are compulsory',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }
    auth()
    .sendPasswordResetEmail(email)
    .then(()=>{
      Snackbar.show({
        text:`Reset Link Sent to ${email}`,
        duration:Snackbar.LENGTH_LONG
      })
    })
    .catch(error=>{
      switch (error.code) {
        case 'auth/invalid-email': {
          Snackbar.show({
            text: 'Invalid Email',
            duration: Snackbar.LENGTH_LONG,
          });
          break;
        }
        case 'auth/user-not-found': {
          Snackbar.show({
            text: 'No User exists with this email!',
            duration: Snackbar.LENGTH_LONG,
          });
          break;
        }
      }
    })
    .finally(()=>{
      navigation.goBack()
    })
  });

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
          <TouchableOpacity style={styles.loginContainer} onPress={handleReset}>
            <Text style={styles.loginText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'space-between',
    height: '100%',
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
  loginContainer: {
    padding: 10,
    backgroundColor: '#8f62bf',
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  loginText: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  formContainer: {
    alignItems: 'center',
    gap: 10,
  },
});
