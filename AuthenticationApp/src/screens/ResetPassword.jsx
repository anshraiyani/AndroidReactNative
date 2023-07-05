import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../constants/Colors';
import {sendPasswordResetEmail} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../FireBaseConfig';
import Pages from '../constants/Pages';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
 

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const response = await sendPasswordResetEmail(FIREBASE_AUTH, email);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setEmailSent(true);
      setTimeout(() => {
        navigation.navigate(Pages.LOGIN_PAGE);
      }, 5000);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{gap: 80}}>
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Reset Password</Text>
          <TextInput
            placeholder="Email..."
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {!isLoading ? (
            <TouchableOpacity
              style={styles.signupBtn}
              onPress={() => handleReset()}>
              <Text style={styles.signupBtnText}>Reset Password</Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}
          {emailSent ? (
            <View>
              <Text>Reset Password Link Sent to</Text>
              <Text>{email}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

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
    width: '50%',
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
