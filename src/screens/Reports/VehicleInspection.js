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
import { useNavigation } from '@react-navigation/native';
import SolarUser from '@assets/icons/solar_user-bold.svg';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import DownloadButtons from '@components/DownloadButtons';
import SearchBox from '@components/SearchBox';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchVehicleInspectionReport } from '@redux/actions/reportActions';
import throttle from 'lodash.throttle';

// Memoized Card Component
const Card = React.memo(({ item, index, onPress }) => (
  <TouchableOpacity
    key={index}
    style={{
      flex: 1,
      flexDirection: 'row',
      columnGap: 12,
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderColor: item.isActive ? '#006EDA' : '#9B9B9B',
      borderWidth: 1,
      minHeight: 100,
      maxHeight: 100,
      borderRadius: 6,
      padding: 15,
      ...(item.isActive && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 8,
      }),
    }}
    onPress={() => onPress(item)}
  >
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 80,
        rowGap: 2,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#9B9B9B',
      }}
    >
      <Text
        style={{
          color: '#757575',
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        Emp No
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        {item.employeeNo}
      </Text>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          columnGap: 5,
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            columnGap: 2,
          }}
        >
          <SolarUser />
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginTop: 2,
            }}
          >
            {item.driverName}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            columnGap: 2,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 12, color: '#757575' }}>
            Last Observation Date:
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
            }}
          >
            {new Date(item.lastObservationDate).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            columnGap: 2,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
            }}
          >
            Line Manager:
          </Text>
          <Text style={{ fontSize: 12, color: '#757575' }}>
            {item.lineManager}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
));

const VehicleInspection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { getThemeColor } = useContext(ThemeContext);
  const { reportTitle, startDate, endDate, region } = route.params;

  const [searchText, setSearchText] = useState('');
  const { fetchVehicleInspectionReport, loading, error } = useSelector(
    (state) => state.report,
  );

  useEffect(() => {
    if (startDate && endDate && region) {
      dispatch(getFetchVehicleInspectionReport(startDate, endDate, region));
    }
  }, [dispatch, startDate, endDate, region]);

  // Check if fetchLateNightExitReport and Detail are defined
  const reportData =
    fetchVehicleInspectionReport?.['Vehicle Observation Data'] || [];

  // Map over report data
  const mappedData = reportData.map((item) => ({
    id: item.ID,
    driverName: item.Name,
    lastObservationDate: new Date(item.LastObservationDate).toISOString(),
    lineManager: item.LineManager,
    employeeNo: item.EmployeeNo,
    vehicleNo: item.VehicleNo,
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
    return mappedData.filter((item) => {
      const employeeNo = item.employeeNo ? String(item.employeeNo) : ''; // Ensure employeeNo is a string
      return employeeNo.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [mappedData, searchText]);

  const vtDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'excel',
    },
  ];

  const handlePress = (item) => {
    navigation.navigate('VehicleInspectionDetailReport', {
      startDate,
      endDate,
      region,
      itemData: item,
    }); // Navigate to ApprovedLTO screen with LTO data
  };

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
          placeholder="Search Reports by Employee No"
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

          {/* Vehicle Inspection List */}
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent, // Apply styles conditionally
            ]}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => {
                return <Card key={item.id} item={item} onPress={handlePress} />;
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
    rowGap: 12,
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

export default VehicleInspection;
