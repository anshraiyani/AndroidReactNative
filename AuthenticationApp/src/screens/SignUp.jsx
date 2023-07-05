import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import {FIREBASE_AUTH} from '../../FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isMatch, setIsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setIsLoading(true)
    try{
      const respone=createUserWithEmailAndPassword(auth,email,password)
      console.log(respone)
    }catch(err){
      console.error(err)
    }finally{
      setIsLoading(false)
    }
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setIsMatch(false);
      return;
    } else {
      setIsMatch(true);
      signUp();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{gap: 80}}>
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Sign Up</Text>
          <TextInput
            placeholder="Email..."
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="Password..."
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm Password..."
            secureTextEntry={true}
            style={styles.input}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          {!isMatch ? (
            <Text style={styles.passError}>Passwords do not match!</Text>
          ) : null}
          {
            !isLoading ?
          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => handleSignUp()}>
            <Text style={styles.signupBtnText}>Sign Up</Text>
          </TouchableOpacity>:
          <ActivityIndicator />
          }
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  loginText: {
    color: Colors.DARK_BLUE,
    fontSize: 27,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 25,
    gap: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.LIGHT_GREY,
    padding: 10,
    width: '100%',
  },
  signupBtn: {
    backgroundColor: Colors.DARKER_BLUE,
    width: '40%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
  },
  signupBtnText: {
    color: Colors.WHITE,
    fontSize: 17,
  },
  passError: {
    color: Colors.RED,
    fontSize: 15,
  },
});
