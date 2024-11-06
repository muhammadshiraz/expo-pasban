import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import InvoiceLayout from '@components/InvoiceLayout';
import { ThemeContext } from '@context/ThemeContext';
import RoundedButton from '@components/RoundedButton';
import Car from '@assets/icons/alsvin.svg';
import CarLogo from '@assets/icons/alsvin_logo.svg';
import MdiTick from '@assets/icons/mdi_tick.svg';
import RejectIcon from '@assets/icons/reject.svg';
import RightArrow from '@assets/icons/right-arrow.svg';
import { getAuthData } from '@utils/authStorage';
import LoadingIndicator from '@components/LoadingIndicator';

const ApprovedLTO = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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
    if (userRole === 'Admin') {
      navigation.navigate('AdminMenu');
    } else if (userRole === 'GSM') {
      navigation.navigate('GSMMenu');
    } else if (userRole === 'User') {
      navigation.navigate('UserMenu');
    } else {
      console.warn('User role not recognized, cannot navigate.');
    }
  };

  return (
    <InvoiceLayout>
      <View style={styles.container}>
        {/* Car Info */}
        <View style={styles.carInfo}>
          <Car />
          <CarLogo />
          <View style={styles.ltoContent}>
            <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
              LTO # 862
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 14, fontWeight: 'semibold' }}
            >
              Reg # BZB-762
            </Text>
          </View>
        </View>
        {/* Car User Info */}
        <View style={styles.carUserInfo}>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              Employee Name
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              Alveena Javed
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Driver Name</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              Zahid Hussain
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Local ID</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              920712
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              Vehicle Reg #
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              BZB-762
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Region</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              Karachi
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Initiator</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              Rabia Rashid
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Entry Date</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              25-Jun-2024
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Interim</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              No
            </Text>
          </View>
        </View>
        {/* Car User Date */}
        <View style={styles.carUserInfo}>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              Driving Observation Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              18-Feb-2023
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              First DDC Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              21-Oct-2021
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              License Expiry Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              18-Jun-2025
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              Refresher DDC Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              16-Aug-2024
            </Text>
          </View>
        </View>
        {/* Car User Status */}
        <View style={styles.carUserStatus}>
          <View style={styles.carUserStatusRow}>
            <Text style={{ width: '40%', fontWeight: 'bold', fontSize: 14 }}>
              Status
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Driver</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Employee</Text>
          </View>
          <View style={styles.carUserContentRow}>
            <Text style={{ width: '40%', fontWeight: 'medium', fontSize: 12 }}>
              Medical Status
            </Text>
            <View style={{ marginHorizontal: 'auto' }}>
              <MdiTick />
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
              <MdiTick />
            </View>
          </View>
          <View style={styles.carUserContentRow}>
            <Text style={{ width: '40%', fontWeight: 'medium', fontSize: 12 }}>
              DDC Status
            </Text>
            <View style={{ marginHorizontal: 'auto' }}>
              <MdiTick />
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
              <MdiTick />
            </View>
          </View>
          <View style={styles.carUserContentRow}>
            <Text style={{ width: '40%', fontWeight: 'medium', fontSize: 12 }}>
              DDC Practical
            </Text>
            <View style={{ marginHorizontal: 'auto' }}>
              <MdiTick />
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
              <MdiTick />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            columnGap: 14,
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 12,
          }}
        >
          <RoundedButton
            text="Reject"
            onPress={handlePress}
            icon={RejectIcon}
            loading={false}
            buttonColor="#D32F2F"
            textColor="#FFFFFF"
            size="medium"
            iconPosition="left"
          />
          <RoundedButton
            text="Approved"
            onPress={handlePress}
            icon={RightArrow}
            loading={false}
            buttonColor="#388E3C"
            textColor="#FFFFFF"
            size="medium"
            iconPosition="right"
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
});

export default ApprovedLTO;
