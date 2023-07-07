import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

import Snackbar from 'react-native-snackbar';

import {AppwriteContext} from '../appwrite/AppwriteContext';

const SignUp = ({navigation}) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password !== confirmPassword) {
      setError('passwords do not match');
    } else if (password.length < 8) {
      setError('password should be 8 char long');
    } else {
      const user = {
        email,
        password,
        name,
      };

      appwrite
        .createAccount(user)
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Signed up Successfully',
              duration: Snackbar.LENGTH_LONG,
            });
          }
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
        .finally(() => {
          // navigation.navigate('Login'); 
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name..."
          keyboardType="email-address"
          value={name}
          onChangeText={text => {
            setName(text);
            setError('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email..."
          keyboardType="email-address"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setError('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password..."
          secureTextEntry={true}
          value={password}
          onChangeText={text => {
            setPassword(text);
            setError('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password..."
          secureTextEntry={true}
          onChangeText={text => {
            setConfirmPassword(text);
            setError('');
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            handleSignUp();
          }}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {},
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    color: '#603882',
  },
  formContainer: {
    width: '90%',
    gap: 25,
    marginVertical: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 0.5,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  btnContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#603882',
    borderRadius: 40,
    padding: 10,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});
