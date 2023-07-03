import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function NewsButtons(props) {
  return (
    <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
    >
        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('general')}>
            <Text style={styles.text}>General</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('business')}>
            <Text style={styles.text}>Business</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('entertainment')}>
            <Text style={styles.text}>Entertainment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('health')}>
            <Text style={styles.text}>Health</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('technology')}>
            <Text style={styles.text}>Technology</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('science')}>
            <Text style={styles.text}>Science</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=>props.setNewsButton('sports')}>
            <Text style={styles.text}>Sports</Text>
        </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
    
    button:{
        backgroundColor:'#ff6e63',
        marginRight:15,
        marginLeft:10,
        marginVertical:15,
        padding:8,
        borderRadius:5
    },
    
    text:{
        color:'white',
        fontWeight:'700'
    }
  
  });