import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import InvoiceLayout from '@components/InvoiceLayout';
import { ThemeContext } from '@context/ThemeContext';
import RoundedButton from '@components/RoundedButton';
import MdiTick from '@assets/icons/mdi_tick.svg';
import RejectIcon from '@assets/icons/reject.svg';
import RightArrow from '@assets/icons/right-arrow.svg';
import { getAuthData } from '@utils/authStorage';
import LoadingIndicator from '@components/LoadingIndicator';

const VehicleObservationReport = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const carInfoSections = [
    {
      id: 1,
      info: [
        { label: 'Employee Name', value: 'Adeel Ikram' },
        { label: 'Line Manager', value: 'Muzaffar Rehman' },
        { label: 'Local ID', value: '920712' },
        { label: 'Vehicle No #', value: 'BVN-542' },
        { label: 'Region', value: 'Karachi' },
        { label: 'Assessee', value: 'Adeel Ikram' },
        { label: 'Designation', value: 'Territory Manager' },
        { label: 'Driving Observation Date', value: '18-Feb-2023' },
        { label: 'Business Group', value: 'General Trade' },
      ],
    },
    {
      id: 2,
      info: [
        { label: 'Fuel (One Tour)', value: 'Yes' },
        { label: 'Radiator Water Filled', value: 'Yes' },
        { label: 'Windshield Water Filled', value: 'Yes' },
        { label: 'Engine Oil Level OK', value: 'Yes' },
        { label: 'Brake Fluid Level OK', value: 'Yes' },
        { label: 'Clutch Fluid Level OK', value: 'Yes' },
        { label: 'Ignition Switch Working', value: 'Yes' },
        { label: 'Parts Functional', value: 'No' },
        { label: 'Radiator Fan Working', value: 'Yes' },
      ],
    },
    {
      id: 3,
      info: [
        { label: 'Tire Pressure OK', value: 'No' },
        { label: 'Pedal Rubber OK', value: 'No' },
        { label: 'Wiper Rubber OK', value: 'No' },
        { label: 'Wiper Function OK', value: 'No' },
        { label: 'Vehicle Damaged', value: 'No' },
        { label: 'Log Filled On Time', value: 'No' },
        { label: 'Spare Tire OK', value: 'No' },
        { label: 'First Aid Kit Available', value: 'No' },
        { label: 'Seat Belts Functional', value: 'No' },
      ],
    },
    {
      id: 4,
      info: [
        { label: 'Side/Rear Mirrors OK', value: 'No' },
        { label: 'Last Tuning Date', value: '2024-07-09' },
        { label: 'Last Service Date', value: '2024-07-09' },
        { label: 'Next Inspection Date', value: '2024-07-09' },
        { label: 'Last Month Findings', value: 'Cleaning' },
        { label: 'Improvement Since Last Month', value: 'No' },
        { label: 'Other Observations', value: 'Ok' },
      ],
    },
  ];

  // Function to fetch user data and set userName and userRole
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authData = await getAuthData();
        if (authData) {
          // Set userName and userRole based on the retrieved authData
          switch (authData.role) {
            case 'admin':
              setUserRole('Admin');
              break;
            case 'user':
              setUserRole('User');
              break;
            case 'gsm':
              setUserRole('GSM');
              break;
            default:
              setUserRole('Guest');
              break;
          }
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  const handlePress = () => {
    navigation.navigate('VehicleObservation');
  };

  return (
    <InvoiceLayout>
      <View style={styles.container}>
        {/* Car Info */}
        <View style={styles.carInfo}>
          <Image
            source={require('@assets/icons/veh-obser.png')} // Path to your static image
            style={styles.vehIcon}
            resizeMode="contain"
          />
          <View style={styles.ltoContent}>
            <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
              Employee ID # 9121
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 14, fontWeight: 'semibold' }}
            >
              Vehicle No BZB-762
            </Text>
          </View>
        </View>
        {carInfoSections.map((section, index) => (
          <View key={section.id} style={styles.carUserInfo}>
            {section.info.map((item, idx) => (
              <View key={idx} style={styles.carUserInfoRow}>
                <Text style={{ fontSize: 12, color: '#757575' }}>
                  {item.label}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'medium',
                    color: '#000000',
                  }}
                >
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        ))}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            columnGap: 14,
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 20,
          }}
        >
          <RoundedButton
            text="Close"
            onPress={handlePress}
            loading={false}
            buttonColor="#000000"
            textColor="#FFFFFF"
            size="medium"
          />
        </View>
      </View>
    </InvoiceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carInfo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 14,
  },
  ltoContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 2,
  },
  carUserInfo: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#DEDEDE',
    borderTopWidth: 1,
    width: '100%',
    marginTop: 12,
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 10,
  },
  carUserInfoRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 14,
  },
  carUserStatus: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#DEDEDE',
    borderBottomWidth: 1,
  },
  carUserStatusRow: {
    flex: 1,
    borderColor: '#DEDEDE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    paddingBottom: 5,
    marginBottom: 5,
  },
  carUserContentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginBottom: 5,
    columnGap: 30,
  },
  vehIcon: {
    width: 100,
    height: 100,
  },
});

export default VehicleObservationReport;
