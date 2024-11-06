import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import DownloadButtons from '@components/DownloadButtons';
import SearchBox from '@components/SearchBox';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getTripReport } from '@redux/actions/reportActions';
import throttle from 'lodash.throttle';

const VehicleTraveling = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { getThemeColor } = useContext(ThemeContext);
  const { reportTitle, selVehicle, ffid, tripDuration, startDate, endDate } =
    route.params;

  const [searchText, setSearchText] = useState('');
  const { fetchTripReport, loading, error } = useSelector(
    (state) => state.report,
  );

  useEffect(() => {
    if (startDate && endDate && ffid && tripDuration) {
      const formatDate = (date, endOfDay = false) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}T${
          endOfDay ? '23:59:59' : '00:00:00'
        }`;
      };

      const from = formatDate(startDate);
      const to = formatDate(endDate, true);

      dispatch(getTripReport(from, to, ffid, tripDuration));
    }
  }, [startDate, endDate, ffid, tripDuration, dispatch]);

  // Check if fetchLateNightExitReport and Detail are defined
  const reportData = fetchTripReport?.Detail || [];

  // Helper function to format duration in seconds
  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Map over report data
  const mappedData = reportData.map((item, index) => {
    const startDateTime = new Date(item.sDateTime);
    const endDateTime = new Date(item.eDateTime);

    const formattedStartDate = startDateTime.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedStartTime = startDateTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const formattedEndDate = endDateTime.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedEndTime = endDateTime.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return {
      ffid: item.row,
      selVehicle: selVehicle,
      tripTitle: `TRIP #${index + 1}`,
      startDateTime: item.sDateTime,
      endDateTime: item.eDateTime,
      tripStart: item.sRef,
      tripEnd: item.eRef,
      mileage: item.mileage,
      duration: formatDuration(item.duration),
      maxSpeed: item.maxSpeed,
      avgSpeed: item.avgSpeed,
      idleTime: item.idleTime,
      tripDescription: {
        startDate: formattedStartDate,
        startTime: formattedStartTime,
        startRef: item.sRef,
        endDate: formattedEndDate,
        endTime: formattedEndTime,
        mileage: item.mileage,
        maxSpeed: item.maxSpeed,
      },
    };
  });

  // Handle input change for search field
  const handleInputChange = useCallback(
    throttle((value) => {
      setSearchText(value);
    }, 100), // Adjust throttle delay as needed
    [],
  );

  // Filter mapped data based on search text
  const filteredData = useMemo(() => {
    return mappedData.filter((item) =>
      item.selVehicle.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [mappedData || {}, searchText]);

  const vtDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'excel',
    },
  ];

  if (loading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <Layout
      type="innerScreen"
      title={reportTitle}
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <SearchBox
          placeholder="Search Reports by Reg No"
          value={searchText}
          onChangeText={handleInputChange}
          showSearchButton={false}
        />
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          <View
            style={[
              styles.row,
              {
                borderBottomWidth: 1,
                borderBottomColor: '#DBDBDB',
                justifyContent: 'space-between',
                paddingBottom: 8,
              },
            ]}
          >
            <Text style={styles.title}>{reportTitle} List</Text>
            {/* <DownloadButtons files={vtDownload} /> */}
          </View>

          {/* Vehicle Traveling List */}
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent, // Apply styles conditionally
            ]}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                //const formattedDate = new Date(item.dateTime);
                return (
                  <TouchableOpacity key={index} style={{ marginBottom: 20 }}>
                    <View style={styles.vehicleInfo}>
                      <Text style={styles.tripTitle}>{item.tripTitle}</Text>
                      <Text style={styles.tripContent}>
                        Vehicle{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.selVehicle}
                        </Text>{' '}
                        started on{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.tripDescription.startDate}
                        </Text>{' '}
                        at{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.tripDescription.startTime}
                        </Text>{' '}
                        from{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.tripStart}
                        </Text>{' '}
                        <Text style={styles.tripContent}>
                          {` and stopped on `}
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                          {`${item.tripDescription.endDate} at ${item.tripDescription.endTime} `}
                        </Text>
                        <Text style={styles.tripContent}>
                          {` having traveled `}
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                          {`${item.tripDescription.mileage} km `}
                        </Text>
                        <Text style={styles.tripContent}>
                          {` with a maximum speed of `}
                        </Text>
                        <Text style={{ fontWeight: 'bold' }}>
                          {`${item.tripDescription.maxSpeed} km/h.`}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.row,
                        {
                          alignItems: 'center',
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderTopColor: '#D9D9D9',
                          borderBottomColor: '#D9D9D9',
                          paddingVertical: 5,
                          columnGap: 3,
                        },
                      ]}
                    >
                      <Text style={styles.totalDuration}>Total duration:</Text>
                      <Text style={{ fontWeight: 'bold' }}>
                        {item.duration}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.noRecordsText}>No records found.</Text>
            )}
          </ScrollView>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  totalResult: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'semibold',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 0,
    marginBottom: 0,
  },
  tripTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tripContent: {
    color: '#5C5C5C',
  },
  vehicleInfo: {
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
  },
  noRecordsText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#9EACBF',
    marginTop: 20,
  },
});

export default VehicleTraveling;
