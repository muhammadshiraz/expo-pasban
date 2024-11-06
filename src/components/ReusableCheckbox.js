import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReusableCheckbox = ({ label, isChecked, onChange, showLabel = true }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderColor: isChecked ? '#006EDA' : '#8D8F93' },
      ]}
      onPress={() => onChange(!isChecked)}
    >
      <View
        style={[
          styles.checkbox,
          { borderColor: isChecked ? '#006EDA' : '#8D8F93' },
        ]}
      >
        {isChecked && <Icon name="check" size={16} color="#006EDA" />}
      </View>
      {showLabel && (
        <Text style={[styles.label, { color: isChecked ? '#006EDA' : '#000' }]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 14,
    marginLeft: 4,
  },
});

export default ReusableCheckbox;
