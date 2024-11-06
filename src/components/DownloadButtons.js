import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import ReusableModal from './ReusableModal'; // Assuming ReusableModal is in the same directory

const DownloadButtons = ({ files, onOpenModal }) => {
  const downloadFile = async (file) => {
    try {
      const path = `${FileSystem.documentDirectory}${file.name}`;
      const { uri } = await FileSystem.downloadAsync(file.url, path);

      Alert.alert(
        'Download Complete',
        `${file.name} has been downloaded to ${uri}`,
      );
    } catch (error) {
      Alert.alert('Error', `Failed to download ${file.name}: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {files.map((file) => (
        <TouchableOpacity
          key={file.name}
          style={[
            styles.button,
            file.iconName === 'pdf' && styles.pdfButton,
            file.iconName === 'excel' && styles.excelButton,
          ]}
          onPress={
            file.iconName === 'exclamation'
              ? onOpenModal
              : () => downloadFile(file)
          }
        >
          {file.iconName === 'pdf' && (
            <FontAwesome name="file-pdf-o" size={12} color="white" />
          )}
          {file.iconName === 'excel' && (
            <FontAwesome name="file-excel-o" size={12} color="white" />
          )}
          {file.iconName === 'exclamation' && (
            <AntDesign name="exclamationcircle" size={27} color="#006EDA" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 0,
    columnGap: 10,
  },
  button: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    //padding: 10,
  },
  pdfButton: {
    backgroundColor: '#F40F02', // Background color for PDF button
  },
  excelButton: {
    backgroundColor: '#1D6F42', // Background color for Excel button
  },
});

export default DownloadButtons;
