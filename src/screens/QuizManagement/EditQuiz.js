import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import InputField from '@components/InputField';
import RoundedButton from '@components/RoundedButton';
import ReusableCheckbox from '@components/ReusableCheckbox';
import UitCalender from '@assets/icons/uit_calender.svg';
import User from '@assets/icons/user.svg';
import Email from '@assets/icons/email.svg';
import Gender from '@assets/icons/gender.svg';
import EmpId from '@assets/icons/empId.svg';
import Region from '@assets/icons/region.svg';
import BgGroup from '@assets/icons/bg-group.svg';
import EmpGroup from '@assets/icons/employee-group.svg';
import Password from '@assets/icons/password.svg';

const EditQuiz = () => {
  const { getThemeColor } = useContext(ThemeContext);
  // State to manage checkbox status
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (checked) => {
    setIsCheckboxChecked(checked); // Update the checkbox state
  };
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    quizName: 'Karachi IC/HO DDC 8th Oct 2024',
    selectQuiz: 'ACTUAL DDC Quiz',
    totalAttempts: '2',
    validity: '18 months',
    totalDuration: '500 mins',
    passingCriteria: '80',
    remarks: 'none',
    sessionDate: new Date('2024-05-17'),
    checkboxes: {},
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Layout
      type="innerScreen"
      title="Edit Quiz"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <View style={styles.formContainer}>
            <InputField
              placeholder="Session Name"
              value={formData.quizName}
              onChange={(value) => handleInputChange('quizName', value)}
              type="text"
            />
            <InputField
              type="dropdown"
              placeholder="Select Quiz"
              value={formData.selectQuiz}
              onChange={(value) => handleInputChange('selectQuiz', value)}
              options={[
                { label: 'Update DDC Quiz WIP', value: 'Update DDC Quiz WIP' },
                { label: 'DDC 2024', value: 'DDC 2024' },
                { label: 'New Quiz', value: 'New Quiz' },
              ]}
            />
            <InputField
              placeholder="Total Attempts Allowed"
              value={formData.totalAttempts}
              onChange={(value) => handleInputChange('totalAttempts', value)}
              type="text"
            />
            <InputField
              placeholder="Validity (Months)"
              value={formData.validity}
              onChange={(value) => handleInputChange('validity', value)}
              type="text"
            />
            <InputField
              placeholder="Total Duration"
              value={formData.totalDuration}
              onChange={(value) => handleInputChange('totalDuration', value)}
              type="text"
            />
            <InputField
              placeholder="Passing Criteria"
              value={`${formData.passingCriteria}%`}
              onChange={(value) => handleInputChange('passingCriteria', value)}
              type="text"
            />
            <InputField
              placeholder="Remarks"
              value={`${formData.remarks}`}
              onChange={(value) => handleInputChange('remarks', value)}
              type="text"
            />
            <InputField
              placeholder="Session Date"
              value={formData.sessionDate}
              onChange={(value) => handleInputChange('sessionDate', value)}
              type="date"
            />
            <View style={{ marginVertical: 8 }}>
              <ReusableCheckbox
                label="Activate Pre-Feedback Form"
                isChecked={isCheckboxChecked}
                onChange={handleCheckboxChange} // Pass the function to update state
              />
            </View>
            <RoundedButton
              text="Save"
              onPress={() => navigation.navigate('AdminMenu')}
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

export default EditQuiz;
