import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {AppwriteContext} from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';

const LogIn = ({navigation}) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then(response=>{
          if(response){
            setIsLoggedIn(true)
            Snackbar.show({
              text:'Login Success!',
              duration:Snackbar.LENGTH_LONG
            })
          }
        })
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Authentication App</Text>
        <Text style={styles.headerSubText}>Log In</Text>
      </View>
      <View style={styles.formContainer}>
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
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            handleLogin();
          }}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={{fontSize: 20}}>Dont have an account? </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    gap: 20,
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    color: '#603882',
  },
  headerSubText: {
    fontSize: 25,
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
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    fontSize: 18,
    color: '#603882',
    fontWeight:'bold'
  },
});
