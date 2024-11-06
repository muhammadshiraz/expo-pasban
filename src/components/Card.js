import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@context/ThemeContext';

const Card = ({
  titleAbove,
  titleBelow,
  children,
  customContent,
  marginBottom = 15,
}) => {
  const { getThemeColor } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getThemeColor('background2'),
          shadowColor: getThemeColor('pickerModalBackground'),
          marginBottom,
        },
      ]}
    >
      {titleAbove && (
        <View style={styles.titleContainer}>
          <Text style={[styles.titleAbove, { color: getThemeColor('h1') }]}>
            {titleAbove}
          </Text>
          {customContent}
        </View>
      )}
      <View style={styles.content}>{children}</View>
      {titleBelow && (
        <Text style={[styles.titleBelow, { color: getThemeColor('h1') }]}>
          {titleBelow}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleAbove: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  titleBelow: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
});

export default Card;
