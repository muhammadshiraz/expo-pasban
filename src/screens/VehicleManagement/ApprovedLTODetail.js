import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import InvoiceLayout from '@components/InvoiceLayout';
import { ThemeContext } from '@context/ThemeContext';
import RoundedButton from '@components/RoundedButton';
import Car from '@assets/icons/alsvin.svg';
import CarLogo from '@assets/icons/alsvin_logo.svg';
import MdiTick from '@assets/icons/mdi_tick.svg';
import CrossMark from '@assets/icons/cross-mark.svg';
import RejectIcon from '@assets/icons/reject.svg';
import RightArrow from '@assets/icons/right-arrow.svg';
import { getAuthData } from '@utils/authStorage';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getLTO } from '@redux/actions/ltoActions';

const ApprovedLTODetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { itemData } = route.params;
  const [detailData, setDetailData] = useState(null);
  const allLtoDetails = useSelector((state) => state.lto.LTO);
  const { getThemeColor } = useContext(ThemeContext);
  const [userRole, setUserRole] = useState('');
  //const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const { roleId } = user || {};
  const navigation = useNavigation();

  useEffect(() => {
    if (!allLtoDetails.length) {
      dispatch(getLTO());
    } else {
      const itemDetail = allLtoDetails.find((item) => item.idx === itemData.id);
      setDetailData(itemDetail);
    }
  }, [allLtoDetails, itemData.ltoId, dispatch]);

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
        //setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (!detailData) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  const handlePress = async () => {
    //Handle navigation based on roleId
    if (roleId === '1') {
      navigation.navigate('AdminMenu');
    } else if (roleId === '3') {
      navigation.navigate('UserMenu');
    } else if (roleId === '16') {
      navigation.navigate('GSMMenu');
    } else {
      console.log('No valid role found');
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
              LTO # {detailData.idx}
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 14, fontWeight: 'semibold' }}
            >
              Reg # {detailData.regNo}
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
              {detailData.employeeName}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Driver Name</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.driverName}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Local ID</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.localid}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              Vehicle Reg #
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.regNo}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Region</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.locationname}
            </Text>
          </View>
          {/* <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Initiator</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              Rabia Rashid
            </Text>
          </View> */}
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Entry Date</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.entrydate1}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>Interim</Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.isinterim}
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
              {detailData.drvObsdate}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              First DDC Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.firstddcdate}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              License Expiry Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.licExpiryDate}
            </Text>
          </View>
          <View style={styles.carUserInfoRow}>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              Refresher DDC Date
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}
            >
              {detailData.refreshddcdate}
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
              {detailData.driver_medical === true ? <MdiTick /> : <CrossMark />}
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
              {detailData.employee_medical === true ? (
                <MdiTick />
              ) : (
                <CrossMark />
              )}
            </View>
          </View>
          <View style={styles.carUserContentRow}>
            <Text style={{ width: '40%', fontWeight: 'medium', fontSize: 12 }}>
              DDC Status
            </Text>
            <View style={{ marginHorizontal: 'auto' }}>
              {detailData.ddcyesno_driver === true ? (
                <MdiTick />
              ) : (
                <CrossMark />
              )}
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
              {detailData.ddcyesno_employee === true ? (
                <MdiTick />
              ) : (
                <CrossMark />
              )}
            </View>
          </View>
          <View style={styles.carUserContentRow}>
            <Text style={{ width: '40%', fontWeight: 'medium', fontSize: 12 }}>
              DDC Practical
            </Text>
            <View style={{ marginHorizontal: 'auto' }}>
              {detailData.osalp_training_status_driver === 1 ? (
                <MdiTick />
              ) : (
                <CrossMark />
              )}
            </View>
            <View style={{ marginHorizontal: 'auto' }}>
              {detailData.osalp_training_status_employee === 1 ? (
                <MdiTick />
              ) : (
                <CrossMark />
              )}
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
            text="Close"
            onPress={handlePress}
            icon={RightArrow}
            loading={false}
            buttonColor="#000000"
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
    marginBottom: 8,
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

export default ApprovedLTODetail;
