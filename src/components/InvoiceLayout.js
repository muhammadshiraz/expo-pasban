import React, { useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const InvoiceLayout = ({ children }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="close" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View> */}
      <ScrollView style={styles.content}>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="close" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>{children}</View>
      </ScrollView>
      <View style={styles.whiteCardBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    height: '100%',
    backgroundColor: '#006EDA',
  },
  backButton: {
    paddingHorizontal: 5,
  },
  content: {
    position: 'relative',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    borderRadius: 20,
    marginBottom: 50,
  },
  whiteCardBg: {
    height: 480,
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
    backgroundColor: 'white',
  },
});

export default InvoiceLayout;
