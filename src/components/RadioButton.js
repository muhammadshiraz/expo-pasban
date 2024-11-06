import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[styles.radioCircle, selected && styles.selectedRadioCircle]}
      >
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8D8F93',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioCircle: {
    borderColor: '#006EDA', // Change color for selected state
  },
  radioDot: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: '#006EDA', // Color of the selected dot
  },
  label: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default RadioButton;
