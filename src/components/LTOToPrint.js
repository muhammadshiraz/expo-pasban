import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const LTOToPrint = ({ data }) => {
  return (
    <ScrollView contentContainerStyle={styles.printContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/uniliver.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>Unilever Pakistan Limited</Text>
        <Text style={styles.addressText}>Avari Plaza,</Text>
        <Text style={styles.addressText}>Fatima Jinnah Road,</Text>
        <Text style={styles.addressText}>Karachi - 75530</Text>
        <Text style={styles.contactText}>T: +92 - 21 - 35660062</Text>
        <Text style={styles.contactText}>F: +92 - 21 - 35681705</Text>
      </View>
      <View style={styles.ltoPdfMain}>
        <Text style={styles.enteredOnText}>{data.EnteredOn}</Text>
        <View style={styles.headings}>
          <Text style={styles.toWhomItMayConcern}>TO WHOM IT MAY CONCERN</Text>
          <Text style={styles.drivingAuthorityLetter}>
            Driving Authority Letter
          </Text>
        </View>
        <Text style={styles.certificationText}>
          This is to certify that Mr./Ms. {data.EmployeeName} employee I.D.{' '}
          {data.LocalId} is a bona fide employee of Unilever Pakistan Limited
          and he/she has officially been given Company Car {data.Make}, bearing
          Reg. No. {data.RegNo}, Chassis No. {data.ChassisNo}, Engine No.{' '}
          {data.EngineNo}. The above-named employee’s driver {data.DriverName} #
          {data.LicenseNo} is allowed to drive this car with a valid CNIC &
          driving license.
        </Text>
        <View style={styles.nonTransferable}>
          <Text style={styles.nonTransferableText}>
            This Letter is Non-Transferable
          </Text>
          <Text style={styles.validityText}>Valid up to {data.Validity}</Text>
        </View>
        <View style={styles.approvalSection}>
          <Text style={styles.approvalName}>{data.ApprovedByName}</Text>
          <Text style={styles.validityTextLine}>{data.Validity}</Text>
          <Text style={styles.approvalPosition}>{data.ApprovedByName}</Text>
          <Text style={styles.approvalPosition}>Assistant Manager</Text>
          <Text style={styles.approvalDepartment}>
            Workplace & Travel Services
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  printContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center', // Center content horizontally
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  logo: {
    width: 55,
    height: 62,
  },
  addressContainer: {
    width: '100%', // Take full width
    alignItems: 'flex-end',
  },
  addressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  contactText: {
    fontSize: 12,
    textAlign: 'right', // Align text to the right
  },
  ltoPdfMain: {
    marginTop: 20,
    width: '100%', // Take full width
  },
  enteredOnText: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
  headings: {
    marginBottom: 10,
    alignItems: 'center', // Center the headings
  },
  toWhomItMayConcern: {
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  drivingAuthorityLetter: {
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 3,
    textAlign: 'center', // Center the text
  },
  certificationText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'justify', // Justify the text for better readability
  },
  nonTransferable: {
    marginTop: 16,
    marginBottom: 10,
    textAlign: 'left',
  },
  nonTransferableText: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  validityText: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  validityTextLine: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 'normal',
  },
  approvalSection: {
    fontWeight: 'bold',
    fontSize: 12,
    alignItems: 'left',
    marginBottom: 8,
  },
  approvalName: {
    fontSize: 12,
    color: '#708090',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  approvalPosition: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  approvalDepartment: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

export default LTOToPrint;
