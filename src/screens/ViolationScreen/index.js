import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import AntDesign from '@expo/vector-icons/AntDesign';
import HeadingComponent from '@components/HeadingComponent';
import DownloadButtons from '@components/DownloadButtons';
import HorizontalTabs from '@components/HorizontalTabs';
import Card from '@components/Card';
import LayoutCard from '@components/LayoutCard';
import CountCard from '@components/CountCard';
import Slick from 'react-native-slick';
import ReusableCheckbox from '@components/ReusableCheckbox';
import BarChartComponent from '@components/BarChart';
import DriverRanking from '@components/Tables/DriverRanking';
import InputField from '@components/InputField';
import UitCalender from '@assets/icons/uit_calender.svg';
import Search from '@assets/icons/search.svg';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFleetReport,
  getViolationVehWiseReport,
  getViolationsDayWiseReport,
  getViolationsTimeWiseReport,
  getSpeedViolationsReport,
} from '@redux/actions/fleetActions';
import { getAllRegions, getAllBusinessGroup } from '@redux/actions/userActions';

const ViolationScreen = () => {
  const [rows, setRows] = useState([]);
  const { getThemeColor } = useContext(ThemeContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { userId, roleId } = user || {};
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
    regions,
    group,
    loading: userRoleLoading,
    error: userRoleError,
  } = useSelector((state) => state.user);

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

  useEffect(() => {
    dispatch(getAllRegions());
    dispatch(getAllBusinessGroup());
  }, [dispatch]);

  // Ensure regions is an array before mapping
  const regionOptions = Array.isArray(regions)
    ? [
        { label: 'All Region', value: '' },
        ...regions.map((region) => ({
          label: region.Name,
          value: region.Name,
        })),
      ]
    : [{ label: 'All Region', value: '' }];

  // Ensure group is an array before mapping
  const groupOptions = Array.isArray(group)
    ? [
        { label: 'All Business Group', value: '' },
        ...group
          .filter((g) =>
            ['General Trade', 'Ice Cream', 'Foods', 'Admin'].includes(
              g.BusinessGroup,
            ),
          )
          .map((group) => ({
            label: group.BusinessGroup,
            value: group.BusinessGroup,
          })),
      ]
    : [{ label: 'All Business Group', value: '' }];

  const [formData, setFormData] = useState({
    loginDetailID: 'PR-00210032',
    dateFrom: '',
    dateTo: '',
    regionName: '',
    businessGroupName: '',
  });

  // Break Down of Total Violations
  const violationCounts = {
    driverSeatBelt: 0,
    delayedDriverSeatBelt: 0,
    passengerSeatBelt: 0,
    delayedPassengerSeatBelt: 0,
    fatigueAlert: 0,
    nightExit: 0,
    speedViolation: 0,
    totalViolations: 0,
  };

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

  // Initialize the data array with zeros
  const violationsByTimeWindow = {
    '12am - 3am': 0,
    '3am - 6am': 0,
    '6am - 9am': 0,
    '9am - 12pm': 0,
    '12pm - 3pm': 0,
    '3pm - 6pm': 0,
    '6pm - 9pm': 0,
    '9pm - 12am': 0,
  };

  // Populate violationsByTimeWindow with TotalViolations from API response
  if (violationTimeReport) {
    violationTimeReport.forEach((violation) => {
      if (violationsByTimeWindow[violation.TimeWindow] !== undefined) {
        violationsByTimeWindow[violation.TimeWindow] =
          violation.TotalViolations || 0;
      }
    });
  }

  const chartTimeData = [
    violationsByTimeWindow['12am - 3am'],
    violationsByTimeWindow['3am - 6am'],
    violationsByTimeWindow['6am - 9am'],
    violationsByTimeWindow['9am - 12pm'],
    violationsByTimeWindow['12pm - 3pm'],
    violationsByTimeWindow['3pm - 6pm'],
    violationsByTimeWindow['6pm - 9pm'],
    violationsByTimeWindow['9pm - 12am'],
  ];

  useEffect(() => {
    if (userId && roleId) {
      const loginID = (formData.loginDetailID = 'PR-00210032');
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName || '',
          formData.regionName || '',
          userId,
          roleId,
        ),
      );
    }
  }, [dispatch, userId, roleId]);

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

    // Set loading to true before making API calls

    if (!regionName || !businessGroupName) {
      // Dispatch actions with 0 for the respective reports
      dispatch(
        getViolationVehWiseReport(
          startDate,
          endDate,
          regionName,
          businessGroupName,
        ),
      );
      dispatch(
        getViolationsDayWiseReport(
          startDate,
          endDate,
          regionName,
          businessGroupName,
        ),
      );
      dispatch(
        getViolationsTimeWiseReport(
          startDate,
          endDate,
          regionName,
          businessGroupName,
        ),
      );
      dispatch(
        getSpeedViolationsReport(
          startDate,
          endDate,
          regionName,
          businessGroupName,
        ),
      );
      return; // Exit the function early
    }

    dispatch(
      getViolationVehWiseReport(
        startDate,
        endDate,
        regionName,
        businessGroupName,
      ),
    ).catch((error) =>
      console.error('Error fetching vehicle-wise report:', error),
    );
    dispatch(
      getViolationsDayWiseReport(
        startDate,
        endDate,
        regionName,
        businessGroupName,
      ),
    ).catch((error) =>
      console.error('Error fetching violation-day-wise report:', error),
    );
    dispatch(
      getViolationsTimeWiseReport(
        startDate,
        endDate,
        regionName,
        businessGroupName,
      ),
    ).catch((error) =>
      console.error('Error fetching violation-time-wise report:', error),
    );
    dispatch(
      getSpeedViolationsReport(
        startDate,
        endDate,
        regionName,
        businessGroupName,
      ),
    ).catch((error) =>
      console.error('Error fetching speed-violations report:', error),
    );
  };

  // Handle date change from date picker
  const handleDateChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to handle search and trigger API calls
  const handleSearch = async () => {
    setIsSwitchOn(false);
    const startDate = moment(formData.dateFrom)
      .startOf('day')
      .format('YYYY-MM-DDT00:00:00.000Z');
    const endDate = moment(formData.dateTo)
      .endOf('day')
      .format('YYYY-MM-DDT23:59:59.000Z');

    // Ensure regionName and businessGroupName are empty strings if not provided
    const regionName = formData.regionName || '';
    const businessGroupName = formData.businessGroupName || '';

    if (userId && roleId) {
      const loginID = (formData.loginDetailID = 'PR-00210032');
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName || '', // Provide fallback if data missing
          formData.regionName || '', // Provide fallback if data missing
          userId,
          roleId,
        ),
      );
    }

    if (formData.dateFrom && formData.dateTo) {
      // Check if regionName or businessGroupName is empty
      if (!regionName || !businessGroupName) {
        // Dispatch actions with 0 for the respective reports
        dispatch(
          getViolationVehWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        );
        dispatch(
          getViolationsDayWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        );
        dispatch(
          getViolationsTimeWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        );
        dispatch(
          getSpeedViolationsReport(
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
          getViolationVehWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        ),
        dispatch(
          getViolationsDayWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        ),
        dispatch(
          getViolationsTimeWiseReport(
            startDate,
            endDate,
            regionName,
            businessGroupName,
          ),
        ),
        dispatch(
          getSpeedViolationsReport(
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

  const {
    Intracity_Speed_Violation,
    Highway_Speed_Violation,
    Motorway_Speed_Violation,
  } = speedViolationsReport || {};

  const chartSpeedData = [
    Intracity_Speed_Violation || 0,
    Highway_Speed_Violation || 0,
    Motorway_Speed_Violation || 0,
  ];

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (newValue) => {
    setIsChecked(newValue);
  };

  const tabs = [
    {
      label: 'Daily Violations',
      content: (
        <Card
          titleAbove="Total Violations by Day"
          // customContent={
          //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          //     <ReusableCheckbox
          //       isChecked={isChecked}
          //       onChange={handleCheckboxChange}
          //       showLabel={false}
          //     />
          //   </View>
          // }
        >
          <SafeAreaView style={{ flex: 1 }}>
            <BarChartComponent
              xleft={48}
              xright={25}
              data={chartDayData} // Added values for Sat and Sun
              labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            />
          </SafeAreaView>
          {/* Other content can go here */}
        </Card>
      ),
    },
    {
      label: '3-Hour Violations',
      content: (
        <Card titleAbove="Total violations - 3 Hours Time Frame">
          <SafeAreaView style={{ flex: 1 }}>
            <BarChartComponent
              xleft={46}
              xright={26}
              data={chartTimeData} // Added values for Sat and Sun
              labels={[
                '3am',
                '6am',
                '9am',
                '12pm',
                '3pm',
                '6pm',
                '9pm',
                '12am',
              ]}
            />
          </SafeAreaView>
        </Card>
      ),
    },
    {
      label: 'Speed Violations',
      content: (
        <Card titleAbove="Speed Violations">
          <SafeAreaView style={{ flex: 1 }}>
            <BarChartComponent
              xleft={74}
              xright={55}
              data={chartSpeedData}
              labels={['Intracity', 'Highway', 'Motorway']}
            />
          </SafeAreaView>
        </Card>
      ),
    },
  ];

  const progressCirclesData = [
    {
      id: '1',
      icon: 'car-multiple',
      progress: combinedFleetLength,
      maxProgress: 441,
      progressText: 'Overall Fleet',
      color: '#FF9F40',
    },
    {
      id: '2',
      icon: 'car',
      progress: respondingLength,
      maxProgress: 412,
      progressText: 'Active Vehicles',
      color: '#4BC0C0',
    },
    {
      id: '3',
      icon: 'car-off',
      progress: NotResponding.length,
      maxProgress: 45,
      progressText: 'Not Responding',
      color: '#FF0036',
    },
    {
      id: '4',
      icon: 'car-side',
      progress: Moving.length,
      maxProgress: 41,
      progressText: 'Moving Vehicles',
      color: '#1E90FF',
      gradientColors: ['#1E90FF', '#cccccc'], // Dodger Blue gradient
    },
    {
      id: '5',
      icon: 'stop-circle-outline',
      progress: Stopped.length,
      maxProgress: 372,
      progressText: 'Stopped Vehicles',
      color: '#F8C855',
      gradientColors: ['#F8C855', '#cccccc'], // Yellow to Orange gradient
    },
  ];

  const files = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'pdf',
    },
    {
      name: 'sample.xlsx',
      url: 'https://www.example.com/sample.xlsx',
      iconName: 'excel',
    },
  ];

  const tblDownload = [
    {
      name: 'sample.xlsx',
      url: 'https://www.example.com/sample.xlsx',
      iconName: 'excel',
    },
  ];

  const vtDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'pdf',
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

  // Data for Reg CountCard
  const countRegCardData = [
    {
      count: 0,
      label: 'Faisalabad',
    },
    {
      count: 0,
      label: 'Multan',
    },
    { count: 0, label: 'Islamabad' },
    { count: 0, label: 'Rahim Yar Khan' },
    { count: 0, label: 'Hyderabad' },
    {
      count: 0,
      label: 'Lahore',
    },
    {
      count: 0,
      label: 'Karachi',
    },
    {
      count: 0,
      label: 'Peshawar',
    },
    {
      count: 0,
      label: 'Head Office',
    },
  ];

  // Update countRegCardData by finding corresponding region and setting the violation counts
  const updatedCountRegCardData = countRegCardData.map((regionData) => {
    const regionViolations = violationVehReport.filter(
      (vehicle) => vehicle.Region === regionData.label,
    );

    // Sum up Total Violations for each region
    const totalRegionViolations = regionViolations.reduce(
      (sum, vehicle) => sum + vehicle.Total_Violation,
      0,
    );

    // Return updated region data with the total violations count
    return {
      ...regionData,
      count: totalRegionViolations,
    };
  });

  const countGroupCardData = [
    { count: 0, label: 'General Trade' },
    { count: 0, label: 'Ice Cream' },
    { count: 0, label: 'Foods' },
    { count: 0, label: 'Admin' },
  ];

  // Update countGroupCardData by finding corresponding group and setting the violation counts
  const updatedCountGroupCardData = countGroupCardData.map((groupData) => {
    const groupViolations = violationVehReport.filter(
      (vehicle) => vehicle.BusinessGroup === groupData.label,
    );

    // Sum up Total Violations for each group
    const totalGroupViolations = groupViolations.reduce(
      (sum, vehicle) => sum + vehicle.Total_Violation,
      0,
    );

    // Return updated group data with the total violations count
    return {
      ...groupData,
      count: totalGroupViolations,
    };
  });

  const regTabs = [
    {
      label: 'Regional Violations',
      content: (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap', // Allow wrapping
          }}
        >
          {updatedCountRegCardData.map((data, index) => {
            const isLastRow =
              index >=
              updatedCountRegCardData.length -
                (updatedCountRegCardData.length % 3);
            const isLastCardAlone =
              isLastRow && updatedCountRegCardData.length % 3 === 1;

            return (
              <View
                key={index}
                style={{
                  flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                  marginBottom: 12, // Spacing between rows
                  alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                }}
              >
                <View style={{ width: 105 }}>
                  <CountCard count={data?.count || 0} label={data.label} />
                </View>
              </View>
            );
          })}
        </View>
      ),
    },
    {
      label: 'Group Wise Violations',
      content: (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap', // Enable wrapping
          }}
        >
          {updatedCountGroupCardData.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  flexBasis: '48%', // Each box takes about half the row (with some margin for spacing)
                  marginBottom: 12, // Spacing between rows
                  marginRight: index % 2 === 0 ? '4%' : 0, // Add spacing between cards only for the left card
                  alignItems: 'center',
                }}
              >
                <CountCard count={data?.count || 0} label={data.label} />
              </View>
            );
          })}
        </View>
      ),
    },
  ];

  const [cards, setCards] = useState([]);
  const slickRef = useRef(null); // Reference for the Slick component

  // Calculate region violation counts
  const calculateRegionViolationCounts = (report) => {
    const regionViolationCounts = {};

    report.forEach((vehicle) => {
      const { Region } = vehicle;

      if (!regionViolationCounts[Region]) {
        regionViolationCounts[Region] = {
          driverSeatBelt: 0,
          delayedDriverSeatBelt: 0,
          passengerSeatBelt: 0,
          delayedPassengerSeatBelt: 0,
          fatigueAlert: 0,
          nightExit: 0,
          speedViolation: 0,
        };
      }

      // Add violations to the region's count
      regionViolationCounts[Region].driverSeatBelt +=
        vehicle.Driver_Seat_Belt || 0;
      regionViolationCounts[Region].delayedDriverSeatBelt +=
        vehicle.Delayed_Driver_Seat_Belt || 0;
      regionViolationCounts[Region].passengerSeatBelt +=
        vehicle.Passenger_Seat_Belt || 0;
      regionViolationCounts[Region].delayedPassengerSeatBelt +=
        vehicle.Delayed_Passenger_Seat_Belt || 0;
      regionViolationCounts[Region].fatigueAlert += vehicle.Fatigue_Alert || 0;
      regionViolationCounts[Region].nightExit += vehicle.Night_Exit || 0;
      regionViolationCounts[Region].speedViolation +=
        vehicle.Speed_Violation || 0;
    });

    return regionViolationCounts;
  };

  // Create transformed data
  const createTransformedData = (violationReport) => {
    const regionViolationCounts =
      calculateRegionViolationCounts(violationReport);
    const uniqueRegions = [
      ...new Set(violationReport.map((vehicle) => vehicle.Region)),
    ];
    return uniqueRegions.map((region) => ({
      title: region,
      data: [
        {
          label: 'Driver\nSeat Belt',
          count: regionViolationCounts[region].driverSeatBelt,
        },
        {
          label: 'Delayed Driver\nSeat Belt',
          count: regionViolationCounts[region].delayedDriverSeatBelt,
        },
        {
          label: 'Passenger\nSeat Belt',
          count: regionViolationCounts[region].passengerSeatBelt,
        },
        {
          label: 'Delayed Pass\nSeat Belt',
          count: regionViolationCounts[region].delayedPassengerSeatBelt,
        },
        {
          label: 'Fatigue Alert',
          count: regionViolationCounts[region].fatigueAlert,
        },
        { label: 'Night Exit', count: regionViolationCounts[region].nightExit },
        {
          label: 'Speed Violation',
          count: regionViolationCounts[region].speedViolation,
        },
      ],
    }));
  };

  // Update cards and title when violation data changes
  useEffect(() => {
    if (violationVehReport && violationVehReport.length > 0) {
      const transformedData = createTransformedData(violationVehReport);
      setCards('transformedData', transformedData);
      setCards(transformedData);

      const formattedRows = violationVehReport.map((violation) => ({
        'Local ID': violation.localid,
        'Driver Name': violation.DriverName,
        'Reg No': violation.RegNo,
        'Region Name': violation.Region,
        'Business Group': violation.BusinessGroup,
        'Driver Seat Belt': violation.Driver_Seat_Belt || 0,
        'Fatigue Alert': violation.Fatigue_Alert || 0,
        'Rest Time Violation': violation.Rest_Time_Violation || 0,
        'Night Exit': violation.Night_Exit || 0,
        'Speed Violation': violation.Speed_Violation || 0,
        'Total Violation': violation.Total_Violation || 0,
      }));
      setRows(formattedRows);
    } else {
      setCards([]);
      setRows([]);
    }
  }, [violationVehReport]);

  violationVehReport.forEach((vehicle) => {
    violationCounts.driverSeatBelt += vehicle.Driver_Seat_Belt;
    violationCounts.delayedDriverSeatBelt += vehicle.Delayed_Driver_Seat_Belt;
    violationCounts.passengerSeatBelt += vehicle.Passenger_Seat_Belt;
    violationCounts.delayedPassengerSeatBelt +=
      vehicle.Delayed_Passenger_Seat_Belt;
    violationCounts.fatigueAlert += vehicle.Fatigue_Alert;
    violationCounts.nightExit += vehicle.Night_Exit;
    violationCounts.speedViolation += vehicle.Speed_Violation;
    violationCounts.totalViolations += vehicle.Total_Violation;
  });

  // Data for CountCard
  const countTVCardData = [
    {
      count: violationCounts.driverSeatBelt,
      label: 'Driver\nSeat Belt',
    },
    {
      count: violationCounts.delayedDriverSeatBelt,
      label: 'Delayed Driver Seat Belt',
    },
    { count: violationCounts.passengerSeatBelt, label: 'Passenger\nSeat Belt' },

    {
      count: violationCounts.delayedPassengerSeatBelt,
      label: 'Delayed Pass\nSeat Belt',
    },
    { count: violationCounts.fatigueAlert, label: 'Fatigue\nAlert' },
    { count: violationCounts.nightExit, label: 'Night\nExit' },

    { count: violationCounts.speedViolation, label: 'Speed' },
  ];

  //Ranking of Driver by Number of Violations
  const columns = [
    { label: 'Local ID', width: 80 },
    { label: 'Driver Name', width: 150 },
    { label: 'Reg No', width: 100 },
    { label: 'Region Name', width: 120 },
    { label: 'Business Group', width: 150 },
    { label: 'Driver Seat Belt', width: 150 },
    { label: 'Fatigue Alert', width: 150 },
    { label: 'Rest Time Violation', width: 250 },
    { label: 'Night Exit', width: 100 },
    { label: 'Speed Violation', width: 135 },
    { label: 'Total Violation', width: 115 },
  ];

  return (
    <>
      {fleetLoading ? (
        <LoadingIndicator size="large" color="#006EDA" />
      ) : (
        <Layout
          type="innerScreen"
          title="Violation Dashboard"
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
                      key={`dateFrom-${formData.dateFrom}`}
                      placeholder="Select Start Date"
                      value={formData.dateFrom || ''} // Use the formatted date
                      onChange={(date) => handleDateChange('dateFrom', date)}
                      type="date"
                      mainStyle={{ flex: 1 }}
                      icon={UitCalender}
                      style={styles.inputField}
                    />
                    <InputField
                      key={`dateTo-${formData.dateTo}`}
                      placeholder="Select End Date"
                      value={formData.dateTo || ''} // Use the formatted date
                      onChange={(date) => handleDateChange('dateTo', date)}
                      type="date"
                      mainStyle={{ flex: 1 }}
                      icon={UitCalender}
                      style={styles.inputField}
                    />
                    <TouchableOpacity
                      style={styles.searchBtn}
                      onPress={handleSearch}
                    >
                      <Search />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.filterTitle}>
                    Choose Region Wise for Violations Analysis
                  </Text>
                  <View
                    style={[
                      styles.filterContentRow,
                      styles.noBorder,
                      styles.noMarginPadding,
                    ]}
                  >
                    <InputField
                      type="dropdown"
                      placeholder="All Region"
                      value={formData.regionName || ''}
                      onChange={(value) =>
                        handleInputChange('regionName', value)
                      }
                      options={regionOptions}
                      mainStyle={{ flex: 1 }}
                      style={styles.inputField}
                      dropdownHeight={34}
                    />
                    <InputField
                      type="dropdown"
                      placeholder="All Business"
                      value={formData.businessGroupName || ''}
                      onChange={(value) =>
                        handleInputChange('businessGroupName', value)
                      }
                      options={groupOptions}
                      mainStyle={{ flex: 1 }}
                      style={styles.inputField}
                      dropdownHeight={34}
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
            <LayoutCard>
              <View
                style={{
                  width: '100%',
                  flex: 1,
                  rowGap: 15,
                  paddingHorizontal: 28,
                }}
              >
                <View style={styles.boxesContainer}>
                  {progressCirclesData
                    .slice(0, 3)
                    .map((item, index) =>
                      renderProgressCircle({ item, index }),
                    )}
                </View>
                <View style={styles.fullBoxesContainer}>
                  {progressCirclesData
                    .slice(3, 5)
                    .map((item, index) =>
                      renderProgressRectangle({ item, index }),
                    )}
                </View>
                <View
                  style={[
                    styles.totalBarContainer,
                    { backgroundColor: getThemeColor('textInput') },
                  ]}
                >
                  <View style={[styles.content, { columnGap: 8 }]}>
                    <View
                      style={[
                        styles.icon,
                        { backgroundColor: getThemeColor('background') },
                      ]}
                    >
                      <AntDesign
                        name="exclamationcircleo"
                        size={14}
                        color={getThemeColor('h1')}
                      />
                    </View>
                    <Text
                      style={[
                        styles.text,
                        { fontWeight: 500, color: getThemeColor('h1') },
                      ]}
                    >
                      Total Number of Violations
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        fontSize: 22,
                        fontWeight: 'bold',
                        color: getThemeColor('h1'),
                        paddingRight: 8,
                      },
                    ]}
                  >
                    {violationCounts.totalViolations || 0}
                  </Text>
                </View>
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <HeadingComponent
                      style={{ textAlign: 'center' }}
                      size="h6"
                      color={getThemeColor('h1')}
                    >
                      Break Down of Total Violations
                    </HeadingComponent>
                    {/* <DownloadButtons files={files} /> */}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap', // Allow wrapping
                    }}
                  >
                    {countTVCardData.map((data, index) => {
                      const isLastRow =
                        index >=
                        countTVCardData.length - (countTVCardData.length % 3);
                      const isLastCardAlone =
                        isLastRow && countTVCardData.length % 3 === 1;

                      return (
                        <View
                          key={index}
                          style={{
                            flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                            marginBottom: 15, // Spacing between rows
                            alignItems: isLastCardAlone ? 'center' : 'center', // Center the last card if it's alone, otherwise align normally
                          }}
                        >
                          <View style={{ width: 105 }}>
                            <CountCard
                              count={data?.count || 0}
                              label={data.label}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.htContainer}>
                  <View style={styles.htHeader}>
                    <HeadingComponent
                      style={{ textAlign: 'center' }}
                      size="h6"
                      color={getThemeColor('h1')}
                    >
                      Violations Trends
                    </HeadingComponent>
                    {/* <DownloadButtons files={vtDownload} /> */}
                  </View>
                  <HorizontalTabs tabs={tabs} />
                </View>
                <View style={styles.cardContainer}>
                  <View style={styles.cardHeader}>
                    <HeadingComponent
                      style={{ textAlign: 'left' }}
                      size="h6"
                      color={getThemeColor('h1')}
                    >
                      Regional Rankings by Number of Violations
                    </HeadingComponent>
                    {/* <DownloadButtons files={files} /> */}
                  </View>
                  <HorizontalTabs tabs={regTabs} />
                </View>
                <View
                  style={[
                    styles.cardContainer,
                    {
                      textAlign: 'left',
                      justifyContent: 'center',
                      alignItems: 'start',
                    },
                  ]}
                >
                  <View style={[styles.cardHeader, { marginBottom: 8 }]}>
                    <HeadingComponent
                      style={{
                        textAlign: 'left',
                      }}
                      size="h6"
                      color={getThemeColor('h1')}
                    >
                      {`Type of Violation Performed by Region`}
                    </HeadingComponent>
                    {/* <DownloadButtons files={files} /> */}
                  </View>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#787878',
                      marginBottom: 12,
                    }}
                  >
                    Swap left for next region
                  </Text>
                  <View style={{ height: cards.length > 0 ? 300 : 100 }}>
                    <Slick
                      ref={slickRef}
                      style={styles.wrapper}
                      showsButtons={false}
                      autoplay={false}
                      loop={true}
                      showsPagination={true}
                      dotStyle={styles.dot}
                      activeDotStyle={styles.activeDot}
                    >
                      {cards.length > 0 ? (
                        cards.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: 'row',
                                  flexWrap: 'wrap',
                                  justifyContent: 'space-between',
                                  alignContent: 'flex-start',
                                  width: '100%',
                                }}
                              >
                                {item.data.map((violation, i) => {
                                  const isLastCard = i === item.data.length - 1;
                                  return (
                                    <View
                                      key={i}
                                      style={{
                                        width: isLastCard ? '30%' : '30%', // Consistent width for all cards
                                        marginBottom: 12,
                                        alignItems: isLastCard
                                          ? 'center'
                                          : 'flex-start', // Center the last card
                                        position: isLastCard
                                          ? 'relative'
                                          : 'static',
                                        left: isLastCard ? '50%' : 'auto',
                                        transform: isLastCard
                                          ? [{ translateX: 100 }]
                                          : [],
                                      }}
                                    >
                                      <CountCard
                                        count={violation?.count || 0}
                                        label={violation.label}
                                      />
                                    </View>
                                  );
                                })}
                              </View>
                              <Text
                                style={{
                                  position: 'absolute',
                                  bottom: 48,
                                  fontSize: 14,
                                  textAlign: 'center',
                                  width: '100%',
                                  fontWeight: 500,
                                }}
                              >
                                {item.title}
                              </Text>
                            </View>
                          );
                        })
                      ) : (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}
                        >
                          <Text style={{ fontSize: 14 }}>
                            No violation data available.
                          </Text>
                        </View>
                      )}
                    </Slick>
                  </View>
                </View>
                <View
                  style={[
                    styles.cardContainer,
                    {
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                >
                  <View style={[styles.cardHeader, { marginBottom: 0 }]}>
                    <HeadingComponent
                      style={{ textAlign: 'center' }}
                      size="h6"
                      color={getThemeColor('h1')}
                    >
                      Ranking of Driver by Number of Violations
                    </HeadingComponent>
                    {/* <DownloadButtons files={tblDownload} /> */}
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#006EDA',
                    }}
                  >
                    Total Result: {violationVehReport.length}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap', // Allow wrapping
                    }}
                  >
                    <DriverRanking
                      columns={columns}
                      rows={rows}
                      itemsPerPage={4}
                    />
                  </View>
                </View>
              </View>
            </LayoutCard>
          </View>
        </Layout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  totalBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
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
    justifyContent: 'center',
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
    minHeight: 212,
    maxHeight: 212,
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
    alignItems: 'center', // Center-align items vertically
    width: '100%',
    columnGap: 12, // Creates horizontal space between elements
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
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
});

export default ViolationScreen;
