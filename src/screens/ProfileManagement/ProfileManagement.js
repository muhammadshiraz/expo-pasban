import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Layout from '@components/Layout';
import InputField from '@components/InputField';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalComponent from '@components/ModalComponent';
import SelVehicle from '@assets/icons/selVehicle.svg';
import TripDuration from '@assets/icons/tripDuration.svg';
import Region from '@assets/icons/region.svg';
import UitCalender from '@assets/icons/uit_calender.svg';

const ProfileManagement = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [selectedReportTitle, setSelectedReportTitle] = useState(''); // State for the selected report title
  const navigation = useNavigation();

  const ProfileManagementData = [
    { id: 1, title: 'Admin' },
    { id: 2, title: 'Asst Admin' },
    { id: 3, title: 'Doctor' },
    { id: 4, title: 'Expired' },
    { id: 5, title: 'GSM' },
    { id: 6, title: 'Line Manager' },
    { id: 7, title: 'Megatech User' },
    { id: 8, title: 'Removed' },
    { id: 9, title: 'Sub Admin' },
    { id: 10, title: 'Super-WTS-Admin' },
  ];

  // Function to handle report selection and open the modal
  const handleReportPress = (title) => {
    navigation.navigate('UserManagement', {
      reportTitle: title,
    });
  };

  return (
    <Layout
      type="innerScreen"
      title="Profile Management"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <Text style={styles.ProfileManagementTitle}>User Role List</Text>
          {ProfileManagementData.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={[styles.ProfileManagementList, { borderBottomWidth: 1 }]}
              onPress={() => handleReportPress(report.title)} // Open modal for the selected report
            >
              <View style={styles.ProfileManagement}>
                <Text style={styles.ProfileManagementText}>{report.title}</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          ))}
        </LayoutCard>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  ProfileManagementTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  ProfileManagementList: {
    flexDirection: 'column',
    borderBottomColor: '#DBDBDB',
    paddingBottom: 8,
  },
  ProfileManagement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ProfileManagementText: {
    color: '#000000',
    fontSize: 14,
  },
  col: {
    flexDirection: 'column',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: 8,
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'column',
    rowGap: 3,
  },
  showRepoBtn: {
    alignItems: 'flex-end',
  },
  showRepoBtnText: { color: '#006EDA', fontWeight: 'bold' },
});

export default ProfileManagement;
