import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import Card from '@components/Card';
import LayoutCard from '@components/LayoutCard';
import { ThemeContext } from '@context/ThemeContext';
import Car from '@assets/images/car.svg';
import Entypo from '@expo/vector-icons/Entypo';
import FluentQuizIcon from '@assets/icons/fluent_quiz-new-regular.svg';
import OuiTrainingIcon from '@assets/icons/oui_training.svg';
import FluentMDIcon from '@assets/icons/fluent-mdl2_completed.svg';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetail,
  getDashboardCounters,
} from '@redux/actions/userActions';

const Dashboard = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { userDetail, dashboardCounters, loading, error } = useSelector(
    (state) => state.user,
  );

  // Separate local loading states for each API
  const [isUserDetailLoading, setIsUserDetailLoading] = useState(true);
  const [isDashboardCountersLoading, setIsDashboardCountersLoading] =
    useState(true);
  // Combined loading state
  const isDataLoading = isUserDetailLoading || isDashboardCountersLoading;

  const userInfo = userDetail?.UserInfo?.[0] || {};
  const { DashBoardCount = [] } = dashboardCounters || {}; // Destructure the API response

  // Load user detail data
  useEffect(() => {
    setIsUserDetailLoading(true);
    dispatch(getUserDetail()).finally(() => setIsUserDetailLoading(false));
  }, [dispatch]);

  // Load dashboard counters data
  useEffect(() => {
    setIsDashboardCountersLoading(true);
    dispatch(getDashboardCounters()).finally(() =>
      setIsDashboardCountersLoading(false),
    );
  }, [dispatch]);

  // Helper function to get the counter value by CountName
  const getCountValue = (countName) => {
    const counter = DashBoardCount.find((item) => item.CountName === countName);
    return counter ? counter.CounterValue : '0'; // Default to '0' if not found
  };

  const carDetails = [
    { title: 'Car', value: `${userInfo.VIMake} ${userInfo.VIModel}` }, // Correctly combines VIMake and VIModel
    { title: 'Color', value: `${userInfo.Color}` },
    { title: 'Driving License', value: `${userInfo.DrivingLicense}` },
    { title: 'License Expiry', value: `${userInfo.DrivingLicenseExp}` },
    { title: 'Region', value: `${userInfo.RegionName}` },
    { title: 'Last DDC Result', value: `${userInfo.LastDDCResult}` },
  ];

  const userDetails = [
    { title: 'Name', value: `${userInfo.UserName}` },
    { title: 'Email', value: `${userInfo.Email}` },
    { title: 'Employee ID', value: `${userInfo.EmployeeId}` },
    { title: 'Driving License', value: `${userInfo.DrivingLicense}` },
    { title: 'DDC Date', value: `${userInfo.ddcDate}` },
    { title: 'DDC Refresher', value: `${userInfo.ddcRefresher}` },
    { title: 'Region', value: `${userInfo.RegionName}` },
    { title: 'Business Group', value: `${userInfo.businessgroup}` },
  ];

  const quizData = [
    {
      Icon: FluentQuizIcon,
      count: getCountValue('ActiveSession'),
      content: 'Active Quiz\nSessions',
      screen: 'UserActiveQuizSession',
    },
    {
      Icon: OuiTrainingIcon,
      count: getCountValue('ActiveTrainingSessions'),
      content: 'Active Training\nSessions',
    },
    {
      Icon: FluentMDIcon,
      count: getCountValue('ScoresCount'),
      content: 'Sessions\nPerformed',
      screen: 'UserPastQuizSession',
    },
  ];

  if (isDataLoading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  if (error) {
    Alert.alert('Error', error);
    return null; // Or handle the error in a different way
  }

  return (
    <Layout
      type="innerScreen"
      title={user.username}
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Welcome to Pasban</Text>
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flex: 1,
              rowGap: 15,
              paddingHorizontal: 28,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Card marginBottom={0}>
              <View style={styles.col}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}
                >
                  {userInfo.regno}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#787878',
                    fontWeight: 'bold',
                    marginBottom: 3,
                  }}
                >
                  {userInfo.kmsdriven} km
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#787878',
                    fontWeight: 'bold',
                  }}
                >
                  {userInfo.VIMake} {userInfo.VIModel}
                </Text>
                <View style={styles.location}>
                  <Entypo name="location-pin" size={16} color="white" />
                </View>
              </View>
              <View style={styles.car}>
                <Car />
              </View>
              <View style={styles.listCol}>
                <Text style={styles.listTitle}>Car Details</Text>
                {carDetails.map((detail, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.rowLTitle}>{detail.title}</Text>
                    <Text style={styles.rowRTitle}>{detail.value}</Text>
                  </View>
                ))}
              </View>
            </Card>
            <View style={styles.quizRow}>
              {quizData.map((quiz, index) => {
                const IconComponent = quiz.Icon;
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.quizCard}
                    onPress={() => {
                      navigation.navigate(quiz.screen);
                    }}
                  >
                    <IconComponent />
                    <Text style={styles.quizCount}>{quiz.count}</Text>
                    <Text style={styles.quizContent}>{quiz.content}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Card>
              <View style={styles.listCol}>
                <Text style={styles.listTitle}>User Details</Text>
                {userDetails.map((detail, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.rowLTitle}>{detail.title}</Text>
                    <Text style={styles.rowRTitle}>{detail.value}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingTop: 12,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    paddingBottom: 5,
    marginBottom: 8,
  },
  quizRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    columnGap: 8,
  },
  quizCard: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'center',
    flex: 1,
  },
  quizCount: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  quizContent: {
    textAlign: 'center',
    color: '#787878',
    fontSize: 12,
  },
  listCol: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  car: {
    alignItems: 'center',
  },
  location: {
    backgroundColor: '#006EDA',
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  listTitle: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
    paddingBottom: 5,
    marginBottom: 8,
  },
  rowLTitle: {
    fontSize: 12,
    color: '#000000',
  },
  rowRTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Dashboard;
