// CustomSwitch.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Circle, Rect } from 'react-native-svg';

const CustomSwitch = ({
  isOn,
  onToggle,
  label,
  activeColor = '#4CAF50',
  inactiveColor = '#ccc',
  width = 50, // default width
  height = 25, // default height
  ballSize = 22, // default ball size
}) => {
  const switchWidth = width;
  const switchHeight = height;
  const trackColor = isOn ? activeColor : inactiveColor;
  const thumbX = isOn ? switchWidth - ballSize : 0;

  return (
    <View
      style={[styles.container, { width: switchWidth, height: switchHeight }]}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={[
          styles.switchContainer,
          {
            backgroundColor: trackColor,
            width: switchWidth,
            height: switchHeight,
          },
        ]}
      >
        <Svg height={switchHeight} width={switchWidth}>
          <Rect
            x="0"
            y="0"
            width={switchWidth}
            height={switchHeight}
            rx={switchHeight / 2}
            fill={trackColor}
          />
          <Circle
            cx={thumbX + ballSize / 2}
            cy={switchHeight / 2}
            r={ballSize / 2}
            fill="#fff"
            stroke={trackColor}
            strokeWidth={2}
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50, // Ensure this matches half of height for rounded edges
    paddingHorizontal: 25,
  },
});

export default CustomSwitch;
