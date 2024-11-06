import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ButtonComponent = ({ title, onPress, type = 'default', icon, style }) => {
  const getButtonStyles = () => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'text':
        return styles.textButton;
      case 'icon':
        return styles.iconButton;
      default:
        return styles.defaultButton;
    }
  };

  const getTextStyles = () => {
    switch (type) {
      case 'primary':
        return styles.primaryButtonText;
      case 'secondary':
        return styles.secondaryButtonText;
      case 'text':
        return styles.textButtonText;
      case 'icon':
        return styles.icon;
      default:
        return styles.defaultButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyles(), style]}
      onPress={onPress}
    >
      {icon ? (
        <Icon name={icon} style={getTextStyles()} />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  defaultButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android shadow
  },
  primaryButton: {
    backgroundColor: '#006EDA',
  },
  secondaryButton: {
    //backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#006EDA',
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#006EDA',
    height: 'auto',
  },
  iconButton: {
    width: 18,
    height: 18,
    backgroundColor: '#006EDA',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006EDA',
  },
  defaultButtonText: {
    color: '#006EDA',
    fontWeight: '500',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  secondaryButtonText: {
    color: '#006EDA',
    fontWeight: '500',
  },
  textButtonText: {
    color: '#006EDA',
    fontWeight: 'bold',
    fontSize: 10,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ButtonComponent;
