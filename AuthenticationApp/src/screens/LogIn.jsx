import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Pages from '../constants/Pages';

const Login = ({navigation}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{gap: 80}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Authentication App</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Log in</Text>
          <TextInput
            placeholder="Email..."
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password..."
            secureTextEntry={true}
            style={styles.input}
          />
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetBtn}>
            <Text style={styles.resetBtnText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText1}>Dont have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate(Pages.SIGNUP_PAGE)}>
          <Text style={styles.signupText2}>Sign Up!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  titleText: {
    color: Colors.DARK_BLUE,
    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleContainer: {
    marginTop: 30,
    gap: 20,
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
  loginBtn: {
    backgroundColor: Colors.DARKER_BLUE,
    width: '40%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
  },
  loginBtnText: {
    color: Colors.WHITE,
    fontSize: 17,
  },
  resetBtn: {
    backgroundColor: Colors.WHITE,
    width: '50%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
    borderColor: Colors.DARKER_BLUE,
    borderWidth: 1,
  },
  resetBtnText: {
    color: Colors.DARKER_BLUE,
    fontSize: 17,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  signupText1: {
    fontSize: 17,
    color: Colors.BLACK,
  },
  signupText2: {
    color: Colors.DARK_BLUE,
    fontSize: 17,
    fontWeight: '700',
  },
});
