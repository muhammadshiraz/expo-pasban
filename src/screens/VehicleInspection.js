import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import InputField from '@components/InputField';
import RoundedButton from '@components/RoundedButton';
import UitCalender from '@assets/icons/uit_calender.svg';
import PrevStep from '@assets/icons/prevStep.svg';
import Stepper from '@components/Stepper';
import CustomSwitch from '@components/CustomSwitch';
import RightArrow from '@assets/icons/right-arrow.svg';
import TickCompleted from '@assets/icons/tickcompleted.svg';
import Observation from '@assets/icons/observation.svg';
import BgGroup from '@assets/icons/bg-group.svg';
import Region from '@assets/icons/region.svg';
import { useDispatch, useSelector } from 'react-redux';
import { saveVehicleObservation } from '@redux/actions/formsActions';
import { getAllRegions, getAllBusinessGroup } from '@redux/actions/userActions';
import Toast from 'react-native-toast-message';

const VehicleInspection = () => {
  const dispatch = useDispatch();
  const { loading, vehicleObservation, error } = useSelector(
    (state) => state.forms,
  );
  const user = useSelector((state) => state.auth.user);
  const { userId } = user || {};
  const { regions, group } = useSelector((state) => state.user);
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  useEffect(() => {
    dispatch(getAllRegions());
    dispatch(getAllBusinessGroup());
    //dispatch(putUpdateProfile(parseInt(userId)));
  }, [dispatch]);

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
        ...group.map((group) => ({
          label: group.BusinessGroup,
          value: group.Id,
        })),
      ]
    : [];

  // Consolidate form fields into one object
  const [formData, setFormData] = useState({
    loginId: userId,
    userId: parseInt(userId),
    vehicleName: '',
    observationDate: '',
    lastObservationDate: '',
    businessGroup: '',
    designation: '',
    lineManager: '',
    region: '',
    assesseeName: '',
    employeeNo: '',
    regNo: '',
    tourFuel: 'No',
    radiatorWaterBottle: 'No',
    windScreenWaterBottle: 'No',
    oilGreater: 'No',
    breakCylinder: 'No',
    clutchCylinder: 'No',
    ignitionSwitch: 'No',
    parts: 'No',
    radiatorFan: 'No',
    tirePressure: 'No',
    paddleRubber: 'No',
    wiperRubber: 'No',
    wiperWorking: 'No',
    vehicleDamage: 'No',
    vehicleLogFill: 'No',
    extraTireStupnee: 'No',
    firstAidKit: 'No',
    seatBelts: 'No',
    sideRearMirrors: 'No',
    vehTuningDate: '',
    vehLastServiceDate: '',
    vehNextInspectionDate: '',
    lastFinding: '',
    vehicleImprovement: 'No',
    otherObservation: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Handle input field changes and update form data
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    // Validate the current step's inputs
    if (currentStep === 0) {
      if (!formData.driverName)
        newErrors.driverName = 'Driver name is required';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.businessGroup)
        newErrors.businessGroup = 'Business group is required';
    } else if (currentStep === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.employeeNo)
        newErrors.employeeNo = 'Employee number is required';
      if (!formData.vehicle) newErrors.vehicle = 'Vehicle number is required';
    } else if (currentStep === 2) {
      if (!formData.vehTuningDate)
        newErrors.tuningDate = 'Last tuning date is required';
      if (!formData.serviceDate)
        newErrors.serviceDate = 'Last service date is required';
    } else if (currentStep === 3) {
      if (!formData.finding) newErrors.finding = 'Finding is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Form Error',
          text2: 'Please fill in all required fields',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Form Error',
        text2: 'Please fill in all required fields',
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePress = () => {
    // Validate form and navigate to the next step
    if (validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Form Error',
        text2: 'Please fill in all required fields',
      });
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        // Dispatch the Redux action with formData
        dispatch(saveVehicleObservation(formData))
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Observation saved successfully!',
            });
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Submission Error',
              text2: 'Failed to save observation. Please try again.',
            });
          });
      }
    }
  };

  // Data for each switch
  const switchStep2Data = [
    { id: 'tourFuel', label: 'At least half tank:' },
    {
      id: 'radiatorWaterBottle',
      label: 'Is radiator’s water bottle filled up to the level?',
    },
    {
      id: 'windScreenWaterBottle',
      label: 'Is windscreen water bottle filled up to the level?',
    },
    { id: 'oilGreater', label: 'Is engine oil greater than to the level?' },
    { id: 'breakCylinder', label: 'Is brake M/Cyl reservoir up to level?' },
    {
      id: 'clutchCylinder',
      label: 'Is clutch M/Cyl reservoir up to the level?',
    },
  ];

  const switchStep3Data = [
    { id: 'clutchCylinder', label: 'Is Ignition switch working ?' },
    {
      id: 'parts',
      label: 'Are all indicator, brake, reverse & Head\nlights working ?',
    },
    {
      id: 'radiatorFan',
      label: 'Is Radiator Fan working ?',
    },
    {
      id: 'tirePressure',
      label:
        'Tire pressure OK? (i.e. 16 cmof wheel base must\nbe in contact with road)',
    },
    { id: 'paddleRubber', label: 'Is paddle rubber in good condition?' },
    {
      id: 'wiperWorking',
      label: 'Is wiper rubber in good condition?',
    },
    {
      id: 'wiperRubber',
      label: 'Is wiper working in good condition?',
    },
    { id: 'vehicleDamage', label: 'Is Vehicle Damage?' },
    { id: 'vehicleLogFill', label: 'Vehicle Log/Fill On Time?' },
    {
      id: 'extraTireStupnee',
      label: 'Is Extra Tire/Stepney available in good condition?',
    },
    {
      id: 'firstAidKit',
      label: 'Is First Aid Kit available with first aid items?',
    },
    {
      id: 'seatBelts',
      label: 'Are all Seat belts in good working conditions?',
    },
    {
      id: 'sideRearMirrors',
      label: 'Are side & rear mirrors in good condition?',
    },
  ];

  const switchStep4Data = [
    {
      id: 'vehicleImprovement',
      label: 'Is there any improvement in last month finding?',
    },
  ];

  // Toggle switch handler
  // const toggleSwitch = (switchId) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     switches: {
  //       ...prevData.switches,
  //       [switchId]: !prevData.switches[switchId],
  //     },
  //   }));
  // };

  const toggleSwitch = (id) => {
    setFormData((prev) => ({
      ...prev,
      [id]: prev[id] === 'Yes' ? 'No' : 'Yes',
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <InputField
              placeholder="Driver Name"
              value={formData.vehicleName}
              onChange={(value) => handleInputChange('vehicleName', value)}
              type="text"
              style={styles.inputField}
              errorMessage={errors.driverName}
            />
            <InputField
              placeholder="Date"
              value={formData.observationDate}
              onChange={(value) => handleInputChange('observationDate', value)}
              type="date"
              icon={UitCalender}
              style={styles.inputField}
              errorMessage={errors.date}
            />
            <InputField
              placeholder="Last Observation Date"
              value={formData.lastObservationDate}
              onChange={(value) =>
                handleInputChange('lastObservationDate', value)
              }
              type="date"
              icon={UitCalender}
              style={styles.inputField}
            />
            <InputField
              icon={BgGroup}
              type="dropdown"
              placeholder="Business Group"
              modalHeight={350}
              value={formData.businessGroup}
              onChange={(value) => {
                const selectedGroup = groupOptions.find(
                  (option) => option.value === value,
                );
                handleInputChange(
                  'businessGroup',
                  selectedGroup.label,
                  selectedGroup.value,
                );
              }}
              options={groupOptions}
            />
            <InputField
              placeholder="Designation"
              value={formData.designation}
              onChange={(value) => handleInputChange('designation', value)}
              type="text"
              style={styles.inputField}
              errorMessage={errors.designation}
            />
            <InputField
              placeholder="Line Manager/Auditor"
              value={formData.lineManager}
              onChange={(value) => handleInputChange('lineManager', value)}
              type="text"
              style={styles.inputField}
              errorMessage={errors.lineManager}
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
          </>
        );
      case 1:
        return (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Assessee</Text>
            </View>
            <InputField
              placeholder="Assessee Name"
              value={formData.assesseeName}
              onChange={(value) => handleInputChange('assesseeName', value)}
              type="text"
              style={styles.inputField}
            />
            <InputField
              placeholder="Employee #"
              value={formData.employeeNo}
              onChange={(value) => handleInputChange('employeeNo', value)}
              type="text"
              style={styles.inputField}
            />
            <InputField
              placeholder="Vehicle #"
              value={formData.regNo}
              onChange={(value) => handleInputChange('regNo', value)}
              type="text"
              style={styles.inputField}
            />
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Petrol</Text>
              {switchStep2Data.slice(0, 1).map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
              <Text style={styles.headerSwitchTitle}>Water</Text>
              {switchStep2Data.slice(1, 3).map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
              <Text style={styles.headerSwitchTitle}>Oil</Text>
              {switchStep2Data.slice(3, 6).map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Electricity</Text>
              {switchStep3Data.slice(0, 3).map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
              <Text style={styles.headerSwitchTitle}>Rubber</Text>
              {switchStep3Data.slice(3, 7).map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
              <Text style={styles.headerSwitchTitle}>Other Checks</Text>
              {switchStep3Data.slice(7, 14).map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
            </View>
            <InputField
              placeholder="Last Tuning Date ?"
              value={formData.vehTuningDate}
              onChange={(value) => handleInputChange('vehTuningDate', value)}
              type="date"
              icon={UitCalender}
              style={styles.inputField}
              errorMessage={errors.vehTuningDate}
            />
            <InputField
              placeholder="Last Service Date ?"
              value={formData.vehLastServiceDate}
              onChange={(value) =>
                handleInputChange('vehLastServiceDate', value)
              }
              type="date"
              icon={UitCalender}
              style={styles.inputField}
              errorMessage={errors.vehLastServiceDate}
            />
            <InputField
              placeholder="Last Inspection Date ?"
              value={formData.vehNextInspectionDate}
              onChange={(value) =>
                handleInputChange('vehNextInspectionDate', value)
              }
              type="date"
              icon={UitCalender}
              style={styles.inputField}
              errorMessage={errors.vehNextInspectionDate}
            />
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Last Month finding</Text>
            </View>
            <InputField
              placeholder="What was the last month’s finding?"
              value={formData.lastFinding}
              onChange={(value) => handleInputChange('lastFinding', value)}
              type="textarea"
              style={styles.inputField}
              errorMessage={errors.lastFinding}
            />
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Improvement</Text>
              {switchStep4Data.map((item) => (
                <View key={item.id} style={styles.headerSwitchRow}>
                  <Text style={styles.headerSwitchRowTitle}>{item.label}</Text>
                  <CustomSwitch
                    isOn={formData[item.id] === 'Yes'}
                    onToggle={() => toggleSwitch(item.id)}
                    activeColor="#006EDA"
                    inactiveColor="#D6D6D6"
                    width={48}
                    height={25}
                    ballSize={20}
                    switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                  />
                </View>
              ))}
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                Other Observation <Observation />
              </Text>
            </View>
            <InputField
              placeholder="Any other Observation ?"
              value={formData.otherObservation}
              onChange={(value) => handleInputChange('otherObservation', value)}
              type="textarea"
              style={styles.inputField}
              errorMessage={errors.otherObservation}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      type="innerScreen"
      title="Vehicle Inspection"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              rowGap: 15,
              paddingHorizontal: 28,
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                rowGap: 8,
                width: '100%',
              }}
            >
              <Stepper
                totalSteps={totalSteps}
                currentStep={currentStep}
                marginLeftConnector={28}
              />
              {renderStep()}
              <View style={styles.formContainer}>
                <View style={styles.buttonContainer}>
                  {currentStep > 0 && currentStep < totalSteps - 1 && (
                    <RoundedButton
                      text="Previous"
                      onPress={prevStep}
                      loading={false}
                      buttonColor="#fff"
                      textColor="#006EDA"
                      size="medium"
                      icon={PrevStep}
                      iconPosition="left"
                      borderColor="#006EDA"
                      borderWidth={1}
                    />
                  )}
                  <RoundedButton
                    text={currentStep < 3 ? 'Next' : 'Completed'}
                    onPress={currentStep < 3 ? nextStep : handlePress}
                    icon={currentStep < 3 ? RightArrow : TickCompleted}
                    loading={false}
                    buttonColor="#006EDA"
                    textColor="#FFFFFF"
                    size="medium"
                    iconPosition="right"
                  />
                </View>
              </View>
            </View>
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
    flex: 1,
    marginTop: 8,
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
  headerSwitchContainer: {
    flexDirection: 'column',
    rowGap: 12,
    marginBottom: 12,
  },
  headerSwitchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSwitchRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#8D8F93',
    paddingBottom: 8,
    minHeight: 40,
    maxHeight: 40,
  },
  headerSwitchRowTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
});

export default VehicleInspection;
