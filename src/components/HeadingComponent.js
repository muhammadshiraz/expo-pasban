import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingComponent = ({ size, color, children, style }) => {
  const getHeadingStyles = () => {
    switch (size) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'h5':
        return styles.h5;
      case 'h6':
        return styles.h6;
      default:
        return styles.h1;
    }
  };

  return <Text style={[getHeadingStyles(), { color }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HeadingComponent;
