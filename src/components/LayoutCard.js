import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemeContext } from '@context/ThemeContext';

const LayoutCard = ({ cardBgColor, children, style }) => {
  const { getThemeColor } = useContext(ThemeContext);
  const backgroundColor = cardBgColor || getThemeColor('background');

  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor,
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Render children here */}
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 30,
    overflow: 'hidden', // Ensure content doesn't overflow the card
  },
  scrollView: {
    flexGrow: 1, // Allows content to scroll if it overflows
    rowGap: 20,
  },
});

export default LayoutCard;
