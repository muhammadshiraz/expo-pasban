import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = ({ navigation }) => {
  const handleDone = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      navigation.navigate('Home'); // Navigate to HomeScreen after onboarding
    } catch (error) {
      console.error('Error setting AsyncStorage item:', error);
    }
  };

  return (
    <ImageBackground
      source={require('@assets/onboarding-bg.png')}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.58)', 'rgba(102, 102, 102, 1)']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text>Welcome to the Onboarding Screen!</Text>
          <Button title="Get Started" onPress={handleDone} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
