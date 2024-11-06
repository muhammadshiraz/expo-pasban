// CountCard.js
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from '@context/ThemeContext';

// Get screen dimensions
const { width } = Dimensions.get('window');

// The CountCard component
const CountCard = ({
  showKM,
  count = 0, // Default value for count
  label = '', // Label for the card
  cardStyle, // Optional additional styles for the card
}) => {
  const { getThemeColor } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.card,
        cardStyle,
        {
          backgroundColor: getThemeColor('background2'),
          shadowColor: getThemeColor('pickerModalBackground'),
        },
      ]}
    >
      {/* Static Background image */}
      <Image
        source={require('@assets/images/count_card_bg.png')} // Path to your static image
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Card content */}
      <View style={styles.content}>
        <View style={styles.countContainer}>
          <Text style={styles.count}>{count}</Text>
          {showKM}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

// Styles for the CountCard component
const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    minHeight: 66, // Minimum height to ensure the card has some vertical space
    backgroundColor: 'white', // Card background color
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60, // Adjust size as needed
    height: 60, // Adjust size as needed
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // Align the count and KM text vertically
    justifyContent: 'center',
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500', // Adjusted to '500' for medium weight
    color: '#000000',
  },
  km: {
    fontSize: 12, // Smaller font size for KM
    marginLeft: 1,
    fontWeight: 500,
  },
});

export default CountCard;
