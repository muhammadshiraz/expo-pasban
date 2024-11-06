import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Layout from '@components/Layout';
import RadioButton from '@components/RadioButton';
import { useNavigation } from '@react-navigation/native';
import RoundedButton from '@components/RoundedButton';
import RightArrow from '@assets/icons/right-arrow.svg';
import TickCompleted from '@assets/icons/tickcompleted.svg';
import PrevStep from '@assets/icons/prevStep.svg';
import LayoutCard from '@components/LayoutCard';
import InputField from '@components/InputField';
import ReusableCheckbox from '@components/ReusableCheckbox';
import ReusableModal from '@components/ReusableModal';
import { ThemeContext } from '@context/ThemeContext';

const RemainingTime = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    switches: {},
    textInputs: {},
    checkboxes: {}, // State for checkbox answers
  });

  const initialTime = 5 * 60; // 5 minutes in seconds

  const [remainingTime, setRemainingTime] = useState(initialTime);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect to handle the countdown
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the timer when the component unmounts or when time hits 0
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  // Helper function to format time into hh:mm:ss
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Questions Array
  const quizQuestions = [
    {
      id: 'q1',
      question: 'We should stop at green signal.',
      options: [
        { label: 'Wrong', value: 'Wrong' },
        { label: 'Right', value: 'Right' },
        { label: 'None', value: 'None' },
      ],
      type: 'radio',
    },
    {
      id: 'q2',
      question: 'Should you start driving on yellow light.',
      type: 'text',
    },
    {
      id: 'q3',
      question: 'Should you start driving on yellow light.',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
    },
    {
      id: 'q4',
      question: 'We should always follow speed limits.',
      type: 'checkbox',
      options: [
        { label: 'Wrong', value: 'Wrong' },
        { label: 'Right', value: 'Right' },
        { label: 'None', value: 'None' },
      ],
    },
  ];

  const quizResults = [
    { id: '1', title: 'Total', value: 3 },
    { id: '2', title: 'Total Questions', value: 4 },
    { id: '3', title: 'Correct Answers', value: 4 },
    { id: '4', title: 'Incorrect Answers', value: 0 },
    { id: '5', title: 'Your Percentage', value: '100%' },
  ];

  const handleRadioSelection = (itemId, selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      switches: {
        ...prevData.switches,
        [itemId]: selectedValue, // Set the selected value for the correct item
      },
    }));
  };

  const handleCheckboxChange = (itemId, optionValue) => {
    setFormData((prevData) => {
      const currentCheckboxes = prevData.checkboxes[itemId] || {};
      return {
        ...prevData,
        checkboxes: {
          ...prevData.checkboxes,
          [itemId]: {
            ...currentCheckboxes,
            [optionValue]: !currentCheckboxes[optionValue], // Toggle checkbox state
          },
        },
      };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  return (
    <Layout
      type="innerScreen"
      title="Remaining Time"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <Text style={styles.timer}>{formatTime(remainingTime)}</Text>
        <LayoutCard
          style={{
            paddingHorizontal: 28,
          }}
        >
          <View style={[styles.row, { borderBottomWidth: 1, marginBottom: 0 }]}>
            <Text style={styles.stepsCount}>
              Question {currentStep + 1} of {totalSteps}
            </Text>
            <Text style={styles.stepsPoint}>{currentStep + 1} Points</Text>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>
              {quizQuestions[currentStep].question}
            </Text>
            {quizQuestions[currentStep].type === 'radio' ? (
              <View style={styles.radioCol}>
                <View style={[styles.radioRow]}>
                  {quizQuestions[currentStep].options.map((option) => (
                    <RadioButton
                      key={option.value}
                      label={option.label}
                      selected={
                        formData.switches[quizQuestions[currentStep].id] ===
                        option.value
                      }
                      onPress={() =>
                        handleRadioSelection(
                          quizQuestions[currentStep].id,
                          option.value,
                        )
                      }
                    />
                  ))}
                </View>
              </View>
            ) : quizQuestions[currentStep].type === 'text' ? (
              <InputField
                placeholder="Write the answer"
                value={formData.textInputs[quizQuestions[currentStep].id] || ''}
                onChangeText={(text) =>
                  handleTextInputChange(quizQuestions[currentStep].id, text)
                }
                type="textarea"
                style={styles.inputField}
              />
            ) : quizQuestions[currentStep].type === 'checkbox' ? (
              <View style={styles.checkboxContainer}>
                {quizQuestions[currentStep].options.map((option) => (
                  <ReusableCheckbox
                    key={option.value}
                    label={option.label}
                    isChecked={
                      !!formData.checkboxes[quizQuestions[currentStep].id]?.[
                        option.value
                      ]
                    }
                    onChange={() =>
                      handleCheckboxChange(
                        quizQuestions[currentStep].id,
                        option.value,
                      )
                    }
                  />
                ))}
              </View>
            ) : null}
          </View>
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
              text={currentStep < 3 ? 'Next' : 'Submit Quiz'}
              onPress={currentStep < 3 ? nextStep : handleSubmit}
              icon={currentStep < 3 ? RightArrow : TickCompleted}
              loading={false}
              buttonColor="#006EDA"
              textColor="#FFFFFF"
              size="medium"
              iconPosition="right"
            />
          </View>
        </LayoutCard>
        {/* Modal Integration */}
        <ReusableModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Quiz Result"
          content={
            <View style={styles.modalContent}>
              <View
                style={[
                  styles.row,
                  { borderBottomWidth: 1, columnGap: 4, marginBottom: 8 },
                ]}
              >
                <Text style={styles.status}>Status:</Text>
                <Text style={styles.passed}>Passed</Text>
              </View>
              <View style={styles.col}>
                {quizResults.map((result, index) => (
                  <View
                    key={index}
                    style={[styles.row, { justifyContent: 'space-between' }]}
                  >
                    <Text style={styles.resultTitle}>{result.title}</Text>
                    <Text style={styles.resultCount}>{result.value}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.modalButtonContainer}>
                <RoundedButton
                  text="Retry Quiz"
                  icon=""
                  loading={false}
                  buttonColor="#fff"
                  textColor="#006EDA"
                  size="medium"
                  iconPosition="left"
                  borderColor="#006EDA" // Example border color
                  borderWidth={1} // Example border width
                />
                <RoundedButton
                  text="View Question Results"
                  icon=""
                  loading={false}
                  onPress={() => navigation.navigate('UserQuizResultDetails')}
                  buttonColor="#006EDA"
                  textColor="#FFFFFF"
                  size="medium"
                  iconPosition="right"
                />
              </View>
            </View>
          }
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    rowGap: 30,
    height: '100%',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E56666',
    marginTop: 3,
  },
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomColor: '#DEDEDE',
  },
  stepsCount: { color: '#747474', fontSize: 14 },
  stepsPoint: { color: '#747474', fontSize: 14 },
  radioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioCol: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 8,
  },
  radioRow: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 50,
    alignItems: 'flex-start',
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    columnGap: 16,
    paddingBottom: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 50,
    marginTop: 12,
  },
  inputField: {
    marginTop: 12,
  },
  modalContent: {
    flexDirection: 'column',
    marginBottom: 18,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  passed: {
    color: '#28A745',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultCount: {
    fontSize: 14,
  },
  modalButtonContainer: { flexDirection: 'column', marginTop: 5, rowGap: 8 },
});

export default RemainingTime;
