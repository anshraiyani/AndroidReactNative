import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={{height:45, justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
      <Image source={require('../assets/header-icon.png')} style={{width:30,height:30, marginRight:10}} />
      <Text style={{fontSize:30,fontWeight:'700', color:'#ff6e63'}}>News App</Text>
    </View>
  )
}