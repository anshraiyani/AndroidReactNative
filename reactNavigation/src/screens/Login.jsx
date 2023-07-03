import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

export default function Login({navigation}) {
  return (
    <View style={{height:'100%',justifyContent:'space-between'}}>
      <View>

      <View style={{justifyContent:'center',alignItems:'center',padding:15}}>
        <Text style={{fontSize:25,fontWeight:'bold'}}>Log in to continue</Text>
      </View>
      <View>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" />
        <TouchableOpacity style={styles.btnContainer} onPress={()=>navigation.navigate('HomePage')}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      </ View>
      <View style={{flexDirection:'row',justifyContent:'center',marginBottom:15}}>
        <Text>Dont have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
          <Text style={styles.forgotPassText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 15,
    borderColor: 'rgba(0,0,0,.2)',
  },
  btnContainer: {
    backgroundColor: '#9b63db',
    margin: 10,
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassText: {
    color: '#9b63db',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
