import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ThemeContext } from '@context/ThemeContext';

const ActionText = ({ type, onPress }) => {
  const { getThemeColor } = useContext(ThemeContext);
  let preText = '';
  let actionText = '';

  switch (type) {
    case 'forgotPassword':
      preText = 'Forgot password? ';
      actionText = 'Reset it';
      break;
    case 'signUp':
      preText = "Don't have an account? ";
      actionText = 'Sign Up';
      break;
    case 'signIn':
      preText = 'Already have an account? ';
      actionText = 'Sign In';
      break;
    default:
      preText = '';
      actionText = '';
  }

  return (
    <View style={tw`flex-row`}>
      <Text
        style={[
          tw`text-xs font-normal`,
          { color: getThemeColor('actionText') },
        ]}
      >
        {preText}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[tw`text-xs font-bold`, { color: getThemeColor('primary') }]}
        >
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionText;
