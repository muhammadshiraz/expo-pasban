import React from 'react';
import LoadingIndicator from '@components/LoadingIndicator';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import RightArrow from '@assets/icons/right-arrow.svg'; // Default icon

const RoundedButton = ({
  text,
  onPress,
  loading = false,
  disabled = false,
  icon: Icon = RightArrow, // Default icon
  buttonColor = '#006EDA',
  textColor = '#ffffff',
  iconPosition = 'right', // Accepts 'left' or 'right'
  buttonStyle,
  textStyle,
  iconStyle,
  size = 'medium',
  borderColor, // New prop for border color
  borderWidth = 0, // New prop for border width
}) => {
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 20 }; // default is medium
    }
  };

  const combinedButtonStyle = [
    styles.button,
    getButtonSize(),
    { backgroundColor: buttonColor, opacity: disabled ? 0.7 : 1 },
    borderColor && {
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderStyle: 'solid',
    }, // Add border styles
    buttonStyle,
  ];

  const combinedTextStyle = [styles.text, { color: textColor }, textStyle];

  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator size="large" color="#006EDA" />;
    }
    return (
      <View style={styles.contentContainer}>
        {iconPosition === 'left' && Icon && (
          <Icon style={[styles.icon, iconStyle]} />
        )}
        <Text style={combinedTextStyle}>{text}</Text>
        {iconPosition === 'right' && Icon && (
          <Icon style={[styles.icon, iconStyle]} />
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={combinedButtonStyle}
      onPress={onPress}
      disabled={loading || disabled}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100, // Rounded button
    columnGap: 8,
    width: '100%',
    minHeight: 45,
    maxHeight: 45,
    borderWidth: 0, // Default border width
  },
  text: {
    fontSize: 14,
    fontWeight: 'semibold',
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 2.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 5,
  },
});

export default RoundedButton;
