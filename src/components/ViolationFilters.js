import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '@context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from 'tailwind-react-native-classnames';
import CustomSwitch from '@components/CustomSwitch';

const ViolationFilters = ({ isSwitchOn, toggleSwitch }) => {
  const { getThemeColor } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getThemeColor('background1') },
      ]}
    >
      <View style={[styles.content, { columnGap: 8 }]}>
        <View
          style={[
            styles.icon,
            { backgroundColor: getThemeColor('background') },
          ]}
        >
          <AntDesign name="filter" size={16} color={getThemeColor('h1')} />
        </View>
        <Text
          style={[styles.text, { fontWeight: 400, color: getThemeColor('h1') }]}
        >
          Show Violation Filters:
        </Text>
      </View>
      <CustomSwitch
        isOn={isSwitchOn}
        onToggle={toggleSwitch}
        activeColor="#006EDA"
        inactiveColor="#D6D6D6"
        width={48} // Custom width
        height={25} // Custom height
        ballSize={22} // Custom ball size
        switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 45,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 5,
  },
});

export default ViolationFilters;
