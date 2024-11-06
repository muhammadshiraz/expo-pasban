// ProgressCircle.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { ThemeContext } from '@context/ThemeContext';

const ProgressCircle = ({
  size = 100, // Diameter of the circle
  strokeWidth = 5, // Thickness of the stroke
  progress = 0, // Progress percentage (0 to 100)
  maxProgress = 100, // Maximum value for progress
  progressText = '',
  color = '#4CAF50', // Color of the progress
  backgroundColor = '#ccc', // Color of the background circle
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
      <View style={styles.circleContainer}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="none"
          />
        </Svg>
        {/* Icon */}
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
      </View>
      {/* Progress Content */}
      <View style={styles.progressContent}>
        <Text
          style={[styles.progressCount, { color: getThemeColor('boxText') }]}
        >
          {progress}
        </Text>
        <Text style={[styles.progressText, { color: getThemeColor('text') }]}>
          {progressText}
        </Text>
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
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 8,
  },
  progressContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    rowGap: 3,
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

export default ProgressCircle;
