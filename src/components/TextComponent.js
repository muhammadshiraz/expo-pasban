import React, { useState, useContext } from 'react';
import { Text as RNText } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { ThemeContext } from '@context/ThemeContext';

const StyledText = ({ children, style }) => {
  const { getThemeColor } = useContext(ThemeContext);

  return (
    <RNText
      style={[tw`text-xs font-normal`, style, { color: getThemeColor('text') }]}
    >
      {children}
    </RNText>
  );
};

export default StyledText;
