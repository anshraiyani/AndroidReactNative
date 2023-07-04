import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {increment,decrement, selectCount} from './counterSlice'

const Counter = () => {
    const count =useSelector(selectCount)
    const dispatch=useDispatch()
  return (
    <View>
        <Button title='+' onPress={()=>dispatch(increment())} /> 
        <Text>{count}</Text>
        <Button title='-' onPress={()=>dispatch(decrement())}/> 
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({})