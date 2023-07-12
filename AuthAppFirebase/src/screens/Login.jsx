import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import auth, {firebase} from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {updateFavoriteMovies, updateWatchlist} from '../redux/slices/userSlice';

const Login = ({navigation}) => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '769499210560-33ib5om9h2dm5kgalmnepskaua1an3ap.apps.googleusercontent.com',
  //   });
  // }, []);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        Snackbar.show({
          text: 'Logged in Successfully!',
        });
        const uid = auth().currentUser.uid;
        const firestoreRef = firestore().collection('users').doc(uid);
        firestoreRef.get().then(doc => {
          if (doc.exists) {
            const data = doc.data();
            const favoriteMovies = data.favorite || [];
            const watchListMovies = data.watchlist || [];
            dispatch(updateFavoriteMovies(favoriteMovies));
            dispatch(updateWatchlist(watchListMovies));
          }
        });
      })
      .catch(error => {
        Snackbar.show({
          text:error,
          duration:Snackbar.LENGTH_LONG
        })
      });
  };

  // const handleGoogleSignin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     // Get the users ID token
  //     const {idToken} = await GoogleSignin.signIn();

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     Snackbar.show({
  //       text: 'Logged in Successfully!',
  //     });
  //     // Sign-in the user with the credential
  //     return auth().signInWithCredential(googleCredential);
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
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <Text style={styles.titleText}>MMDB</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Log in</Text>
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
          {/* <View style={styles.btnContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
      </View> */}
          {/* <Button title="Login with google" onPress={handleGoogleSignin} /> */}

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.loginContainer} onPress={handleLogin}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetContainer}>
              <Text style={styles.resetText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Dont have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent:'space-between',
    height:'100%',
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
    marginVertical: 15,
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
  footerContainer:{
    alignItems:'center',
    marginBottom:20
  },
});
