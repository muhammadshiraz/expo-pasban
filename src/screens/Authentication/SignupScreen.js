import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '@components/ButtonComponent';
import { launchImageLibrary } from 'react-native-image-picker';
import tw from 'tailwind-react-native-classnames';
import Layout from '@components/Layout'; // Adjust the path according to your project structure
import HeadingComponent from '@components/HeadingComponent';
import TextComponent from '@components/TextComponent';
import SwitchTheme from '@screens/GetStartedScreen/switch-theme-code';
import ActionText from '@components/ActionText';
import CustomInput from '@components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '@context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { API_IMAGE_URL } from '@utils/api';
import { userSignUp, uploadImageAction } from '@redux/actions/authActions';
import AuthText from '@components/AuthText'; // Adjust the import path as needed
import StepIndicator from 'react-native-step-indicator'; // Import StepIndicator
import ModalComponent from '@components/ModalComponent'; // Adjust the path as needed
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window'); // Get the screen width
const adjustedWidth = width + 2; // Add 5px to the screen width

const SignupScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState(null);
  const { uploadStatus, uploadError, uploadedImage } = useSelector(
    (state) => state.auth,
  );

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'You need to allow media access to upload images',
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const localUri = result.assets[0].uri;
        setImageUri(localUri);
        const formData = new FormData();
        const fileType = localUri.split('.').pop();
        formData.append('ImageURL', {
          uri: localUri,
          type: `image/${fileType}`,
          name: `license_image.${fileType}`,
        });
        formData.append('ImageName', '');
        dispatch(uploadImageAction(formData)); // Dispatch the upload action
      }
    } catch (error) {
      console.error('Error selecting or uploading image:', error);
      Alert.alert('Error', 'Image upload failed');
    }
  };

  useEffect(() => {
    if (uploadStatus === 'success' && uploadedImage) {
      if (uploadedImage) {
        // Ensure imageURL is defined
        const imageURL = `${API_IMAGE_URL}${uploadedImage}`;
        setImageUri(imageURL);
        setDrivingLicenseImageURL(uploadedImage);
      } else {
        console.warn('Image URL is undefined');
      }
    } else if (uploadStatus === 'error') {
      Alert.alert('Upload failed', uploadError);
    }
  }, [uploadStatus, uploadedImage, uploadError]);

  // State variables for the form
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
  const [isDriver, setIsDriver] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [sex, setSex] = useState('');

  const [currentStep, setCurrentStep] = useState(0); // State to track current step

  const handleSignIn = () => {
    // Implement your sign up logic here
    navigation.navigate('Login');
  };

  const handleNextStep = async () => {
    // Step 1 Validation
    if (currentStep === 0) {
      if (!fullName || !email || !sex || !dateOfBirth) {
        Alert.alert('Error', 'All fields are required in Information');
        return;
      }
    }
    // Step 2 Validation
    if (currentStep === 1) {
      if (!employeeId || !region || !businessGroup || !cnic) {
        Alert.alert('Error', 'All fields are required in Employment');
        return;
      }
    }
    // Step 3 Validation
    if (currentStep === 2) {
      if (
        !licenseType ||
        !drivingLicense ||
        !drivingLicenseExpiry ||
        !imageUri
      ) {
        Alert.alert('Error', 'All fields are required in License');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignUp = async () => {
    // Step 4 (Password validation)
    if (currentStep === 3) {
      if (!password || !confirmPassword) {
        Alert.alert('Error', 'Password and Confirm Password are required');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }

      // Check for at least one special character
      const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/; // Adjust this regex as needed for your specific requirements
      if (!specialCharacterPattern.test(password)) {
        Alert.alert(
          'Error',
          'Password must contain at least one special character',
        );
        return;
      }
    }

    // Ensure drivingLicenseExpiry is in the correct format
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
      setIsModalVisible(true); // Show modal on successful sign up
      setTimeout(() => {
        setImageUri(null);
        setDrivingLicenseImageURL(null);
      }, 100);
    } catch (error) {
      console.error(
        'Error signing up:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert(
        'Error signing up',
        error.response ? error.response.data.message : 'Sign-up failed',
      );
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.inputContainer}>
            <CustomInput
              type="fullname"
              placeholder="Full name"
              value={fullName}
              onChangeText={setFullName}
            />
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              type="gender" // Using the new gender type
              placeholder="Select gender"
              value={sex}
              onChangeText={setSex}
            />
            <CustomInput
              type="calendar"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onDateChange={setDateOfBirth}
            />
          </View>
        );
      case 1:
        return (
          <View style={styles.inputContainer}>
            <CustomInput
              type="employeeid"
              placeholder="Employee ID"
              value={employeeId}
              onChangeText={setEmployeeId}
            />
            <CustomInput
              type="region"
              placeholder="Select Region"
              value={region}
              onChangeText={setRegion}
            />
            <CustomInput
              type="group"
              placeholder="Select Business Group"
              value={businessGroup}
              onChangeText={setBusinessGroup}
            />
            <CustomInput
              type="cnic"
              placeholder="CNIC"
              value={cnic}
              onChangeText={setCnic}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.inputContainer}>
            <CustomInput
              type="licenseType"
              placeholder="License Type"
              value={licenseType}
              onChangeText={setLicenseType}
            />
            <CustomInput
              type="drivingLicense"
              placeholder="Driving License"
              value={drivingLicense}
              onChangeText={setDrivingLicense}
            />
            <CustomInput
              type="calendar"
              placeholder="License Expiry"
              value={drivingLicenseExpiry}
              onDateChange={setDrivingLicenseExpiry}
            />
            <View
              style={[
                styles.inputUploaderContainer,
                {
                  borderWidth: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: getThemeColor('textInput'),
                },
              ]}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.uploadedImage}
                />
              ) : (
                <TouchableOpacity style={styles.pickImage} onPress={pickImage}>
                  <Feather
                    name="camera"
                    size={22}
                    color={getThemeColor('placeholder')}
                  />
                  <Text
                    style={[
                      tw`text-xs text-center mt-2`,
                      {
                        color: getThemeColor('placeholder'),
                      },
                    ]}
                  >
                    Upload License Picture
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.inputContainer}>
            <CustomInput
              type="password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <CustomInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Layout type="auth" title="Sign Up">
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <HeadingComponent size="h1" color={getThemeColor('h1')}>
            Sign Up
          </HeadingComponent>
          <View>
            <TextComponent>
              Great to meet you! Please enter your details.
            </TextComponent>
          </View>
        </View>
        <SafeAreaView style={[tw`flex-1 justify-start`, styles.formContainer]}>
          <ScrollView>
            <View style={styles.inputContainer}>
              <View style={styles.stepIndicatorContainer}>
                <StepIndicator
                  currentPosition={currentStep}
                  labels={['Info', 'Employment', 'License', 'Password']}
                  stepCount={4}
                  customStyles={{
                    stepIndicatorSize: 25,
                    currentStepIndicatorSize: 30,
                    separatorStrokeWidth: 1,
                    stepStrokeCurrentColor: '#006EDA', // Color of the current step
                    stepStrokeWidth: 1,
                    stepStrokeFinishedColor: '#006EDA', // Color of the finished steps
                    stepStrokeUnFinishedColor: '#787878', // Color of the unfinished steps
                    separatorFinishedColor: '#006EDA', // Color of the separator for finished steps
                    separatorUnFinishedColor: '#787878', // Color of the separator for unfinished steps
                    stepIndicatorFinishedColor: '#006EDA', // Color of the indicator for finished steps
                    stepIndicatorUnFinishedColor: '#ffffff', // Color of the indicator for unfinished steps
                    stepIndicatorCurrentColor: '#006EDA', // Color of the current indicator
                    stepIndicatorLabelFontSize: 12,
                    currentStepIndicatorLabelFontSize: 12,
                    stepIndicatorLabelCurrentColor: '#ffffff', // Color of the label for the current step
                    stepIndicatorLabelFinishedColor: '#ffffff', // Color of the label for finished steps
                    stepIndicatorLabelUnFinishedColor: '#787878', // Color of the label for unfinished steps
                    labelColor: getThemeColor('text'), // Color of the labels
                    labelSize: 10,
                    currentStepLabelColor: getThemeColor('primary'), // Color of the label for the current step
                  }}
                />
              </View>
              <View style={styles.stepContentContainer}>
                {renderStepContent()}
              </View>
              <View style={styles.buttonRow}>
                {currentStep > 0 && currentStep <= 2 && (
                  <ButtonComponent
                    title="Previous"
                    onPress={handlePreviousStep}
                    type="secondary"
                    style={styles.button}
                  />
                )}
                {currentStep < 3 && (
                  <ButtonComponent
                    title="Next"
                    onPress={handleNextStep}
                    type="primary"
                    style={styles.button}
                  />
                )}
                {currentStep === 3 && (
                  <ButtonComponent
                    title="Sign Up"
                    onPress={handleSignUp}
                    type="primary"
                    style={styles.button}
                  />
                )}
              </View>
              <AuthText textType="signIn" onPress={handleSignIn} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onButtonPress={handleSignIn} // Pass custom function here
      >
        <View style={{ alignItems: 'center', marginBottom: 50, rowGap: 16 }}>
          <Ionicons name="shield-checkmark-sharp" size={75} color="#1FC072" />
          <View style={{ alignItems: 'center', rowGap: 5, width: 220 }}>
            <HeadingComponent size="h3" color={getThemeColor('h3')}>
              Account Created
            </HeadingComponent>
            <TextComponent style={{ textAlign: 'center' }}>
              Great! Your account has been created. Please sign in to continue.
            </TextComponent>
          </View>
        </View>
      </ModalComponent>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 'max-content',
  },
  headerContent: {
    rowGap: 8,
    marginBottom: 18,
  },
  formContainer: {
    rowGap: 16,
  },
  inputContainer: {
    rowGap: 16,
  },
  stepIndicatorContainer: {
    width: adjustedWidth,
    alignSelf: 'center', // Center the StepIndicator horizontally
  },
  stepContentContainer: {
    //marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 16,
  },
  button: {
    flex: 1,
  },
  inputUploaderContainer: {
    textAlign: 'center',
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  imageUploader: {
    width: '100%',
    rowGap: 5,
  },
  pickImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadInput: {
    borderRadius: 8,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SignupScreen;
