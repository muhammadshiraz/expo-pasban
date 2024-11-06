import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
  Button,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DownArrow from '@assets/icons/down_arrow.svg';
import { ThemeContext } from '@context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Utility function to get the last date of the previous month
const getLastDateOfPreviousMonth = () => {
  const date = new Date();
  date.setDate(1); // Set to first day of the current month
  date.setHours(-1); // Set to the last hour of the previous day (last day of previous month)
  return date;
};

const getLastDateOfCurrentMonth = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  return new Date(currentYear, currentMonth + 1, 0); // Setting day to 0 gets the last day of the previous month
};

// Function to calculate date range
const calculateDateRange = () => {
  const today = new Date();
  // Set a minimum date that is significantly in the past, e.g., Jan 1, 2000
  const minimumSelectableDate = new Date(2000, 0, 1); // January 1, 2000
  // Set maximum date to today
  const maximumSelectableDate = today;
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const lastDateOfPreviousMonth = getLastDateOfPreviousMonth();
  const lastMonth = lastDateOfPreviousMonth.getMonth();
  const lastMonthYear = lastDateOfPreviousMonth.getFullYear();

  let startOfRange;
  let endOfRange;

  if (currentDate >= 1 && currentDate <= 8) {
    startOfRange = new Date(lastMonthYear, lastMonth, 17);
    endOfRange = new Date(lastMonthYear, lastMonth, 24);
  } else if (currentDate >= 9 && currentDate <= 16) {
    startOfRange = new Date(lastMonthYear, lastMonth, 17);
    endOfRange = new Date(lastMonthYear, lastMonth, 31);
  } else if (currentDate >= 17 && currentDate <= 24) {
    startOfRange = new Date(currentYear, currentMonth, 1);
    endOfRange = new Date(currentYear, currentMonth, 8);
  } else if (
    currentDate >= 25 &&
    currentDate <= getLastDateOfCurrentMonth().getDate()
  ) {
    startOfRange = new Date(currentYear, currentMonth, 1);
    endOfRange = new Date(currentYear, currentMonth, 16);
  } else {
    startOfRange = new Date(currentYear, currentMonth, 1);
    endOfRange = new Date(currentYear, currentMonth, 8);
  }

  return { minimumSelectableDate, maximumSelectableDate };
};

const CustomDropdown = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
  icon: Icon,
  required,
  modalHeight,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownContainer}
      >
        {Icon && <Icon style={styles.icon} />}
        <Text
          style={[
            styles.dropdownText,
            { color: selectedValue ? '#000000' : '#8D8F93' }, // Placeholder color
          ]}
        >
          {selectedValue || placeholder}
        </Text>
        {required && <Text style={styles.required}>*</Text>}
        <DownArrow style={styles.arrowIcon} />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { height: modalHeight, minHeight: modalHeight },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item.value)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const InputField = ({
  placeholder, // Placeholder text
  value, // Current value of the input
  onChange, // Function to call when value changes
  type = 'text', // Type of input: 'text', 'textarea', 'date', etc.
  multiline = false, // Determines if it's a textarea
  editable = true, // Disable field if needed
  style, // Custom styles for the input
  mainStyle,
  dateMode = 'date', // Mode for DateTimePicker if using date input
  icon: Icon, // Optional icon component for input field
  options = [], // For dropdown options
  modalHeight,
  dropdownHeight = 45,
  required = false,
}) => {
  // State to manage date picker visibility
  const [showPicker, setShowPicker] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const colorScheme = useColorScheme();
  const { getThemeColor } = useContext(ThemeContext);

  // Get date range for validation
  const { minimumSelectableDate, maximumSelectableDate } = calculateDateRange();

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      // Pass the selected date back to the parent
      onChange(selectedDate);
    }
  };

  const renderInput = () => {
    const inputTextColor = editable ? '#000' : '#8D8F93';

    switch (type) {
      case 'date':
        return (
          <>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <View style={[styles.inputDateContainer, style]}>
                <TextInput
                  style={[styles.date, { flex: 1 }]} // TextInput takes all available space
                  placeholder={placeholder}
                  placeholderTextColor={
                    colorScheme === 'dark' ? '#888' : '#aaa'
                  }
                  value={value ? new Date(value).toLocaleDateString() : ''}
                  editable={false} // Disable manual text input for date field
                />
                {Icon && <Icon style={styles.icon} />}
              </View>
            </TouchableOpacity>
            {showPicker && (
              <>
                {/* Modal for iOS */}
                {Platform.OS === 'ios' && (
                  <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={() => setShowPicker(false)}
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
                          textColor={colorScheme === 'dark' ? '#fff' : '#000'}
                          onChange={(event, date) => {
                            setShowPicker(false); // Close the picker after selection
                            if (date) handleDateChange(event, date); // Pass selected date
                          }}
                          minimumDate={minimumSelectableDate}
                          maximumDate={maximumSelectableDate}
                        />
                        <Button
                          title="Done"
                          onPress={() => setShowPicker(false)}
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
                    onChange={(event, date) => {
                      setShowPicker(false);
                      if (date) handleDateChange(event, date);
                    }}
                    minimumDate={minimumSelectableDate}
                    maximumDate={maximumSelectableDate}
                  />
                )}
              </>
            )}
          </>
        );
      case 'textarea':
        return (
          <TextInput
            style={[styles.textArea, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            multiline={multiline}
            editable={editable}
            numberOfLines={3}
          />
        );
      case 'dropdown':
        return (
          <CustomDropdown
            options={options}
            selectedValue={value}
            onValueChange={onChange}
            placeholder={placeholder}
            dropdownHeight={dropdownHeight}
            icon={Icon}
            required={required}
            modalHeight={modalHeight}
          />
        );
      case 'password':
        return (
          <View style={styles.textPassword}>
            <View style={styles.row}>
              <MaterialIcons
                name="lock"
                size={18}
                color={getThemeColor('placeholder')}
              />
              <TextInput
                style={[styles.inputPassword, style]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                secureTextEntry={secureText}
                editable={editable}
              />
            </View>
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Feather
                name={secureText ? 'eye' : 'eye-off'}
                size={18}
                color={getThemeColor('placeholder')}
              />
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.textInput}>
            {Icon && <Icon style={styles.icon} />}
            <TextInput
              style={[styles.input, style, { color: inputTextColor }]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              editable={editable}
            />
          </View>
        );
    }
  };

  return <View style={[styles.container, mainStyle]}>{renderInput()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  inputDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
    height: 44,
    borderRadius: 2,
    borderColor: '#8D8F93',
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  date: {
    fontSize: 12,
    color: '#000000',
  },
  input: {
    backgroundColor: '#FFF',
    fontSize: 12,
    color: '#000',
    width: '95%',
  },
  textArea: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 2,
    borderColor: '#8D8F93',
    borderWidth: 1,
    backgroundColor: '#FFF',
    fontSize: 12,
    color: '#000',
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    borderColor: '#8D8F93',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    minHeight: 45,
    maxHeight: 45,
    position: 'relative',
  },
  arrowIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: 5 }],
  },
  dropdownText: {
    fontSize: 12,
    color: '#000000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  optionText: {
    padding: 10,
    fontSize: 12,
    color: '#000',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#006EDA',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
  },
  textInput: {
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 44,
    borderColor: '#8D8F93',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: 8,
  },
  required: {
    color: '#FF0000',
    paddingTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  textPassword: {
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#8D8F93',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputPassword: {
    backgroundColor: '#FFF',
    fontSize: 12,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default InputField;
