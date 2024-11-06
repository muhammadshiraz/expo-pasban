import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Layout from '@components/Layout';
import ViolationFilters from '@components/ViolationFilters';
import ProgressCircle from '@components/ProgressCircle';
import ProgressRectangle from '@components/ProgressRectangle';
import { ThemeContext } from '@context/ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeadingComponent from '@components/HeadingComponent';
import DownloadButtons from '@components/DownloadButtons';
import Card from '@components/Card';
import LayoutCard from '@components/LayoutCard';
import CountCard from '@components/CountCard';
import BarChartComponent from '@components/BarChart';
import InputField from '@components/InputField';
import ReusableModal from '@components/ReusableModal';
import UitCalender from '@assets/icons/uit_calender.svg';
import Search from '@assets/icons/search.svg';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import SolarUser from '@assets/icons/solar_user-bold.svg';
import {
  getFleetReport,
  getViolationsDayWiseReport,
} from '@redux/actions/fleetActions';
import {
  getViolationsRightNow,
  getTopFiveDrivers,
  getTopFiveTravelers,
} from '@redux/actions/reportActions';
import { getDocumentsStatus } from '@redux/actions/ltoActions';

const Dashboard = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { userId, roleId } = user || {};

  // Convert userId and roleId to integers
  const intUserId = parseInt(userId);
  const intRoleId = parseInt(roleId);

  const {
    report,
    violationVehReport,
    violationDayReport,
    violationTimeReport,
    speedViolationsReport,
    loading: fleetLoading,
    error: fleetError,
  } = useSelector((state) => state.fleet);

  const {
    violationsRightNow,
    topFiveDrivers,
    topFiveTravelers,
    loading: reportLoading,
    error: reportError,
  } = useSelector((state) => state.report);

  const {
    documentsStatus,
    loading: documentsLoading,
    error: documentsError,
  } = useSelector((state) => state.lto);

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

  // Move the calculation of start and end date range into a separate function
  const calculateDateRange = () => {
    const today = new Date();
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
      endOfRange = new Date(
        lastMonthYear,
        lastMonth,
        getLastDateOfCurrentMonth().getDate(),
      );
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

    return { startOfRange, endOfRange };
  };

  // UseEffect to calculate the initial date range and set it to formData on initial load
  useEffect(() => {
    const { startOfRange, endOfRange } = calculateDateRange();
    setFormData((prevData) => ({
      ...prevData,
      dateFrom: moment(startOfRange).format('YYYY-MM-DDT00:00:00.000Z'),
      dateTo: moment(endOfRange).format('YYYY-MM-DDT23:59:59.000Z'),
    }));

    // Fetch initial data based on calculated date range
    fetchData(startOfRange, endOfRange);
  }, []); // This effect runs only once on mount

  // Function to fetch data based on date range
  const fetchData = (startRange, endRange) => {
    const startDate = moment(startRange)
      .startOf('day')
      .format('YYYY-MM-DDT00:00:00.000Z');
    const endDate = moment(endRange)
      .endOf('day')
      .format('YYYY-MM-DDT23:59:59.000Z');

    // Ensure regionName and businessGroupName are empty strings if not provided
    const regionName = formData.regionName || '';
    const businessGroupName = formData.businessGroupName || '';

    dispatch(
      getViolationsDayWiseReport(
        startDate,
        endDate,
        regionName,
        businessGroupName,
      ),
    );
  };

  // Function to handle search and trigger API calls
  const handleSearch = async () => {
    setIsSwitchOn(false);
    const startDate = moment(formData.dateFrom)
      .startOf('day')
      .format('YYYY-MM-DD');
    const endDate = moment(formData.dateTo).endOf('day').format('YYYY-MM-DD');

    // Ensure regionName and businessGroupName are empty strings if not provided
    const regionName = formData.regionName || '';
    const businessGroupName = formData.businessGroupName || '';

    if (userId && roleId) {
      const loginID = (formData.loginDetailID = 'PR-00210032');
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName || '',
          formData.regionName || '',
          intUserId,
          intRoleId,
        ),
      );
      dispatch(getViolationsRightNow(intUserId, intRoleId));
      dispatch(getTopFiveDrivers(intUserId, intRoleId));
      dispatch(getTopFiveTravelers(userId, roleId, startDate, endDate));

      dispatch(getDocumentsStatus(userId, roleId));
    }

    if (startDate && endDate) {
      // Check if regionName or businessGroupName is empty
      if (!regionName || !businessGroupName) {
        // Dispatch actions with 0 for the respective reports

        dispatch(
          getViolationsDayWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        );
        return; // Exit the function early
      }

      // Fetching violation reports with error handling
      Promise.all([
        dispatch(
          getViolationsDayWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        ),
      ]);
    } else {
      console.log('Date range is not valid. Please select a date range.');
    }
  };

  const [formData, setFormData] = useState({
    // dateFrom: '2024-09-29T19:00:00.000Z',
    // dateTo: '2024-10-29T19:00:00.000Z',
    dateFrom: '',
    dateTo: '',
    businessGroupName: '',
    regionName: '',
  });

  useEffect(() => {
    const { startOfRange, endOfRange } = calculateDateRange();
    setFormData((prevData) => ({
      ...prevData,
      dateFrom: moment(startOfRange).format('YYYY-MM-DDT00:00:00.000Z'),
      dateTo: moment(endOfRange).format('YYYY-MM-DDT23:59:59.000Z'),
    }));

    if (userId && roleId) {
      const loginID = (formData.loginDetailID = 'PR-00210032');
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName || '',
          formData.regionName || '',
          intUserId,
          intRoleId,
        ),
      );
      dispatch(getViolationsRightNow(intUserId, intRoleId));
      dispatch(getTopFiveDrivers(intUserId, intRoleId));
      dispatch(getTopFiveTravelers(userId, roleId, startOfRange, endOfRange));
      dispatch(getDocumentsStatus(userId, roleId));
    }
    dispatch(
      getViolationsDayWiseReport(
        startOfRange,
        endOfRange,
        formData.businessGroupName,
        formData.regionName,
      ),
    );
  }, [dispatch, userId, roleId]);

  const {
    Table: documentsStatusTable = [],
    Table1: documentsStatusTable1 = [],
    Table2: documentsStatusTable2 = [],
    Table3: documentsStatusTable3 = [],
    Table4: documentsStatusTable4 = [],
    Table5: documentsStatusTable5 = [],
  } = documentsStatus || {};

  const {
    Responding = [],
    NotResponding = [],
    Stopped = [],
    Moving = [],
  } = report || {};

  const combinedFleetLength = Responding.length;

  const filteredResponding = Responding.filter(
    (item) => !NotResponding.some((veh) => item.FFID === veh.FFID),
  );

  // Calculate the lengths after filtering
  const respondingLength = filteredResponding.length;

  const handleClick = (index) => {
    setIsModalVisible(true);
    setSelectedContent(index);
  };

  const handleUserClick = (userData) => {
    if (
      userData &&
      (userData.Driver_Seat_Belt > 0 ||
        userData.Passenger_Seat_Belt > 0 ||
        userData.Fatigue_Alert > 0 ||
        userData.Rest_Time_Violation > 0 ||
        userData.Night_Exit > 0 ||
        userData.Speed_Violation > 0)
    ) {
      setSelectedUser(userData);
      setSelectedContent(3); // Set selected user data from topFiveDrivers
      setIsModalVisible(true); // Show modal to display user violations
    } else {
      setIsModalVisible(false); // Ensure modal is closed if no data
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const progressCirclesData = [
    {
      id: '1',
      icon: 'car-multiple',
      progress: combinedFleetLength,
      maxProgress: combinedFleetLength,
      progressText: 'Regional Fleet',
      color: '#FF9F40',
    },
    {
      id: '2',
      icon: 'car',
      progress: respondingLength,
      maxProgress: respondingLength,
      progressText: 'Active Vehicles',
      color: '#4BC0C0',
    },
    {
      id: '3',
      icon: 'car-off',
      progress: NotResponding.length,
      maxProgress: NotResponding.length,
      progressText: 'Not Responding',
      color: '#FF0036',
    },
    {
      id: '4',
      icon: 'car-side',
      progress: Moving.length,
      maxProgress: Moving.length,
      progressText: 'Moving Vehicles',
      color: '#1E90FF',
      gradientColors: ['#1E90FF', '#cccccc'], // Dodger Blue gradient
    },
    {
      id: '5',
      icon: 'stop-circle-outline',
      progress: Stopped.length,
      maxProgress: Stopped.length,
      progressText: 'Stopped Vehicles',
      color: '#F8C855',
      gradientColors: ['#F8C855', '#cccccc'], // Yellow to Orange gradient
    },
  ];

  const files = [
    {
      name: '',
      url: '',
      iconName: 'exclamation',
    },
    // {
    //   name: 'sample.xlsx',
    //   url: 'https://www.example.com/sample.xlsx',
    //   iconName: 'excel',
    // },
  ];

  const exclBtn = [
    {
      name: '',
      url: '',
      iconName: 'exclamation',
    },
  ];

  const btDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'exclamation',
    },
  ];

  const maxProgress = Math.max(
    ...progressCirclesData.map((item) => item.progress),
  );

  const renderProgressCircle = ({ item }) => (
    <View
      style={[styles.itemContainer, { alignItems: 'flex-start' }]}
      key={item.id}
    >
      <ProgressCircle
        size={75}
        strokeWidth={3}
        progress={item.progress}
        maxProgress={maxProgress}
        progressText={item.progressText}
        color={item.color}
        backgroundColor="#ecf0f1"
        icon={
          <MaterialCommunityIcons
            name={item.icon}
            size={18}
            color={getThemeColor('background')}
          />
        }
      />
    </View>
  );

  const renderProgressRectangle = ({ item }) => (
    <View
      style={[styles.itemContainer, { alignItems: 'center' }]}
      key={item.id}
    >
      <ProgressRectangle
        size={75}
        strokeWidth={3}
        progress={item.progress}
        maxProgress={maxProgress}
        progressText={item.progressText}
        gradientColors={item.color}
        backgroundColor="#ecf0f1"
        icon={
          <MaterialCommunityIcons
            name={item.icon}
            size={18}
            color={getThemeColor('background')}
          />
        }
      />
    </View>
  );

  const toggleSwitch = () => {
    setIsSwitchOn((prev) => {
      const newState = !prev;
      return newState;
    });
  };

  // Create an array of 5 boxes
  const countTVCardData = Array.from({ length: 5 }, (_, index) => {
    const driver =
      topFiveDrivers && topFiveDrivers[index] ? topFiveDrivers[index] : null;

    // Calculate the count based on the length of the DriverName
    const count = driver
      ? driver.Total_Violation // Add 3 if DriverName length > 8
      : 0; // Default to 0 if no driver data

    // Format the DriverName with ellipsis if it's longer than 8 characters
    const formattedDriverName =
      driver && driver.DriverName.length > 14
        ? driver.DriverName.slice(0, 12) + '...' // Add ellipsis if longer than 8 characters
        : driver
        ? driver.DriverName
        : `Not Available`; // Use DriverName or a default label

    return {
      count: count, // Count now includes the adjustment
      label: formattedDriverName, // Use formatted name with ellipsis
      nameLength: driver ? driver.DriverName.length : 0, // Get the length of the DriverName or 0 if not available
      driverData: driver,
    };
  });

  const countTBCardData = Array.from({ length: 5 }, (_, index) => {
    const travelers =
      topFiveTravelers && topFiveTravelers[index]
        ? topFiveTravelers[index]
        : null;

    // Calculate the count based on the length of the TravelersName
    const count = travelers
      ? Math.floor(travelers.TotalMileageInKM) // Skip the decimal part
      : 0; // Default to 0 if no travelers data

    // Format the TravelersName with ellipsis if it's longer than 8 characters
    const formattedTravelersName =
      travelers && travelers.DriverName.length > 14
        ? travelers.DriverName.slice(0, 8) + '...' // Add ellipsis if longer than 8 characters
        : travelers
        ? travelers.DriverName
        : `Not Available`; // Use TravelersName or a default label

    return {
      count: count, // Count now includes the adjustment
      label: formattedTravelersName, // Use formatted name with ellipsis
      nameLength: travelers ? travelers.DriverName.length : 0, // Get the length of the TravelersName or 0 if not available
      travelersData: travelers,
    };
  });

  const countMgrCardData = [
    { count: documentsStatusTable.length, label: 'Driving\nLicense Exp' },
    { count: documentsStatusTable1.length, label: 'Driving License\nExp Soon' },
    { count: documentsStatusTable2.length, label: 'DDC\nExp Soon' },
  ];

  const countDvrCardData = [
    { count: documentsStatusTable3.length, label: 'Driving\nLicense Exp' },
    { count: documentsStatusTable4.length, label: 'Driving License\nExp Soon' },
    { count: documentsStatusTable5.length, label: 'DDC\nExp Soon' },
  ];

  //Total violations by day
  const violationsByDay = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  violationDayReport.forEach((violation) => {
    violationsByDay[violation.Violation_Day] += violation.Total_Violations || 0;
  });

  const chartDayData = [
    violationsByDay.Monday,
    violationsByDay.Tuesday,
    violationsByDay.Wednesday,
    violationsByDay.Thursday,
    violationsByDay.Friday,
    violationsByDay.Saturday,
    violationsByDay.Sunday,
  ];

  if (fleetLoading && reportLoading && documentsLoading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <Layout
      type="innerScreen"
      title="Dashboard"
      dateFrom={formData.dateFrom}
      dateTo={formData.dateTo}
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <ViolationFilters
            isSwitchOn={isSwitchOn}
            toggleSwitch={toggleSwitch}
          />
          {/* Conditionally Render Filter Content */}
          {isSwitchOn && (
            <View style={[styles.filterContent]}>
              <Text style={styles.filterTitle}>
                Choose Dates for Violations Analysis:
              </Text>
              <View style={styles.filterContentRow}>
                <InputField
                  placeholder="2024-05-17"
                  value={formData.dateFrom}
                  onChange={(value) => handleInputChange('dateFrom', value)}
                  type="date"
                  icon={UitCalender}
                  mainStyle={{ flex: 1 }}
                  style={styles.inputField}
                />
                <InputField
                  placeholder="2024-05-31"
                  value={formData.dateTo}
                  onChange={(value) => handleInputChange('dateTo', value)}
                  type="date"
                  icon={UitCalender}
                  mainStyle={{ flex: 1 }}
                  style={styles.inputField}
                />
                <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={handleSearch}
                >
                  <Search />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <LayoutCard
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.boxesContainer}>
            {progressCirclesData
              .slice(0, 3)
              .map((item, index) => renderProgressCircle({ item, index }))}
          </View>
          <View style={styles.fullBoxesContainer}>
            {progressCirclesData
              .slice(3, 5)
              .map((item, index) => renderProgressRectangle({ item, index }))}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <DownloadButtons
              files={exclBtn}
              onOpenModal={() => handleClick(0)}
            />
          </View>
          <TouchableOpacity
            style={styles.violationBarContainer}
            onPress={() => handleClick(1)}
          >
            <View style={styles.violationContent}>
              <Text style={styles.violationText}>On Violation Right Now</Text>
            </View>
            <View style={styles.violationCountBox}>
              <Text style={styles.violationCount}>
                {violationsRightNow.length || 0}
              </Text>
            </View>
          </TouchableOpacity>
          {/* Top 5 High Risk Drivers Break Down */}
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <HeadingComponent
                style={{ textAlign: 'center' }}
                size="h6"
                color={getThemeColor('h1')}
              >
                Top 5 High Risk Drivers Break Down
              </HeadingComponent>
              <DownloadButtons
                files={files}
                onOpenModal={() => handleClick(2)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                columnGap: 16,
                flexWrap: 'wrap', // Allow wrapping
              }}
            >
              {countTVCardData.map((data, index) => {
                const itemsInLastRow = countTVCardData.length % 3 || 3; // Number of items in the last row, fallback to 3 if no remainder
                const isLastRow =
                  index >= countTVCardData.length - itemsInLastRow; // Check if current item is in the last row
                const isLastCardAlone = isLastRow && itemsInLastRow === 1; // Check if the last row has only 1 item
                const isTwoInLastRow = isLastRow && itemsInLastRow === 2; // Check if the last row has 2 items

                return (
                  <Pressable
                    onPress={() => handleUserClick(data.driverData)}
                    key={index}
                    style={{
                      flexBasis: isLastCardAlone
                        ? '100%' // If only 1 item, take up full width
                        : isTwoInLastRow
                        ? '30%' // If 2 items, each take 45% width
                        : '30%', // If 3 items, each takes 30% width
                      marginBottom: 12, // Spacing between rows
                      alignItems: 'center', // Always center items horizontally
                    }}
                  >
                    <View
                      style={{
                        width: 105,
                        justifyContent:
                          isLastCardAlone || isTwoInLastRow
                            ? 'center'
                            : 'space-between', // If 2 items, center them; if 3, use space-between
                      }}
                    >
                      <CountCard count={data.count} label={data.label} />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          {/* Top 5 Travelers Break Down */}
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <HeadingComponent
                style={{ textAlign: 'center' }}
                size="h6"
                color={getThemeColor('h1')}
              >
                Top 5 Travelers Break Down
              </HeadingComponent>
              {/* <DownloadButtons
                files={files}
                onOpenModal={() => handleClick(3)}
              /> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                columnGap: 16,
                flexWrap: 'wrap', // Allow wrapping
              }}
            >
              {countTBCardData.map((data, index) => {
                const itemsInLastRow = countTBCardData.length % 3 || 3; // Number of items in the last row, fallback to 3 if no remainder
                const isLastRow =
                  index >= countTBCardData.length - itemsInLastRow; // Check if current item is in the last row
                const isLastCardAlone = isLastRow && itemsInLastRow === 1; // Check if the last row has only 1 item
                const isTwoInLastRow = isLastRow && itemsInLastRow === 2; // Check if the last row has 2 items

                return (
                  <View
                    key={index}
                    style={{
                      flexBasis: isLastCardAlone
                        ? '100%' // If only 1 item, take up full width
                        : isTwoInLastRow
                        ? '30%' // If 2 items, each take 45% width
                        : '30%', // If 3 items, each takes 30% width
                      marginBottom: 12, // Spacing between rows
                      alignItems: 'center', // Always center items horizontally
                    }}
                  >
                    <View
                      style={{
                        width: 105,
                        justifyContent:
                          isLastCardAlone || isTwoInLastRow
                            ? 'center'
                            : 'space-between', // If 2 items, center them; if 3, use space-between
                      }}
                    >
                      <CountCard
                        showKM={
                          <Text style={{ fontSize: 12, marginLeft: 3 }}>
                            Km
                          </Text>
                        }
                        count={data.count}
                        label={data.label}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* Most Busiest Day of The Month */}
          <View style={styles.htContainer}>
            <View style={styles.htHeader}>
              <HeadingComponent
                style={{ textAlign: 'center' }}
                size="h6"
                color={getThemeColor('h1')}
              >
                Most Busiest Day of The Month
              </HeadingComponent>
              {/* <DownloadButtons files={btDownload} /> */}
            </View>
            <Card>
              <SafeAreaView style={{ flex: 1 }}>
                <BarChartComponent
                  xleft={48}
                  xright={25}
                  data={chartDayData} // Added values for Sat and Sun
                  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                />
              </SafeAreaView>
            </Card>
          </View>
          {/* Documents Expired / Expiring Soon */}
          <View style={{ paddingHorizontal: 1 }}>
            <Card>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Documents Expired / Expiring Soon
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  paddingVertical: 8,
                  marginBottom: 12,
                  borderBottomWidth: 1,
                  borderColor: '#DBDBDB',
                }}
              >
                Managers
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap', // Allow wrapping
                }}
              >
                {countMgrCardData.map((data, index) => {
                  const isLastRow =
                    index >=
                    countMgrCardData.length - (countMgrCardData.length % 3);
                  const isLastCardAlone =
                    isLastRow && countMgrCardData.length % 3 === 1;

                  return (
                    <View
                      key={index}
                      style={{
                        flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                        marginBottom: 12, // Spacing between rows
                        alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                      }}
                    >
                      <View style={{ width: '100%', height: 80 }}>
                        <CountCard count={data.count} label={data.label} />
                      </View>
                    </View>
                  );
                })}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  paddingVertical: 8,
                  marginBottom: 12,
                  borderBottomWidth: 1,
                  borderColor: '#DBDBDB',
                }}
              >
                Drivers
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap', // Allow wrapping
                }}
              >
                {countDvrCardData.map((data, index) => {
                  const isLastRow =
                    index >=
                    countDvrCardData.length - (countDvrCardData.length % 3);
                  const isLastCardAlone =
                    isLastRow && countDvrCardData.length % 3 === 1;

                  return (
                    <View
                      key={index}
                      style={{
                        maxWidth: 110,
                        flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                        marginBottom: 12, // Spacing between rows
                        alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                      }}
                    >
                      <View style={{ width: '100%', height: 80 }}>
                        <CountCard count={data.count} label={data.label} />
                      </View>
                    </View>
                  );
                })}
              </View>
            </Card>
          </View>
        </LayoutCard>
        {/* Modal Integration */}
        <ReusableModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          padding={0}
          showCloseButton={false}
          showTitle={false}
          content={
            <View style={[styles.modalContent]}>
              {selectedContent !== null && (
                <>
                  {selectedContent === 0 && (
                    <View style={styles.col}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 12,
                          paddingHorizontal: 25,
                        }}
                      >
                        Drivers who are not wearing a seat belt right now.
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          borderTopWidth: 1,
                          borderTopColor: '#D9D9D9',
                        }}
                        onPress={() => setIsModalVisible(false)}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            paddingTop: 12,
                            fontSize: 14,
                            color: '#006EDA',
                            fontWeight: 'bold',
                          }}
                        >
                          Ok
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {selectedContent === 1 && (
                    <View style={styles.col}>
                      <View
                        style={[
                          styles.row,
                          {
                            justifyContent: 'space-between',
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingTop: 8,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          Driver
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          Reg #
                        </Text>
                      </View>
                      {violationsRightNow.map((item) => (
                        <View
                          key={item.sNo}
                          style={[
                            styles.row,
                            {
                              justifyContent: 'space-between',
                              width: '100%',
                              paddingHorizontal: 20,
                              paddingVertical: 8,
                            },
                          ]}
                        >
                          <Text
                            style={{
                              textAlign: 'center',
                              color: '#686565',
                            }}
                          >
                            {item.DriverName}
                          </Text>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: '#686565',
                            }}
                          >
                            {item.RegNo}
                          </Text>
                        </View>
                      ))}
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          borderTopWidth: 1,
                          borderTopColor: '#D9D9D9',
                        }}
                        onPress={() => setIsModalVisible(false)}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            paddingTop: 12,
                            fontSize: 14,
                            color: '#006EDA',
                            fontWeight: 'bold',
                          }}
                        >
                          Ok
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {selectedContent === 2 && (
                    <View style={styles.col}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingVertical: 12,
                          paddingHorizontal: 25,
                        }}
                      >
                        High-risk drivers are identified based on the number of
                        violations they have committed in their region.
                      </Text>
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          borderTopWidth: 1,
                          borderTopColor: '#D9D9D9',
                        }}
                        onPress={() => setIsModalVisible(false)}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            paddingTop: 12,
                            fontSize: 14,
                            color: '#006EDA',
                            fontWeight: 'bold',
                          }}
                        >
                          Ok
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {selectedContent === 3 && selectedUser && (
                    <View style={[styles.col]}>
                      {/* Create an array of violations */}
                      {[
                        {
                          label: 'Driver Seat Belt',
                          count: selectedUser.Driver_Seat_Belt,
                        },
                        {
                          label: 'Passenger Seat Belt',
                          count: selectedUser.Passenger_Seat_Belt,
                        },
                        {
                          label: 'Fatigue Alert',
                          count: selectedUser.Fatigue_Alert,
                        },
                        {
                          label: 'Rest Time Violation',
                          count: selectedUser.Rest_Time_Violation,
                        },
                        {
                          label: 'Night Exit',
                          count: selectedUser.Night_Exit,
                        },
                        {
                          label: 'Speed Violation',
                          count: selectedUser.Speed_Violation,
                        },
                      ]
                        // Filter out violations with count 0
                        .filter((violation) => violation.count > 0)
                        .map((violation, index) => (
                          <View
                            key={index}
                            style={[
                              styles.col,
                              {
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                width: '100%',
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                              },
                            ]}
                          >
                            <View style={[styles.row, { columnGap: 8 }]}>
                              <SolarUser />
                              <Text
                                style={{
                                  textAlign: 'left',
                                  marginBottom: 12,
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}
                              >
                                {selectedUser.DriverName}{' '}
                                {/* Assuming DriverName is a property of selectedUser */}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.row,
                                {
                                  justifyContent: 'space-between',
                                  width: '100%',
                                },
                              ]}
                            >
                              <Text style={{ textAlign: 'center' }}>
                                {violation.label}
                              </Text>
                              <Text style={{ textAlign: 'center' }}>
                                {violation.count}
                              </Text>
                            </View>
                          </View>
                        ))}

                      {/* Ok button to close the modal */}
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          borderTopWidth: 1,
                          borderTopColor: '#D9D9D9',
                        }}
                        onPress={() => setIsModalVisible(false)} // Close modal
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            paddingTop: 12,
                            fontSize: 14,
                            color: '#006EDA',
                            fontWeight: 'bold',
                          }}
                        >
                          Ok
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          }
        />
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
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  violationBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  violationContent: {
    width: '70%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#006EDA',
    minHeight: 50,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  violationText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  violationCountBox: {
    backgroundColor: '#006EDA',
    borderColor: '#006EDA',
    borderWidth: 1,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    maxHeight: 50,
  },
  violationCount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  boxesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    columnGap: 32,
  },
  fullBoxesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    columnGap: 18,
    marginBottom: 5,
  },
  itemContainer: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  htContainer: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  htHeader: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  slickContainer: {
    height: 330,
  },
  wrapper: {
    height: '100%',
  },
  cardsContainer: {
    height: '100%',
  },
  filterContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: 100,
    maxHeight: 100,
    marginTop: 5,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  filterTitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600', // Updated to '600' to match 'semibold'
    marginBottom: 8,
  },
  filterContentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Added to space items equally
    alignItems: 'flex-start', // Center-align items vertically
    width: '100%',
    columnGap: 12, // Creates horizontal space between elements
    marginBottom: 12, // Regular rows have margin bottom
    paddingBottom: 5,
  },
  noBorder: {
    borderBottomWidth: 0, // Remove border from last row
  },
  noMarginPadding: {
    marginBottom: 0, // No margin for the last row
    paddingBottom: 0, // No padding at the bottom
  },
  inputField: {
    maxWidth: '100%', // Prevent the field from exceeding too much width
    width: '100%',
  },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006EDA',
    width: 34,
    height: 34,
    borderRadius: 100,
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  km: {
    fontSize: 12, // Smaller font size for KM
    marginLeft: 1,
    fontWeight: 500,
  },
});

export default Dashboard;
