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
import { getLateNightExitReport } from '@redux/actions/reportActions';
import throttle from 'lodash.throttle';

const LateNightExits = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { getThemeColor } = useContext(ThemeContext);
  const { reportTitle, ffid, startDate, endDate } = route.params;

  const [searchText, setSearchText] = useState('');
  const { fetchLateNightExitReport, loading, error } = useSelector(
    (state) => state.report,
  );

  useEffect(() => {
    if (ffid && startDate && endDate) {
      dispatch(getLateNightExitReport(startDate, endDate, ffid));
    }
  }, [dispatch, ffid, startDate, endDate]);

  // Check if fetchLateNightExitReport and Detail are defined
  const reportData = fetchLateNightExitReport?.Detail || [];

  // Map over report data
  const mappedData = reportData.map((item) => ({
    ffid: item.FFID,
    registrationNumber: item.RegNo,
    driverName: item.DriverName,
    vehicleMake: item.VehicleMade,
    vehicleModel: item.VehicleModel,
    dateTime: new Date(item.DateTimeTD), // Convert to Date object if needed
    status: item.Status,
    reference: item.Refer,
  }));

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
      item.registrationNumber.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [mappedData, searchText]);

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

          {/* Late Night Exits List */}
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent, // Apply styles conditionally
            ]}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const formattedDate = new Date(item.dateTime);
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#D9D9D9',
                      marginBottom: 20,
                    }}
                  >
                    <View style={styles.vehicleInfo}>
                      <Text style={styles.reportTitle}>
                        Violation Report for: {item.registrationNumber}
                      </Text>
                      <Text style={styles.reportContent}>
                        On{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                          {`${formattedDate.toLocaleDateString()}`}
                        </Text>
                        {`, the vehicle was found in violation with status `}
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.status}
                        </Text>
                        {`. Incident occurred at `}
                        <Text style={{ fontWeight: 'bold' }}>
                          {`${formattedDate.toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}`}
                        </Text>
                        {`. Location: `}
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.reference}
                        </Text>
                        {`.`}
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
  reportTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  reportContent: {
    flex: 1,
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

export default LateNightExits;
