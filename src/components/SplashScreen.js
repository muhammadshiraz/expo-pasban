import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CustomSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@assets/logos/logo.svg')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 274,
    height: 49,
    resizeMode: 'contain',
  },
});

export default CustomSplashScreen;
