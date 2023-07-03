import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const SignUp = () => {
  return (
    <>
    </>
    // <KeyboardAvoidingView style={styles.container}>
    //   <View style={{gap: 80}}>
    //     <View style={styles.formContainer}>
    //       <Text style={styles.loginText}>Sign Up</Text>
    //       <TextInput
    //         placeholder="Email..."
    //         style={styles.input}
    //         keyboardType="email-address"
    //       />
    //       <TextInput
    //         placeholder="Password..."
    //         secureTextEntry={true}
    //         style={styles.input}
    //       />
    //       <TouchableOpacity style={styles.loginBtn}>
    //         <Text style={styles.loginBtnText}>Log In</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.resetBtn}>
    //         <Text style={styles.resetBtnText}>Forgot Password</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    //   <View style={styles.signupContainer}>
    //     <Text style={styles.signupText1}>Dont have an account? </Text>
    //     <TouchableOpacity onPress={()=>navigation.navigate(Pages.SIGNUP_PAGE)}>
    //       <Text style={styles.signupText2}>Sign Up!</Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({})