import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import InputField from '@components/InputField';
import RoundedButton from '@components/RoundedButton';
import UitCalender from '@assets/icons/uit_calender.svg';
import User from '@assets/icons/user.svg';
import Email from '@assets/icons/email.svg';
import Gender from '@assets/icons/gender.svg';
import EmpId from '@assets/icons/empId.svg';
import Region from '@assets/icons/region.svg';
import hugeicons from '@assets/icons/hugeicons_id.svg';
import { licenseOptions } from '@utils/dropdownOptions';
import BgGroup from '@assets/icons/bg-group.svg';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import EmpGroup from '@assets/icons/employee-group.svg';
import Password from '@assets/icons/password.svg';
import { getAllRegions, getAllBusinessGroup } from '@redux/actions/userActions';
import { userSignUp } from '@redux/actions/authActions';
import Toast from 'react-native-toast-message';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { regions, group } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllRegions());
    dispatch(getAllBusinessGroup());
  }, [dispatch]);

  // Ensure regions is an array before mapping
  const regionOptions = Array.isArray(regions)
    ? [
        ...regions.map((region) => ({
          label: region.Name,
          value: region.Name,
        })),
      ]
    : [];

  // Ensure group is an array before mapping
  const groupOptions = Array.isArray(group)
    ? [
        ...group.map((group) => ({
          label: group.BusinessGroup,
          value: group.BusinessGroup,
        })),
      ]
    : [];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [region, setRegion] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [drivingLicenseImageURL, setDrivingLicenseImageURL] = useState(null);
  const [drivingLicenseExpiry, setDrivingLicenseExpiry] = useState(null);
  const [cnic, setCnic] = useState('');
  const [licenseType, setLicenseType] = useState('');
  const [businessGroup, setBusinessGroup] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [sex, setSex] = useState('');

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    if (
      !fullName ||
      !email ||
      !sex ||
      !dateOfBirth ||
      !employeeId ||
      !region ||
      !businessGroup ||
      !cnic ||
      !licenseType ||
      !drivingLicense ||
      !drivingLicenseExpiry
    ) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required in Information',
      });
      return;
    }

    if (!password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password and Confirm Password are required',
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }
    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 6 characters long',
      });
      return;
    }

    // Check for at least one special character
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/; // Adjust this regex as needed for your specific requirements
    if (!specialCharacterPattern.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Password must contain at least one special character',
      });
      return;
    }

    const formattedDrivingLicenseExpiry =
      licenseType !== 'NA'
        ? new Date(drivingLicenseExpiry).toISOString()
        : '1900-01-01T00:00:00.000Z';

    // Ensure businessGroupId is a string
    const formattedBusinessGroupId = businessGroup ? String(businessGroup) : '';
    const formattedregionId = region ? String(region) : '';

    const payload = {
      fullname: fullName,
      email: email,
      password: password,
      employeeId: employeeId,
      regionId: formattedregionId,
      drivingLicense: licenseType !== 'NA' ? drivingLicense : '0',
      drivingLicenseExpiry: formattedDrivingLicenseExpiry,
      cnic: cnic,
      licenseType: licenseType,
      businessGroupId: formattedBusinessGroupId,
      isDriver: true,
      dateOfbirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
      sex: sex,
      DrivingLicenseImageURL: drivingLicenseImageURL,
    };

    try {
      // Dispatch the sign-up action
      await dispatch(userSignUp(payload));
      // Show success toast message
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User signed up successfully!',
      });
      // Clear all state variables after successful submission
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmployeeId('');
      setRegion('');
      setDrivingLicense('');
      setDrivingLicenseExpiry('');
      setCnic('');
      setLicenseType('');
      setBusinessGroup('');
      setDateOfBirth('');
      setSex('');
      setDrivingLicenseImageURL('');
    } catch (error) {
      console.error(
        'Error add user:',
        error.response ? error.response.data : error.message,
      );
      Toast.show({
        type: 'error',
        text1: 'Error add user',
        text2: error.response ? error.response.data.message : 'add user failed',
      });
    }
  };

  return (
    <Layout
      type="innerScreen"
      title="Create Profile"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <View style={styles.formContainer}>
            <InputField
              icon={User}
              placeholder="Full Name"
              value={fullName}
              onChange={setFullName}
              type="text"
            />
            <InputField
              icon={Email}
              placeholder="Email"
              value={email}
              onChange={setEmail}
              type="text"
            />
            <InputField
              icon={Gender}
              type="dropdown"
              placeholder="Gender"
              value={sex}
              onChange={setSex}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
            />
            <InputField
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={setDateOfBirth}
              type="date"
              icon={UitCalender}
            />
            <InputField
              icon={EmpId}
              placeholder="Employee ID"
              value={employeeId}
              onChange={setEmployeeId}
              type="text"
            />
            <InputField
              icon={Region}
              type="dropdown"
              placeholder="Select Region"
              value={region}
              onChange={setRegion}
              options={regionOptions}
            />
            <InputField
              icon={BgGroup}
              type="dropdown"
              placeholder="Business Group"
              modalHeight={350}
              value={businessGroup}
              onChange={setBusinessGroup}
              options={groupOptions}
            />
            <InputField
              icon={hugeicons}
              type="text"
              placeholder="CNIC"
              value={cnic}
              onChange={setCnic}
            />
            <InputField
              icon={EmpGroup}
              type="dropdown"
              placeholder="License Type"
              value={licenseType}
              onChange={setLicenseType}
              options={licenseOptions}
            />
            <InputField
              icon={EmpGroup}
              type="text"
              placeholder="Driving License"
              value={drivingLicense}
              onChange={setDrivingLicense}
            />

            <InputField
              placeholder="License Expiry"
              value={drivingLicenseExpiry}
              onChange={setDrivingLicenseExpiry}
              type="date"
              icon={UitCalender}
            />
            <InputField
              placeholder="Password"
              value={password}
              onChange={setPassword}
              type="password"
              icon={Password}
            />
            <InputField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              type="password"
              icon={Password}
            />
            <RoundedButton
              text={'Add User'}
              onPress={handleAddUser}
              loading={false}
              buttonColor="#006EDA"
              textColor="#FFFFFF"
              size="medium"
              iconPosition="right"
            />
          </View>
        </LayoutCard>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 30,
    rowGap: 30,
  },
  formContainer: {
    marginTop: 8,
    rowGap: 8,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 16,
    paddingBottom: 2,
  },
  headerContainer: {
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProfile;
