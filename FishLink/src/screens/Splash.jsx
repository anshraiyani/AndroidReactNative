import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require('../../assets/images/splash/BG.png')}>
        <View style={{gap:15,justifyContent:'center',alignItems:'center'}}>
          <Image source={require('../../assets/images/splash/Icon.png')} />
          <Text style={styles.logoText}>LAKE LINK</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#212121',
  },
  logoText:{
    fontFamily:'Audiowide-Regular',
    color:'white',
    fontSize:28
  }
});
