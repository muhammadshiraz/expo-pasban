import React, { useContext, useState, useEffect } from 'react';
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
import { tripDurationOptions } from '@utils/dropdownOptions';
import Toast from 'react-native-toast-message';
import UitCalender from '@assets/icons/uit_calender.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchVehiclesRegNo } from '@redux/actions/fleetActions';
import { getAllRegions, getAllBusinessGroup } from '@redux/actions/userActions';

const Reports = () => {
  const dispatch = useDispatch();
  const { fetchVehiclesRegNo, loading, error } = useSelector(
    (state) => state.fleet,
  );
  const { regions, group } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const { getThemeColor } = useContext(ThemeContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReportTitle, setSelectedReportTitle] = useState('');

  useEffect(() => {
    dispatch(getFetchVehiclesRegNo());
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

  // Map vehicle data to dropdown options
  const vehicleRegNoOptions = fetchVehiclesRegNo?.map((vehicle) => ({
    label: vehicle.regNo,
    value: vehicle.ffid,
  }));

  const [formData, setFormData] = useState({
    selVehicle: {
      label: '',
      value: '',
      required: true,
    },
    selRegion: '',
    tripDuration: {
      label: '',
      value: null,
      required: true,
    },
    startDate: '',
    endDate: '',
  });

  const reportsData = [
    { id: 1, title: 'Vehicle Last Update Status' },
    { id: 2, title: 'Late Night Exits' },
    //    { id: 3, title: 'Vehicle Movement' },
    { id: 3, title: 'Vehicle Traveling' },
    //{ id: 5, title: 'Seat Belt Monitoring' },
    { id: 4, title: 'Vehicle Inspection' },
    { id: 5, title: 'Road Driving Assessment' },
    { id: 6, title: 'Vehicles Monthly Mileage' },
  ];

  // Function to handle report selection and open the modal
  const handleReportPress = (title) => {
    if (title === 'Vehicle Last Update Status') {
      // Directly navigate to ReportsDetailLists
      navigation.navigate('VehicleLastUpdateStatus', { reportTitle: title });
    } else {
      // For other reports, show the modal
      setSelectedReportTitle(title);
      setIsModalVisible(true);
    }
  };

  // Function to handle input changes
  // const handleInputChange = (name, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: {
  //       ...prevData[name],
  //       value,
  //       required: value ? false : true,
  //     },
  //   }));
  // };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle input changes
  const handleDropDownChange = (name, label, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: { label, value, required: false },
    }));
  };

  const handleDateChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleShowReport = () => {
    // Perform validation
    if (
      (selectedReportTitle === 'Vehicle Inspection' && !formData.selRegion) ||
      (selectedReportTitle !== 'Road Driving Assessment' &&
        selectedReportTitle !== 'Vehicle Inspection' &&
        !formData.selVehicle.value) ||
      (selectedReportTitle !== 'Late Night Exits' &&
        selectedReportTitle !== 'Vehicle Movement' &&
        selectedReportTitle !== 'Seat Belt Monitoring' &&
        selectedReportTitle !== 'Vehicle Inspection' &&
        selectedReportTitle !== 'Road Driving Assessment' &&
        selectedReportTitle !== 'Vehicles Monthly Mileage' &&
        !formData.tripDuration.value) ||
      !formData.startDate ||
      !formData.endDate
    ) {
      // Close the modal before showing the Toast
      setIsModalVisible(false);
      Toast.show({
        type: 'error',
        text2: 'Please fill in all required fields before proceeding.',
        visibilityTime: 3000,
        position: 'top',
      });
      return; // Stop further execution if validation fails
    }

    // Convert dates to strings if they are not already
    const startDateString =
      formData.startDate instanceof Date
        ? formData.startDate.toISOString()
        : formData.startDate;

    const endDateString =
      formData.endDate instanceof Date
        ? formData.endDate.toISOString()
        : formData.endDate;

    // Navigate based on selected report title
    if (selectedReportTitle === 'Vehicle Inspection') {
      // Navigate to the DrivingObservation screen
      navigation.navigate('VehicleInspectionReport', {
        reportTitle: selectedReportTitle,
        startDate: startDateString,
        endDate: endDateString,
        region: formData.selRegion,
      });
    } else if (selectedReportTitle === 'Late Night Exits') {
      navigation.navigate('LateNightExits', {
        reportTitle: selectedReportTitle,
        selVehicle: formData.selVehicle.value,
        ffid: formData.selVehicle.value,
        startDate: startDateString,
        endDate: endDateString,
      });
    } else if (selectedReportTitle === 'Vehicle Traveling') {
      navigation.navigate('VehicleTraveling', {
        reportTitle: selectedReportTitle,
        selVehicle: formData.selVehicle.label,
        ffid: formData.selVehicle.value,
        tripDuration: formData.tripDuration.value,
        startDate: startDateString,
        endDate: endDateString,
      });
    } else if (selectedReportTitle === 'Road Driving Assessment') {
      navigation.navigate('RoadDrivingAssessment', {
        reportTitle: selectedReportTitle,
        startDate: startDateString,
        endDate: endDateString,
      });
    } else if (selectedReportTitle === 'Vehicles Monthly Mileage') {
      navigation.navigate('VehiclesMonthlyMileage', {
        reportTitle: selectedReportTitle,
        selVehicle: formData.selVehicle.value,
        ffid: formData.selVehicle.value,
        startDate: startDateString,
        endDate: endDateString,
      });
    } else {
      // Navigate to ReportsDetailLists for other reports
      navigation.navigate('ReportsDetailLists', {
        reportTitle: selectedReportTitle,
      });
    }
    setIsModalVisible(false); // Close the modal
  };

  return (
    <Layout
      type="innerScreen"
      title="Reports"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <Text style={styles.reportsTitle}>Reports List</Text>
          {reportsData.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={[styles.reportsList, { borderBottomWidth: 1 }]}
              onPress={() => handleReportPress(report.title)} // Open modal for the selected report
            >
              <View style={styles.reports}>
                <Text style={styles.reportsText}>{report.title}</Text>
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

      <ModalComponent
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)} // Close modal
        showSignButton={false}
      >
        <View style={styles.col}>
          <Text style={styles.filterTitle}>{selectedReportTitle}</Text>
          {/* Display the selected report title */}
          <View style={styles.formContainer}>
            {selectedReportTitle === 'Vehicle Inspection' ? (
              <InputField
                icon={Region}
                type="dropdown"
                placeholder="Please Select Your Region"
                value={formData.selRegion || ''}
                onChange={(value) => handleInputChange('selRegion', value)}
                options={regionOptions}
              />
            ) : selectedReportTitle === 'Road Driving Assessment' ? null : ( // Hide selVehicle input if selectedReportTitle is 'Road Driving Assessment'
              <InputField
                type="dropdown"
                icon={SelVehicle}
                required={formData.selVehicle.required}
                placeholder={`Select Vehicle`}
                value={formData.selVehicle.label}
                modalHeight={300}
                onChange={(value) => {
                  const selectedVehicle = vehicleRegNoOptions.find(
                    (option) => option.value === value,
                  );
                  if (selectedVehicle) {
                    // Call handleInputChange to set the selected vehicle data
                    handleDropDownChange(
                      'selVehicle',
                      selectedVehicle.label,
                      selectedVehicle.value,
                      selectedVehicle.ffid,
                    );
                  }
                }}
                //onChange={(value) => handleInputChange('selVehicle', value)}
                options={vehicleRegNoOptions || []}
                loading={loading}
              />
            )}
            {selectedReportTitle !== 'Late Night Exits' &&
              selectedReportTitle !== 'Vehicle Movement' &&
              selectedReportTitle !== 'Seat Belt Monitoring' &&
              selectedReportTitle !== 'Vehicle Inspection' &&
              selectedReportTitle !== 'Road Driving Assessment' &&
              selectedReportTitle !== 'Vehicles Monthly Mileage' && (
                <InputField
                  type="dropdown"
                  required={formData.tripDuration.required}
                  icon={TripDuration}
                  placeholder={`Trip Duration`}
                  value={formData.tripDuration.label}
                  modalHeight={300}
                  onChange={(value) => {
                    const selectedDuration = tripDurationOptions.find(
                      (option) => option.value === value,
                    );
                    handleDropDownChange(
                      'tripDuration',
                      selectedDuration.label,
                      selectedDuration.value,
                    );
                  }}
                  options={tripDurationOptions}
                />
              )}
            <InputField
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(value) => handleDateChange('startDate', value)}
              type="date"
              icon={UitCalender}
            />
            <InputField
              placeholder="End Date"
              value={formData.endDate}
              onChange={(value) => handleDateChange('endDate', value)}
              type="date"
              icon={UitCalender}
            />
            <TouchableOpacity
              style={styles.showRepoBtn}
              onPress={handleShowReport} // Navigate when "Show Report" is pressed
            >
              <Text style={styles.showRepoBtnText}>Show Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalComponent>
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
  reportsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  reportsList: {
    flexDirection: 'column',
    borderBottomColor: '#DBDBDB',
    paddingBottom: 8,
  },
  reports: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportsText: {
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

export default Reports;
