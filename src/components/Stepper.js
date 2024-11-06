import React from 'react';
import { View, StyleSheet } from 'react-native';

const Stepper = ({ totalSteps, currentStep, marginLeftConnector }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={styles.dotContainer}>
          <View
            style={[
              styles.dot,
              index === currentStep ? styles.activeDot : styles.inactiveDot,
            ]}
          />
          {index < totalSteps - 1 && (
            <View
              style={[styles.connector, { marginLeft: marginLeftConnector }]}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    minHeight: 12,
    maxHeight: 12,
    position: 'relative',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // Center the dot
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 100,
  },
  activeDot: {
    backgroundColor: '#006EDA', // Color for active dot
  },
  inactiveDot: {
    borderWidth: 1,
    borderColor: '#B9B9C3',
  },
  connector: {
    width: 40,
    height: 1,
    backgroundColor: '#B9B9C3',
  },
});

export default Stepper;
