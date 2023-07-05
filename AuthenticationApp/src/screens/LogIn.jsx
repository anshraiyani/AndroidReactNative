import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import Pages from '../constants/Pages';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FireBaseConfig';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const checkFormValidation = () => {
    if (!email) {
      setEmailError(true);
      return false
    } else if (!password) {
      setPassError(true);
      return false
    } else {
      setEmailError(false);
      setPassError(false);
      return true
    }
  };

  const handleSignIn = async () => {
    if(!checkFormValidation()){
      return
    }
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailError ? <Text>Invalid Email</Text> : null}
          <TextInput
            placeholder="Password... (min 6 chars)"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={text => setPassword(text)}
            />
            {passError ? <Text>Invalid password</Text> : null}
          {!isLoading ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSignIn()}>
                <Text style={styles.loginBtnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => navigation.navigate(Pages.RESET_PAGE)}>
                <Text style={styles.resetBtnText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{backgroundColor: 'white', width: 240, borderWidth: 0.5}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => handleGoogleLogin()}>
              <View style={styles.loginImageContainer}>
                <Image
                  style={styles.googleLogo}
                  source={require('../assests/google-logo.png')}
                />
              </View>
              <Text style={styles.googleText}>Login with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText1}>Dont have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(Pages.SIGNUP_PAGE)}>
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
    marginBottom: 15,
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
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  loginImageContainer: {
    height: 40,
    width: 40,
    marginLeft: 10,
  },
  googleLogo: {
    height: '100%',
    width: '100%',
    marginRight: 20,
  },
  googleText: {
    fontSize: 20,
    backgroundColor: '#476fff',
    height: '100%',
    color: 'white',
    padding: 10,
  },
});
