import React, { useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import InputField from '@components/InputField';
import CustomSwitch from '@components/CustomSwitch';

const switchGroups = [
  {
    headerSwitchTitle: 'Quiz',
    switches: [
      { id: 'create', label: 'Create' },
      { id: 'manage', label: 'Manage' },
    ],
  },
  {
    headerSwitchTitle: 'Sessions',
    switches: [
      { id: 'create', label: 'Create' },
      { id: 'manage', label: 'Manage' },
      { id: 'inviteUsers', label: 'Invite Users' },
      { id: 'sessionReport', label: 'Session Report' },
      { id: 'feedbackReport', label: 'Feedback Report' },
    ],
  },
  {
    headerSwitchTitle: 'Training',
    switches: [
      { id: 'manageTraining', label: 'Manage Training' },
      { id: 'materials', label: 'Materials' },
      { id: 'addMaterial', label: 'Add Material' },
      { id: 'manualHSETraining', label: 'Manual HSE Training' },
    ],
  },
  {
    headerSwitchTitle: 'Feedback',
    switches: [
      { id: 'preFeedbackQuestions', label: 'Pre-Feedback\nQuestions' },
      { id: 'postFeedbackQuestions', label: 'Post-Feedback\nQuestions' },
    ],
  },
  {
    headerSwitchTitle: 'User Activity',
    switches: [
      { id: 'userProfiling', label: 'User Profiling' },
      { id: 'manageUser', label: 'Manage User' },
      { id: 'currentStatus', label: 'Current Status' },
      { id: 'addDD', label: 'Add DNII/DII' },
    ],
  },
  {
    headerSwitchTitle: 'Violation System',
    switches: [
      { id: 'blackPoints', label: 'Black Points' },
      { id: 'speedViolation', label: 'Speed Violation' },
      { id: 'violations', label: 'Violations' },
      { id: 'drivingObservation', label: 'Driving Observation' },
    ],
  },
  {
    headerSwitchTitle: 'Vehicle Management',
    switches: [
      { id: 'transferVehicle', label: 'Transfer Vehicle' },
      { id: 'lto', label: 'LTO' },
      { id: 'cancelledLTO', label: 'Cancelled LTO' },
      { id: 'masterVehicleData', label: 'Master Veh Data' },
      { id: 'parkedCar', label: 'Parked Car' },
      { id: 'terminatedVehicleData', label: 'Terminated Veh Data' },
      { id: 'trackerRemoval', label: 'Tracker Removal' },
      { id: 'authorityLetter', label: 'Authority Letter' },
      { id: 'trackerInstallation', label: 'Tracker Installation' },
    ],
  },
  {
    headerSwitchTitle: 'Reports',
    switches: [
      { id: 'fenceInOutReport', label: 'Fence In/Out Report' },
      { id: 'idlingReport', label: 'Idling Report' },
      { id: 'lastPositionReport', label: 'Last Position Report' },
      { id: 'lateNightExitReport', label: 'Late Night Exit Report' },
      { id: 'movementReport', label: 'Movement Report' },
      { id: 'speedReport', label: 'Speed Report' },
      { id: 'tripReport', label: 'Trip Report' },
      { id: 'marketVisitReport', label: 'Market Visit Report' },
      { id: 'seatbeltMonitoringReport', label: 'SeatBelt\nMonitoring Report' },
      { id: 'tripDurationSummary', label: 'Trip Duration\nSummary' },
      { id: 'eventReport', label: 'Event Report' },
      { id: 'vehicleObservation', label: 'Vehicle Observation' },
      { id: 'monthlyMileageReport', label: 'Monthly\nMileage Report' },
      {
        id: 'mileageAccumulationReport',
        label: 'Mileage\nAccumulation Report',
      },
    ],
  },
  {
    headerSwitchTitle: 'Profile Management',
    switches: [{ id: 'manageProfiles', label: 'Manage Profiles' }],
  },
  {
    headerSwitchTitle: 'Sessions/Quiz',
    switches: [
      { id: 'quizSessions', label: 'Quiz Sessions' },
      { id: 'trainingMaterialsSession', label: 'Training\nMaterials Session' },
    ],
  },
];

const AdminManagement = () => {
  const route = useRoute();
  const { reportTitle } = route.params;
  const { getThemeColor } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    switches: {
      create: false,
      manage: false,
      manage: false,
    },
  });

  const toggleSwitch = (switchId) => {
    setFormData((prevData) => ({
      ...prevData,
      switches: {
        ...prevData.switches,
        [switchId]: !prevData.switches[switchId],
      },
    }));
  };

  return (
    <Layout
      type="innerScreen"
      title={`${reportTitle} Management`}
      layoutBgColor={getThemeColor('primary')}
    >
      <LayoutCard style={{ paddingHorizontal: 28, marginTop: 30 }}>
        <View style={styles.container}>
          {/* Map over switch groups */}
          {switchGroups.map((group, index) => (
            <View key={index} style={styles.headerSwitchContainer}>
              <Text style={styles.headerSwitchTitle}>
                {group.headerSwitchTitle}
              </Text>
              <View style={styles.row}>
                {/* Map over the switches for each group */}
                {group.switches.map((item) => (
                  <View key={item.id} style={styles.headerSwitchRow}>
                    <Text style={styles.headerSwitchRowTitle}>
                      {item.label}
                    </Text>
                    <CustomSwitch
                      isOn={formData.switches[item.id]}
                      onToggle={() => toggleSwitch(item.id)}
                      activeColor="#006EDA"
                      inactiveColor="#D6D6D6"
                      width={48}
                      height={25}
                      ballSize={20}
                      switchStyle={{
                        transform: [{ scaleX: 1 }, { scaleY: 1 }],
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </LayoutCard>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 0,
    rowGap: 30,
  },
  headerSwitchContainer: {
    width: '100%',
    flexDirection: 'column',
    rowGap: 12,
  },
  headerSwitchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#8D8F93',
    paddingBottom: 7,
  },
  headerSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '45%',
  },
  headerSwitchRowTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 25,
    rowGap: 20,
    justifyContent: 'space-between',
  },
});

export default AdminManagement;
