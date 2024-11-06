import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const Tooltip = ({ vehicle, onClose }) => {
  // Define the array of information
  const vehicleInfo = [
    { label: 'Vehicle Number:', value: vehicle.number || 'TLH-252' },
    { label: 'Contact Number:', value: vehicle.driverName || '03000881621' },
    {
      label: 'Date Time:',
      value: vehicle.dateTime || '05:43:02 pm 09-09-2024',
    },
    { label: 'Speed:', value: vehicle.speed || '61 km/h' },
    { label: 'Latitude:', value: vehicle.lat || '25.06083' },
    { label: 'Longitude:', value: vehicle.long || '67.00635' },
    {
      label: 'Location:',
      value:
        vehicle.location ||
        'New Dua Restaurant, Karachi Northern Bypass, Gadap Town, Karachi, Sindh',
    },
    // Add more key-value pairs as needed
  ];

  return (
    <View style={styles.tooltip}>
      <TouchableOpacity style={styles.onClose} onPress={onClose}>
        <Entypo name="cross" size={18} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Vehicle is Moving</Text>
      {/* Map through the vehicleInfo array and render InfoRow dynamically */}
      {vehicleInfo.map((info, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.boldText}>{info.label}</Text>
          <Text style={styles.normalText}>{info.value}</Text>
        </View>
      ))}
      <View style={styles.arrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    bottom: 290,
    left: '50%',
    transform: [{ translateX: -140 }],
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    bottom: -7, // Position the arrow below the tooltip
    left: '50%',
    marginLeft: -6, // Half of the arrow width (12px)
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white', // Match with tooltip background color
    transform: [{ rotate: '60deg' }], // Permanently point down
  },
  onClose: {
    position: 'absolute',
    right: 6,
    top: 10,
    width: 20,
    height: 20,
  },
  row: {
    flexDirection: 'row',
    columnGap: 3,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  normalText: {
    fontWeight: 'normal',
    fontSize: 12,
    width: 250,
    textAlign: 'left',
  },
});

export default Tooltip;
