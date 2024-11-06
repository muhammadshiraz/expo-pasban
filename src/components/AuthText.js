import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames'; // If you are using Tailwind for styling
import { ThemeContext } from '@context/ThemeContext';

const AuthText = ({ textType, onPress }) => {
  let textContent, buttonText;
  switch (textType) {
    case 'forgotPassword':
      textContent = 'Forgot password?';
      buttonText = 'Reset it';
      break;
    case 'signUp':
      textContent = "Don't have an account?";
      buttonText = 'Sign Up';
      break;
    case 'signIn':
      textContent = 'Already have an account?';
      buttonText = 'Sign In';
      break;
    default:
      textContent = '';
      buttonText = '';
  }

  const { getThemeColor } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: getThemeColor('authTextColor') }]}>
        {textContent}
      </Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.button, { color: getThemeColor('primary') }]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'regular',
    marginRight: 5,
  },
  button: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default AuthText;
