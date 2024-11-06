import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { ThemeContext } from '@context/ThemeContext';

const ProgressRectangle = ({
  size = 100, // Diameter of the circle
  strokeWidth = 5, // Thickness of the stroke
  progress = 0, // Progress percentage (0 to 100)
  maxProgress = 100, // Maximum value for progress
  progressText = '',
  color = '#4CAF50', // Color of the progress
  gradientColors = '#ccc', // Color of the background circle
  icon,
  iconSize = 30, // Size of the icon
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress / maxProgress) * circumference;
  const { getThemeColor } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.rectangleContainer,
          { borderWidth: 2, borderColor: gradientColors },
        ]}
      >
        {/* Icon */}
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 8,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              {
                width: iconSize,
                height: iconSize,
                backgroundColor: getThemeColor('icon'),
              },
            ]}
          >
            {icon}
          </View>
          {/* Progress Content */}
          <View style={styles.progressContent}>
            <Text
              style={[
                styles.progressCount,
                { color: getThemeColor('boxText') },
              ]}
            >
              {progress}
            </Text>
            <Text
              style={[styles.progressText, { color: getThemeColor('text') }]}
            >
              {progressText}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 70,
    rowGap: 3,
  },
  rectangleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 8,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 30,
    maxheight: 30,
    //position: 'absolute',
    borderRadius: 8,
  },
  progressContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    textAlign: 'center',
    rowGap: 0,
  },
  progressCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'medium',
  },
});

export default ProgressRectangle;
