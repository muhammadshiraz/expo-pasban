import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
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
import BgGroup from '@assets/icons/bg-group.svg';
import EmpGroup from '@assets/icons/employee-group.svg';
import Password from '@assets/icons/password.svg';
import Toast from 'react-native-toast-message';
import hugeicons from '@assets/icons/hugeicons_id.svg';
import { licenseOptions } from '@utils/dropdownOptions';
import LoadingIndicator from '@components/LoadingIndicator';
import ConfirmationModal from '@components/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  putUpdateProfile,
  getAllRegions,
  getAllBusinessGroup,
} from '@redux/actions/userActions';

const EditProfile = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { itemData, userId, roleId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isIncludeVehicle, setIsIncludeVehicle] = useState(false);
  const { userProfile, updateProfile, loading, error } = useSelector(
    (state) => state.user,
  );
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const { regions, group } = useSelector((state) => state.user);

  // Ensure regions is an array before mapping
  const regionOptions = Array.isArray(regions)
    ? [
        ...regions.map((region) => ({
          label: region.Name,
          value: region.Id,
        })),
      ]
    : [];

  // Ensure group is an array before mapping
  const groupOptions = Array.isArray(group)
    ? [
        ...group
          .filter((g) =>
            ['General Trade', 'Ice Cream', 'Foods', 'Admin'].includes(
              g.BusinessGroup,
            ),
          )
          .map((group) => ({
            label: group.BusinessGroup,
            value: group.Id,
          })),
      ]
    : [];

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
    dispatch(getAllRegions());
    dispatch(getAllBusinessGroup());
  }, [dispatch, userId]);

  const [formData, setFormData] = useState({
    fullName: '',
    roleName: '',
    email: '',
    gender: '',
    dob: null,
    empID: '',
    region: '',
    regionId: '',
    busGroup: '',
    busGroupId: '',
    drvLicense: '',
    licenseExpiry: null,
    cnic: '',
    userStatusTypeId: null,
    password: '',
  });

  // Update formData once userProfile data is loaded
  useEffect(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.username || '',
        roleName: userProfile.roleName || '',
        email: userProfile.email || '',
        gender: userProfile.gender || '',
        dob: userProfile.dateofBirth ? new Date(userProfile.dateofBirth) : null,
        empID: userProfile.employeeId || '',
        region: userProfile.region || '',
        regionId: userProfile.regionId || '',
        busGroup: userProfile.businessGroup || '',
        busGroupId: userProfile.businessGroupId || '',
        cnic: userProfile.cnic || '',
        drvLicense: userProfile.drivingLicense || '',
        licenseExpiry: userProfile.drivingLicenseExpiry
          ? new Date(userProfile.drivingLicenseExpiry)
          : null,
        password: userProfile.password || '',
        userStatusTypeId: formData.regionId == '11' ? 2 : 1,
      });
    }
  }, [userProfile]);

  const handleInputChange = (name, value, id) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`${name}Id`]: id,
    }));
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      formData.password.length < 6
    ) {
      Alert.alert(
        'Please complete all fields and ensure password is at least 8 characters.',
      );
      return false;
    }
    if (!formData.dob || !formData.licenseExpiry) {
      Alert.alert(
        'Please select valid dates for Date of Birth and License Expiry.',
      );
      return false;
    }
    return true;
  };

  const handleProfileUpdate = async () => {
    // Call this function to show the modal
    setModalVisible(true);
  };

  const confirmUpdate = async () => {
    if (!validateForm()) return; // Stop if validation fails

    const userProfileData = {
      userId: userId,
      employeeId: formData.empID,
      roleId: roleId,
      username: formData.fullName,
      email: formData.email,
      gender:
        formData.gender === 'Male'
          ? 'M'
          : formData.gender === 'Female'
          ? 'F'
          : 'N/A',
      dateofBirth: formData.dob.toISOString(),
      password: formData.password,
      drivingLicense: formData.drvLicense,
      drivingLicenseExpiry: formData.licenseExpiry.toISOString(),
      regionId: parseInt(formData.regionId),
      businessGroupInCommas: String(formData.busGroupId),
      cnic: formData.cnic,
      roleName: formData.roleName,
      isIncludeVehicle: isIncludeVehicle,
      userStatusTypeId: formData.regionId == '11' ? 2 : 1,
    };

    try {
      const response = await putUpdateProfile(userProfileData);
      dispatch(response);
      // Show success toast notification
      Toast.show({
        type: 'success',
        text1: 'Profile Updated!',
        text2: 'Your profile has been updated successfully.',
        position: 'center', // Center the toast
        visibilityTime: 300, // Optional, how long the toast is visible
        topOffset: 0, // Adjust top offset if necessary
        autoHide: true,
      });
    } catch (error) {
      console.error('Profile update failed:', error);
      // Show error toast notification
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'An error occurred while updating your profile.',
      });
    }
  };

  if (loading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <Layout
      type="innerScreen"
      title="Edit Profile"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <View style={styles.formContainer}>
            <InputField
              icon={User}
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(value) => handleInputChange('fullName', value)}
              type="text"
            />
            <InputField
              icon={Email}
              placeholder="Email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              type="text"
            />
            <InputField
              icon={Gender}
              type="dropdown"
              placeholder="Gender"
              value={formData.gender}
              onChange={(value) => handleInputChange('gender', value)}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
            />
            <InputField
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={(value) => handleInputChange('dob', value)}
              type="date"
              icon={UitCalender}
            />
            <InputField
              icon={EmpId}
              placeholder="Employee ID"
              value={formData.empID}
              onChange={(value) => handleInputChange('empID', value)}
              type="text"
              editable={roleId !== '3'}
            />
            <InputField
              icon={Region}
              type="dropdown"
              placeholder="Select Region"
              value={formData.region}
              onChange={(value) => {
                const selectedRegion = regionOptions.find(
                  (option) => option.value === value,
                );
                handleInputChange(
                  'region',
                  selectedRegion.label,
                  selectedRegion.value,
                );
              }}
              options={regionOptions}
            />
            <InputField
              icon={BgGroup}
              type="dropdown"
              placeholder="Select Business Group"
              value={formData.busGroup}
              onChange={(value) => {
                const selectedGroup = groupOptions.find(
                  (option) => option.value === value,
                );
                handleInputChange(
                  'busGroup',
                  selectedGroup.label,
                  selectedGroup.value,
                );
              }}
              options={groupOptions}
            />
            {/* <InputField
              icon={EmpGroup}
              type="dropdown"
              placeholder="License Type"
              value={formData.licenseType}
              onChange={(value) => handleInputChange('licenseType', value)}
              options={licenseOptions}
            /> */}
            <InputField
              icon={hugeicons}
              type="text"
              placeholder="CNIC"
              value={formData.cnic}
              onChange={(value) => handleInputChange('cnic', value)}
            />
            <InputField
              icon={EmpGroup}
              type="text"
              placeholder="Driving License"
              value={formData.drvLicense}
              onChange={(value) => handleInputChange('drvLicense', value)}
            />
            <InputField
              placeholder="License Expiry"
              value={formData.licenseExpiry}
              onChange={(value) => handleInputChange('licenseExpiry', value)}
              type="date"
              icon={UitCalender}
            />
            <InputField
              placeholder="Password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              type="password"
            />
            <RoundedButton
              text={'Update Profile'}
              onPress={handleProfileUpdate}
              loading={false}
              buttonColor="#006EDA"
              textColor="#FFFFFF"
              size="medium"
              iconPosition="right"
            />
          </View>
        </LayoutCard>
      </ScrollView>
      <ConfirmationModal
        visible={modalVisible}
        onConfirm={() => {
          setIsIncludeVehicle(true); // Set to true when "Yes" is clicked
          confirmUpdate(); // Call the update function
          setModalVisible(false); // Close modal
        }}
        onCancel={() => {
          setIsIncludeVehicle(false); // Set to false when "No" is clicked
          setModalVisible(false); // Close modal
        }}
        //onCancel={() => setModalVisible(false)}
        message="Do you also want to update the vehicle details?"
      />
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

export default EditProfile;
