import React, { useContext, useState } from 'react';
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
import BgGroup from '@assets/icons/bg-group.svg';
import EmpGroup from '@assets/icons/employee-group.svg';

const CreateTrackerRemovalRequest = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    regNumber: '',
    caseType: '',
    description: '',
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
      title="Tracker Removal Request"
      layoutBgColor={getThemeColor('primary')}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <View style={styles.formContainer}>
            <InputField
              type="dropdown"
              placeholder="Registration Number"
              value={formData.regNumber}
              onChange={(value) => handleInputChange('regNumber', value)}
              options={[
                { label: 'BTY', value: '0326' },
                { label: 'BYP', value: '0235' },
                { label: 'PYI', value: '0638' },
                { label: 'ZOP', value: '0538' },
                { label: 'PLK', value: '0736' },
              ]}
            />
            <InputField
              type="dropdown"
              placeholder="Case Type"
              value={formData.caseType}
              onChange={(value) => handleInputChange('caseType', value)}
              options={[
                { label: 'Removal', value: 'Removal' },
                { label: 'Transfer', value: 'Transfer' },
                { label: 'Checkup', value: 'Checkup' },
              ]}
            />
            <InputField
              icon={EmpId}
              placeholder="Case Description"
              value={formData.empID}
              onChange={(value) => handleInputChange('empID', value)}
              type="textarea"
            />
            <RoundedButton
              text={'Initiate Request'}
              onPress={() => navigation.navigate('GSMMenu')}
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

export default CreateTrackerRemovalRequest;
