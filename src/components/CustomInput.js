import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Modal,
  Button,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import tw from 'tailwind-react-native-classnames';
import { ThemeContext } from '@context/ThemeContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { API_IMAGE_URL } from '@utils/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRegionsForSignUp,
  getAllBusinessGroup,
} from '@redux/actions/authActions';

const CustomInput = ({
  type,
  placeholder,
  value,
  onChangeText,
  onImageUpload,
  onDateChange,
  uploadEndpoint,
  ...props
}) => {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();

  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const { uploadStatus, uploadError, uploadedImage } = useSelector(
    (state) => state.auth,
  );

  const { getThemeColor } = useContext(ThemeContext);

  // Calculate the height of the modal based on the number of items
  const calculateModalHeight = () => {
    const itemHeight = 70; // Height of each item
    const maxItemsVisible = 8; // Maximum items visible without scrolling
    const numberOfItems = group.length;

    // Limit to maximum height
    return Math.min(numberOfItems, maxItemsVisible) * itemHeight;
  };

  const genderOptions = [
    { label: 'Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const licenseOptions = [
    { label: 'License Type', value: '' },
    { label: 'Full', value: 'full' },
    { label: 'Learner', value: 'learner' },
    { label: 'Not Available', value: 'not_available' },
  ];

  // iOS Dropdown Modal for Gender
  const renderModal = () => (
    <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-4 rounded-t-lg`}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                setShowModal(false);
                onChangeText(option.value);
              }}
              style={tw`p-2 border-b border-gray-300`}
            >
              <Text
                style={{
                  color: getThemeColor(option.value || 'placeholder'),
                  fontSize: 12,
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setShowModal(false)} style={tw`p-2`}>
            <Text style={tw`text-red-500`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // iOS Dropdown for Region
  const renderModalRegion = () => (
    <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-4 rounded-t-lg`}>
          {loadingRegions ? (
            <Text style={{ color: getThemeColor('placeholder'), fontSize: 12 }}>
              Loading regions...
            </Text>
          ) : errorRegions ? (
            <Text style={{ color: getThemeColor('red'), fontSize: 12 }}>
              Error: {errorRegions}
            </Text>
          ) : regions.length > 0 ? (
            regions.map((region) => (
              <TouchableOpacity
                key={region.id}
                onPress={() => {
                  setShowModal(false);
                  onChangeText(region.name);
                }}
                style={tw`p-2 border-b border-gray-300`}
              >
                <Text style={{ color: getThemeColor('text'), fontSize: 12 }}>
                  {region.name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: getThemeColor('placeholder'), fontSize: 12 }}>
              No regions available
            </Text>
          )}
          <TouchableOpacity onPress={() => setShowModal(false)} style={tw`p-2`}>
            <Text style={tw`text-red-500`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // iOS Dropdown Modal for Group
  const renderModalGroup = () => (
    <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
        <View
          style={[
            tw`bg-white rounded-t-lg py-5`,
            { maxHeight: calculateModalHeight() },
          ]}
        >
          <ScrollView>
            {loadingGroup ? (
              <Text
                style={{ color: getThemeColor('placeholder'), fontSize: 12 }}
              >
                Loading groups...
              </Text>
            ) : errorGroup ? (
              <Text style={{ color: getThemeColor('red'), fontSize: 12 }}>
                Error: {errorGroup}
              </Text>
            ) : Array.isArray(group) && group.length > 0 ? (
              group.map((item) => (
                <TouchableOpacity
                  key={item.Id}
                  onPress={() => {
                    setShowModal(false);
                    onChangeText(item.BusinessGroup);
                  }}
                  style={tw`p-2 border-b border-gray-300`}
                >
                  <Text style={{ color: getThemeColor('text'), fontSize: 12 }}>
                    {item.BusinessGroup}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{ color: getThemeColor('placeholder'), fontSize: 12 }}
              >
                No groups available
              </Text>
            )}
          </ScrollView>
          <TouchableOpacity onPress={() => setShowModal(false)} style={tw`p-2`}>
            <Text style={tw`text-red-500`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // iOS Dropdown Modal
  const renderModalLicenseType = () => (
    <Modal transparent={true} visible={showModal} animationType="slide">
      <View style={tw`flex-1 justify-end bg-black bg-opacity-50`}>
        <View
          style={[
            tw`bg-white rounded-t-lg py-5`,
            { maxHeight: calculateModalHeight() },
          ]}
        >
          <ScrollView>
            {licenseOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  setShowModal(false);
                  onChangeText(option.value);
                }}
                style={tw`p-2 border-b border-gray-300`}
              >
                <Text
                  style={{ color: getThemeColor(option.value), fontSize: 12 }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setShowModal(false)} style={tw`p-2`}>
            <Text style={tw`text-red-500`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const { group } = useSelector((state) => state.auth); // Ensure this pulls the correct data structure
  const { loading: loadingGroup, error: errorGroup } = useSelector(
    (state) => state.auth,
  );
  const {
    regions = [],
    loading: loadingRegions,
    error: errorRegions,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getRegionsForSignUp());
    dispatch(getAllBusinessGroup());
  }, [dispatch]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Format the date to ISO string for the API
      const formattedDate = selectedDate.toISOString();
      onDateChange(formattedDate);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'fullname': // New case for full name
        return (
          <Feather name="user" size={18} color={getThemeColor('placeholder')} />
        );
      case 'employeeid':
        return (
          <FontAwesome
            name="id-card-o"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'region':
        return (
          <Octicons
            name="git-branch"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'group':
        return (
          <FontAwesome6
            name="user-group"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'cnic':
        return (
          <AntDesign
            name="idcard"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'email':
        return (
          <Fontisto
            name="email"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'password':
        return (
          <MaterialIcons
            name="lock"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'number':
        return (
          <Ionicons
            name="md-numeric"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'gender': // New case for gender
        return (
          <FontAwesome
            name="intersex"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'calendar':
        return (
          <Feather
            name="calendar"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'licenseType':
        return (
          <FontAwesome
            name="drivers-license-o"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'drivingLicense':
        return (
          <FontAwesome
            name="drivers-license-o"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
      case 'upload':
        return (
          <Feather
            name="camera"
            size={22}
            color={getThemeColor('placeholder')}
          />
        );
      default:
        return (
          <Fontisto
            name="text"
            size={18}
            color={getThemeColor('placeholder')}
          />
        );
    }
  };

  const getSelectedItemColor = () => {
    return value
      ? getThemeColor('textInputColor')
      : getThemeColor('placeholder');
  };

  if (type === 'calendar') {
    return (
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: getThemeColor('textInput'),
            borderWidth: 0,
            height: Platform.OS === 'android' ? 42 : 42, // Set fixed height for Android
          },
        ]}
      >
        <TouchableOpacity
          style={[tw`flex-row justify-start items-center`, styles.input]}
          onPress={() => setShowDatePicker(true)}
        >
          {renderIcon(type)}
          <Text
            style={[
              tw`text-xs ml-2`,
              {
                color: value
                  ? getThemeColor('textInputColor')
                  : getThemeColor('placeholder'),
              },
            ]}
          >
            {value ? new Date(value).toLocaleDateString() : placeholder}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <>
            {/* Modal for iOS */}
            {Platform.OS === 'ios' && (
              <Modal
                transparent={true}
                animationType="slide"
                visible={showDatePicker}
                onRequestClose={() => setShowDatePicker(false)}
              >
                <View style={styles.modalContainer}>
                  <View
                    style={[
                      styles.pickerContainer,
                      colorScheme === 'dark' && { backgroundColor: '#333' },
                    ]}
                  >
                    {/* Picker for iOS */}
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      display="inline" // Display inline for iOS
                      onChange={handleDateChange}
                    />
                    <Button
                      title="Done"
                      onPress={() => setShowDatePicker(false)}
                    />
                  </View>
                </View>
              </Modal>
            )}

            {/* Android DateTimePicker */}
            {Platform.OS === 'android' && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        )}
      </View>
    );
  }

  if (type === 'gender') {
    return (
      <View
        style={[
          tw`flex-row items-center`,
          styles.inputContainer,
          {
            backgroundColor: getThemeColor('textInput'),
            borderWidth: 0,
            height: Platform.OS === 'android' ? 42 : 42, // Set fixed height for Android
          },
        ]}
      >
        {renderIcon(type)}
        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={value}
            style={[
              tw`flex-1 justify-between`,
              {
                color: getThemeColor(value || 'placeholder'),
                fontSize: 12, // Set font size to 12
              },
            ]}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            mode="dropdown"
            dropdownIconColor={getThemeColor('placeholder')}
            dropdownStyle={{
              backgroundColor: getThemeColor('pickerModalBackground'),
            }}
          >
            {genderOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                color={getThemeColor(option.value)}
                style={{ fontSize: 12 }}
              />
            ))}
          </Picker>
        ) : (
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={tw`flex-1 p-2`}
          >
            <Text
              style={{
                color: value
                  ? getThemeColor(value)
                  : getThemeColor('placeholder'), // Set the placeholder color
                fontSize: 12, // Set font size for iOS button text
              }}
            >
              {value
                ? genderOptions.find((option) => option.value === value)?.label
                : 'Gender'}
            </Text>
          </TouchableOpacity>
        )}
        {Platform.OS === 'ios' && renderModal()}
      </View>
    );
  }

  if (type === 'region') {
    return (
      <View
        style={[
          tw`flex-row items-center`,
          styles.inputContainer,
          {
            backgroundColor: getThemeColor('textInput'),
            borderWidth: 0,
            zIndex: 100,
            height: Platform.OS === 'android' ? 44 : 44, // Set fixed height for both platforms
          },
        ]}
      >
        {renderIcon(type)}

        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={value}
            style={[
              tw`flex-1 justify-between`,
              styles.select,
              {
                color: getSelectedItemColor(), // Set the color of the selected item
              },
            ]}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'} // Use dropdown mode on Android
            dropdownIconColor={getThemeColor('placeholder')} // Color of the dropdown icon
            dropdownStyle={{
              backgroundColor: getThemeColor('pickerModalBackground'),
            }} // Background color of the modal
          >
            <Picker.Item
              style={{
                fontSize: 12,
              }}
              label="Select Region"
              value=""
              color={getThemeColor('placeholder')}
            />
            {loadingRegions && (
              <Picker.Item
                style={{ fontSize: 12 }}
                label="Loading regions..."
                value=""
              />
            )}
            {errorRegions && (
              <Picker.Item
                style={{ fontSize: 12 }}
                label={`Error: ${errorRegions}`}
                value=""
              />
            )}
            {regions.length > 0 ? (
              regions.map((region) => (
                <Picker.Item
                  style={{ fontSize: 12, color: '#000000' }} // Keeping original styling
                  key={region.id}
                  label={region.name}
                  value={region.name}
                />
              ))
            ) : (
              <Picker.Item label="No regions available" value="" />
            )}
          </Picker>
        ) : (
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={tw`flex-1 p-2`}
          >
            <Text
              style={{
                color: value
                  ? getThemeColor('text')
                  : getThemeColor('placeholder'),
                fontSize: 12,
              }}
            >
              {value || 'Select Region'}
            </Text>
          </TouchableOpacity>
        )}

        {Platform.OS === 'ios' && renderModalRegion()}
      </View>
    );
  }

  if (type === 'group') {
    return (
      <View
        style={[
          tw`flex-row items-center`,
          styles.inputContainer,
          {
            backgroundColor: getThemeColor('textInput'),
            borderWidth: 0,
            zIndex: 100,
            height: Platform.OS === 'android' ? 44 : 44,
          },
        ]}
      >
        {renderIcon(type)}

        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={value}
            style={[
              tw`flex-1 justify-between`,
              styles.select,
              {
                color: getSelectedItemColor(), // Set the color of the selected item
              },
            ]}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
            dropdownIconColor={getThemeColor('placeholder')}
            dropdownStyle={{
              backgroundColor: getThemeColor('pickerModalBackground'),
            }}
          >
            <Picker.Item
              style={{ fontSize: 12 }}
              label="Select Business Group"
              value=""
              color={getThemeColor('placeholder')}
            />
            {loadingGroup && (
              <Picker.Item
                style={{ fontSize: 12 }}
                label="Loading groups..."
                value=""
              />
            )}
            {errorGroup && (
              <Picker.Item
                style={{ fontSize: 12 }}
                label={`Error: ${errorGroup}`}
                value=""
              />
            )}
            {Array.isArray(group) && group.length > 0 ? (
              group.map((item) => (
                <Picker.Item
                  style={{ fontSize: 12, color: '#000000' }} // Keeping original styling
                  key={item.Id}
                  label={item.BusinessGroup}
                  value={item.BusinessGroup}
                />
              ))
            ) : (
              <Picker.Item
                style={{ fontSize: 12 }}
                label="No groups available"
                value=""
              />
            )}
          </Picker>
        ) : (
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={tw`flex-1 p-2`}
          >
            <Text
              style={{
                color: value
                  ? getThemeColor('text')
                  : getThemeColor('placeholder'),
                fontSize: 12,
              }}
            >
              {value || 'Select Business Group'}
            </Text>
          </TouchableOpacity>
        )}

        {Platform.OS === 'ios' && renderModalGroup()}
      </View>
    );
  }

  if (type === 'licenseType') {
    return (
      <View
        style={[
          tw`flex-row items-center`,
          styles.inputContainer,
          {
            backgroundColor: getThemeColor('textInput'),
            borderWidth: 0,
            zIndex: 100,
            height: Platform.OS === 'android' ? 44 : 44,
          },
        ]}
      >
        {renderIcon(type)}

        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={value}
            style={[
              tw`flex-1 justify-between`,
              styles.select,
              {
                color: getSelectedItemColor(),
              },
            ]}
            onValueChange={(itemValue) => onChangeText(itemValue)}
            mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
            dropdownIconColor={getThemeColor('placeholder')}
            dropdownStyle={{
              backgroundColor: getThemeColor('pickerModalBackground'),
            }}
          >
            {licenseOptions.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
                style={{ fontSize: 12, color: getThemeColor(option.value) }} // Maintain color based on value
              />
            ))}
          </Picker>
        ) : (
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={tw`flex-1 p-2`}
          >
            <Text
              style={{
                color: value
                  ? getThemeColor(value)
                  : getThemeColor('placeholder'),
                fontSize: 12,
              }}
            >
              {value || 'Select License Type'}
            </Text>
          </TouchableOpacity>
        )}

        {Platform.OS === 'ios' && renderModalLicenseType()}
      </View>
    );
  }

  if (type === 'upload') {
    // New section for displaying uploaded image
    return (
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: 'lightgray', // Replace with your theme color
            borderWidth: 0,
            height: Platform.OS === 'android' ? 42 : 42,
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
      >
        <TouchableOpacity
          onPress={onImageUpload}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          {renderIcon(type)}
          <Text style={{ color: 'black' }}>{placeholder}</Text>
        </TouchableOpacity>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 42 }}
          />
        )}
      </View>
    );
  }

  let keyboardType = 'default';
  if (type === 'email') {
    keyboardType = 'email-address';
  } else if (type === 'number') {
    keyboardType = 'numeric';
  }

  return (
    <View
      style={[
        tw`flex-row items-center`,
        styles.inputContainer,
        {
          backgroundColor: getThemeColor('textInput'),
          borderWidth: 1,
          borderColor: isFocused ? getThemeColor('primary') : 'transparent',
        },
      ]}
    >
      {renderIcon(type)}
      <TextInput
        style={[
          tw`flex-1 ml-2`,
          styles.input,
          {
            color: getThemeColor('textInputColor'),
            borderWidth: 0,
            borderColor: 'transparent',
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={getThemeColor('placeholder')}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' && !isPasswordVisible}
        keyboardType={keyboardType}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        underlineColorAndroid="transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {type === 'password' && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={18}
            color={getThemeColor('placeholder')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 8,
    minHeight: 42, // Set min height for the container
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 12,
    height: 42,
    borderWidth: 0, // Ensure no border is visible
  },
  select: {
    fontSize: 12,
    backgroundColor: 'transparent',
    borderWidth: 0, // Ensure no border is visible
  },
  inputUploaderContainer: {
    width: '100%',
    borderRadius: 8,
  },
  imageUploader: {
    width: '100%',
    rowGap: 5,
  },
  uploadInput: {
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  datePickerContainer: {},
});

export default CustomInput;
