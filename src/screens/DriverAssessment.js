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
import RadioButton from '@components/RadioButton';
import BgGroup from '@assets/icons/bg-group.svg';
import Region from '@assets/icons/region.svg';
import { useDispatch, useSelector } from 'react-redux';
import { saveDrivingObservation } from '@redux/actions/formsActions';
import { getAllRegions, getAllBusinessGroup } from '@redux/actions/userActions';
import Toast from 'react-native-toast-message';

const DriverAssessment = () => {
  const dispatch = useDispatch();
  const { getThemeColor } = useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);
  const { regions, group } = useSelector((state) => state.user);
  const { userId } = user || {};
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;

  useEffect(() => {
    dispatch(getAllRegions());
    dispatch(getAllBusinessGroup());
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
    driverId: '',
    driverName: '',
    observationDate: '',
    lastObservationDate: '',
    businessGroup: '',
    designation: '',
    lineManager: '',
    region: '',

    // Switch Step 2,
    obsrvSides: 'No',
    fastenSafetyBelt: 'No',
    passengerSafety: 'No',

    // Switch Step 5,
    improvement: 'No',
    distance: 'No',
    inspection: 'No',
    safeDistanceFront: 'No',
    safeDistanceSide: 'No',
    safeDistanceBack: 'No',
    brakes: 'No',

    // Radio Step 2,
    properLane: '',
    speedCurve: '',
    curvePath: '',

    // Radio Step 3,
    isConfident: '',
    isRelaxed: '',
    tolerateOthers: '',
    pedestrianConsideration: '',
    plan: '',
    checkSides: '',
    checkBlindSpots: '',
    reversesCarefully: '',
    reversesCorrectly: '',

    // Radio Step 3,
    scansAhead: '',
    usesMirrors: '',
    obsrvRoadSigns: '',
    safeDistance: '',
    othersActions: '',
    clearance: '',
    signalsOnTime: '',
    checkBlindSpotsDriving: '',
    safeSpeed: '',
    vehiclePosition: '',

    incidentHappend: 'No',

    lastMonthObservation: '',
    otherObservations: '',
    caution: '',
    // Last Step
    remarks: '',
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Handle input field changes and update form data
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle switch handler
  const toggleSwitch = (id) => {
    setFormData((prev) => ({
      ...prev,
      [id]: prev[id] === 'Yes' ? 'No' : 'Yes',
    }));
  };

  // Function to toggle the radio button state
  const toggleRadioButton = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};

    // if (!formData.driverName) formErrors.driverName = 'Driver name is required';
    // if (!formData.date) formErrors.date = 'Date is required';
    // if (!formData.businessGroup)
    //   formErrors.businessGroup = 'Business Group is required';
    // if (!formData.designation)
    //   formErrors.designation = 'Designation is required';
    // if (!formData.lineManager)
    //   formErrors.lineManager = 'Line Manager is required';
    // if (!formData.region) formErrors.region = 'Region is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        // If it's the last step, navigate to the final screen
        navigation.navigate('FinalScreen'); // Update with your final screen name
      }
    } else {
      Alert.alert('Validation Error', 'Please fill In all required fields.');
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
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else {
        dispatch(saveDrivingObservation(formData))
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
        console.log(formData);
      }
    }
  };

  // Data for each switch and radio
  const switchStep2Data = [
    { id: 'obsrvSides', label: 'Observe all sides:' },
    {
      id: 'fastenSafetyBelt',
      label: 'Fasten safety belt:',
    },
    {
      id: 'passengerSafety',
      label: 'Checks passenger for safety belt:',
    },
    {
      id: 'properLane',
      label: 'Gets In the proper lane In time:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'speedCurve',
      label: 'Speed on curve:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'curvePath',
      label: 'Curve path:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
  ];

  const switchStep3Data = [
    {
      id: 'isConfident',
      label: 'Is confident:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'isRelaxed',
      label: 'Is Relaxed:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'tolerateOthers',
      label: 'Tolerates bad driving of others:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'pedestrianConsideration',
      label: 'Is considerate to pedestrians:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'plan',
      label: 'Plans:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'checkSides',
      label: 'Checks sides and behind:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'checkBlindSpots',
      label: 'Check blind spots:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'reversesCarefully',
      label: 'Reverses carefully:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'reversesCorrectly',
      label: 'Reverses correctly:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
  ];

  const switchStep4Data = [
    {
      id: 'scansAhead',
      label: 'Scans ahead:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'usesMirrors',
      label: 'Uses mirrors:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'obsrvRoadSigns',
      label: 'Observes road signs:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'safeDistance',
      label: 'Maintains safe distance:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'othersActions',
      label: 'Anticipates actions of others:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'clearance',
      label: 'Clearance when passing:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'signalsOnTime',
      label: 'Signals on time:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'checkBlindSpotsDriving',
      label: 'Checks blind spots:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'safeSpeed',
      label: 'Drivers at safe speed:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'vehiclePosition',
      label: 'Observes vehicle position:',
      options: [
        { label: 'Good', value: 'Good' },
        { label: 'Ok', value: 'OK' },
        { label: 'IN.', value: 'In' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'incidentHappend',
      label: 'Is there any incident happened In this month?',
    },
  ];

  const switchStep5Data = [
    {
      id: 'improvement',
      label: 'Is there any improvement In last month\nobservation?',
    },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <InputField
              placeholder="Driver ID"
              value={formData.driverId}
              onChange={(value) => handleInputChange('driverId', value)}
              type="text"
              style={styles.inputField}
              errorMessage={errors.driverId} // Display error message if validation fails
            />
            <InputField
              placeholder="Driver Name"
              value={formData.driverName}
              onChange={(value) => handleInputChange('driverName', value)}
              type="text"
              style={styles.inputField}
              errorMessage={errors.driverName} // Display error message if validation fails
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
              type="dropdown"
              placeholder="Designation"
              value={formData.designation}
              onChange={(value) => handleInputChange('designation', value)}
              options={[
                { label: 'Territory manager', value: 'Territory manager' },
                { label: 'Driver', value: 'Driver' },
                { label: 'Assistant Manager', value: 'Assistant Manager' },
                { label: 'GSM', value: 'GSM' },
                { label: 'Chauffeur', value: 'Chauffeur' },
              ]}
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
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Before Driving</Text>
              {switchStep2Data.slice(0, 3).map((item) => (
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
            <View style={styles.radioContainer}>
              <Text style={styles.radioTitle}>Turning</Text>
              {switchStep2Data.slice(3, 6).map((item, index, array) => (
                <View key={item.id} style={styles.radioCol}>
                  <Text style={styles.radioRowTitle}>{item.label}</Text>
                  <View
                    style={[
                      styles.radioRow,
                      index === array.length - 1 && styles.noBorder,
                    ]}
                  >
                    {item.options &&
                      item.options.map((option) => (
                        <RadioButton
                          key={option.value}
                          label={option.label}
                          selected={formData[item.id] === option.value}
                          onPress={() =>
                            toggleRadioButton(item.id, option.value)
                          }
                        />
                      ))}
                  </View>
                </View>
              ))}
            </View>
          </>
        );
      case 2:
        return (
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Road Behavior</Text>
            {switchStep3Data.slice(0, 4).map((item, index, array) => (
              <View key={item.id} style={styles.radioCol}>
                <Text style={styles.radioRowTitle}>{item.label}</Text>
                <View
                  style={[
                    styles.radioRow,
                    index === array.length - 1 && styles.noBorder, // Conditionally apply noBorder style to the last item
                  ]}
                >
                  {item.options &&
                    item.options.map((option) => (
                      <RadioButton
                        key={option.value}
                        label={option.label}
                        selected={formData[item.id] === option.value} // Check if the option is selected
                        onPress={() => toggleRadioButton(item.id, option.value)} // Update the selected value
                      />
                    ))}
                </View>
              </View>
            ))}
            <Text style={styles.radioTitle}>Reversing</Text>
            {switchStep3Data.slice(4, 9).map((item, index, array) => (
              <View key={item.id} style={styles.radioCol}>
                <Text style={styles.radioRowTitle}>{item.label}</Text>
                <View
                  style={[
                    styles.radioRow,
                    index === array.length - 1 && styles.noBorder, // Conditionally apply noBorder style to the last item
                  ]}
                >
                  {item.options &&
                    item.options.map((option) => (
                      <RadioButton
                        key={option.value}
                        label={option.label}
                        selected={formData[item.id] === option.value} // Check if the option is selected
                        onPress={() => toggleRadioButton(item.id, option.value)} // Update the selected value
                      />
                    ))}
                </View>
              </View>
            ))}
          </View>
        );
      case 3:
        return (
          <>
            <View style={styles.radioContainer}>
              <Text style={styles.radioTitle}>General Driving</Text>
              {switchStep4Data.slice(0, 10).map((item, index, array) => (
                <View key={item.id} style={styles.radioCol}>
                  <Text style={styles.radioRowTitle}>{item.label}</Text>
                  <View style={[styles.radioRow]}>
                    {item.options &&
                      item.options.map((option) => (
                        <RadioButton
                          key={option.value}
                          label={option.label}
                          selected={formData[item.id] === option.value}
                          onPress={() =>
                            toggleRadioButton(item.id, option.value)
                          }
                        />
                      ))}
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Incidents</Text>
              {switchStep4Data.slice(10, 11).map((item) => (
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
      case 4:
        return (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Last Month’s Observation</Text>
            </View>
            <InputField
              placeholder="What was the last month’s observation?"
              value={formData.lastMonthObservation}
              onChange={(value) =>
                handleInputChange('lastMonthObservation', value)
              }
              type="textarea"
              style={styles.inputField}
              errorMessage={errors.lastMonthObservation}
            />
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Improvement</Text>
              {switchStep5Data.slice(0, 1).map((item) => (
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
              <Text style={styles.headerTitle}>Other Observation</Text>
            </View>
            <InputField
              placeholder="Any other Observation?"
              value={formData.otherObservations}
              onChange={(value) =>
                handleInputChange('otherObservations', value)
              }
              type="textarea"
              style={styles.inputField}
              errorMessage={errors.anyObservation}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>
                Caution <Observation />
              </Text>
            </View>
            <InputField
              placeholder="Write any Caution"
              value={formData.caution}
              onChange={(value) => handleInputChange('caution', value)}
              type="textarea"
              style={styles.inputField}
              errorMessage={errors.caution}
            />
            <View style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>Distance</Text>
              <View style={styles.headerSwitchRow}>
                <Text style={styles.headerSwitchRowTitle}>
                  Maintaining three second distance?
                </Text>
                <CustomSwitch
                  isOn={formData.distance === 'Yes'}
                  onToggle={() => toggleSwitch('distance')}
                  activeColor="#006EDA"
                  inactiveColor="#D6D6D6"
                  width={48}
                  height={25}
                  ballSize={20}
                  switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                />
              </View>
              <Text style={styles.headerSwitchTitle}>Inspection</Text>
              <View style={styles.headerSwitchRow}>
                <Text style={styles.headerSwitchRowTitle}>
                  Car inspection before starting a journey?
                </Text>
                <CustomSwitch
                  isOn={formData.inspection === 'Yes'}
                  onToggle={() => toggleSwitch('inspection')}
                  activeColor="#006EDA"
                  inactiveColor="#D6D6D6"
                  width={48}
                  height={25}
                  ballSize={20}
                  switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                />
              </View>
              <Text style={styles.headerSwitchTitle}>Safe Distance Front</Text>
              <View style={styles.headerSwitchRow}>
                <Text style={styles.headerSwitchRowTitle}>
                  Maintaining safe distance from other vehicles
                </Text>
                <CustomSwitch
                  isOn={formData.safeDistanceFront === 'Yes'}
                  onToggle={() => toggleSwitch('safeDistanceFront')}
                  activeColor="#006EDA"
                  inactiveColor="#D6D6D6"
                  width={48}
                  height={25}
                  ballSize={20}
                  switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                />
              </View>
              <Text style={styles.headerSwitchTitle}>Safe Distance Side</Text>
              <View style={styles.headerSwitchRow}>
                <Text style={styles.headerSwitchRowTitle}>
                  Maintaining safe distance from other {'\n'} vehicles - side ?
                </Text>
                <CustomSwitch
                  isOn={formData.safeDistanceBack === 'Yes'}
                  onToggle={() => toggleSwitch('safeDistanceBack')}
                  activeColor="#006EDA"
                  inactiveColor="#D6D6D6"
                  width={48}
                  height={25}
                  ballSize={20}
                  switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                />
              </View>
              <Text style={styles.headerSwitchTitle}>Brakes</Text>
              <View style={styles.headerSwitchRow}>
                <Text style={styles.headerSwitchRowTitle}>
                  Distance maintain before pressing brakes ?
                </Text>
                <CustomSwitch
                  isOn={formData.brakes === 'Yes'}
                  onToggle={() => toggleSwitch('brakes')}
                  activeColor="#006EDA"
                  inactiveColor="#D6D6D6"
                  width={48}
                  height={25}
                  ballSize={20}
                  switchStyle={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                />
              </View>
            </View>
          </>
        );
      case 5:
        return (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Comments</Text>
            </View>
            <InputField
              placeholder="Description"
              value={formData.remarks}
              onChange={(value) => handleInputChange('remarks', value)}
              type="textarea"
              style={styles.inputField}
              errorMessage={errors.description}
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
      title="Driver Assessment"
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
                marginLeftConnector={6}
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
                      borderColor="#006EDA" // Example border color
                      borderWidth={1} // Example border width
                    />
                  )}
                  <RoundedButton
                    text={currentStep < 5 ? 'Next' : 'Completed'}
                    onPress={currentStep < 5 ? nextStep : handlePress}
                    icon={currentStep < 5 ? RightArrow : TickCompleted}
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
  radioContainer: {
    marginBottom: 12,
  },
  radioTitle: {
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
  radioCol: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 8,
    marginTop: 8,
  },
  radioRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#8D8F93',
    paddingBottom: 8,
    marginTop: 8,
    minHeight: 40,
    maxHeight: 40,
  },
  noBorder: {
    borderBottomWidth: 0, // Remove bottom border
  },
  headerSwitchRowTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  radioRowTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginTop: 5,
  },
});

export default DriverAssessment;
