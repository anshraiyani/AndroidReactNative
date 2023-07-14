import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <View style={{backgroundColor: 'black',height:'100%',width:'100%'}}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.loginText}>LOGIN</Text>
            <Text style={styles.headerText}>Please sign in to continue</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Johndoe@hotmail.com"
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.lable}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor={'grey'}
              />
            </View>
            <View style={{alignItems: 'flex-end', width: '100%'}}>
              <TouchableOpacity>
                <Text style={styles.resetText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity style={styles.signupBtn}>
              <Text style={styles.signupBtnText}>Signup Free!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/splash/Vector.png')}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
    backgroundColor: 'black',
    padding: 20,
  },
  loginText: {
    color: 'white',
    fontFamily: 'Audiowide-Regular',
    fontSize: 22,
  },
  header: {
    marginVertical: 20,
    gap: 5,
  },
  headerText: {
    color: '#bdbdbd',
    fontSize: 15,
    fontWeight: '300',
  },
  form: {
    gap: 18,
    width: '100%',
  },
  lable: {
    color: 'white',
  },
  input: {
    backgroundColor: '#212121',
    padding: 12,
    borderRadius: 5,
    color: 'white',
    fontSize: 14,
  },
  resetText: {
    color: 'white',
  },
  inputContainer: {
    width: '100%',
    gap: 8,
  },
  loginBtn: {
    backgroundColor: '#7dff8a',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  loginBtnText: {
    fontFamily: 'Audiowide-Regular',
    color: 'black',
    fontSize: 18,
  },
  signupBtn: {},
  signupBtnText: {
    color: '#7dff8a',
    fontWeight: '600',
    fontSize: 15,
  },
  signupText: {
    color: '#bdbdbd',
    fontWeight: '300',
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer:{
    width:'100%',
    height:'40%'
  }
});
