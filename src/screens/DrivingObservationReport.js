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

const DrivingObservationReport = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const carInfoSections = [
    {
      id: 1,
      info: [
        { label: 'Region', value: 'Lahore' },
        { label: 'Date', value: '04-Oct-2024' },
        { label: 'Last Observation', value: '04-Oct-2024' },
        { label: 'Business Group', value: 'General Trade' },
        { label: 'Designation', value: 'Territory Manager' },
        { label: 'Line Manager', value: 'Majid bajwa' },
        { label: 'Observe All Sides', value: 'Yes' },
        { label: 'Safety Belt Fastened', value: 'Yes' },
        { label: 'Check Passenger Safety Belt', value: 'Yes' },
      ],
    },
    {
      id: 2,
      info: [
        { label: 'Proper Lane Entry', value: 'Good' },
        { label: 'Speed on Curves', value: 'Good' },
        { label: 'Confident Curve Path', value: 'Good' },
        { label: 'Relaxed Driving', value: 'Good' },
        { label: 'Tolerates Other Drivers', value: 'Good' },
        { label: 'Considerate to Pedestrians', value: 'Yes' },
        { label: 'Plans, Checks Sides & Behind', value: 'Yes' },
        { label: 'Check Blind Spots', value: 'Yes' },
        { label: 'Reverses Carefully', value: 'Yes' },
      ],
    },
    {
      id: 3,
      info: [
        { label: 'Reverses Correctly', value: 'No' },
        { label: 'Scans Ahead', value: 'Yes' },
        { label: 'Uses Mirrors', value: 'No' },
        { label: 'Observes Road Signs', value: 'Yes' },
        { label: 'Maintains Safe Distance', value: 'No' },
        { label: 'Anticipates Others Actions', value: 'No' },
        { label: 'Passing Clearance', value: 'No' },
        { label: 'Timely Signals', value: 'No' },
        { label: 'Checks Blind Spots While Driving', value: 'No' },
      ],
    },
    {
      id: 4,
      info: [
        { label: 'Safe Driving Speed', value: 'No' },
        { label: 'Vehicle Positioning', value: 'No' },
        { label: 'Incident This Month', value: 'No' },
        { label: 'Distance', value: 'No' },
        { label: 'Inspection', value: 'No' },
        { label: 'Front Safe Distance', value: 'Yes' },
        { label: 'Back Safe Distance', value: 'No' },
        { label: 'Brakes', value: 'Yes' },
        { label: 'Comments', value: 'Yes' },
      ],
    },
    {
      id: 5,
      info: [
        { label: 'Percentage', value: '87' },
        { label: 'Entered By', value: 'VA-10210485' },
        { label: 'Entry Date', value: '04-Oct-2024' },
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
    navigation.navigate('DrivingObservation');
  };

  return (
    <InvoiceLayout>
      <View style={styles.container}>
        {/* Car Info */}
        <View style={styles.carInfo}>
          <Image
            source={require('@assets/icons/driver-icon.jpg')} // Path to your static image
            style={styles.vehIcon}
            resizeMode="contain"
          />
          <View style={styles.ltoContent}>
            <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
              Local ID # 9121
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 14, fontWeight: 'semibold' }}
            >
              Owner: Ghazala Nosheen
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

export default DrivingObservationReport;
