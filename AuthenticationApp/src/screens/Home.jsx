import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../FireBaseConfig'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Button title='Logout' onPress={()=>FIREBASE_AUTH.signOut()} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})