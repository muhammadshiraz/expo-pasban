import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import InputField from '@components/InputField';
import Region from '@assets/icons/region.svg';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import DownloadButtons from '@components/DownloadButtons';
import SearchBox from '@components/SearchBox';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicleCurrentStatus } from '@redux/actions/reportActions';
import throttle from 'lodash.throttle';

const ReportsDetailLists = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { reportTitle, selVehicle, startDate, endDate } = route.params;
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [cardData, setCardData] = useState([]);
  const { vehicleCurrentStatus, loading, error } = useSelector(
    (state) => state.report,
  );

  console.log(
    'reportTitle, selVehicle, startDate, endDate',
    reportTitle,
    selVehicle,
    startDate,
    endDate,
  );
  //const [filteredResults, setFilteredResults] = useState([]);

  const [formData, setFormData] = useState({
    selRegion: '',
  });

  useEffect(() => {
    if (reportTitle === 'Vehicle Last Update Status') {
      dispatch(getVehicleCurrentStatus());
    }
  }, [dispatch]);

  useEffect(() => {
    if (reportTitle === 'Vehicle Last Update Status') {
      const mappedData = vehicleCurrentStatus?.map((item, index) => ({
        id: index,
        reportTitle: item.Regno, // Use index + 1 to create a unique trip number
        name: item.UserName || '',
        regNumber: item.Regno || '',
        startedOn: item.DDCDate || '',
        isActive: false,
      }));

      setCardData(mappedData);
    }
  }, [vehicleCurrentStatus]);

  console.log('cardData', cardData.length);

  // Handle input change for search field
  const handleInputChange = useCallback(
    throttle((value) => {
      setSearchText(value);
    }, 100), // Adjust throttle delay as needed
    [],
  );

  const filteredResults = useMemo(() => {
    if (searchText.trim() === '') {
      return cardData;
    }
    return cardData.filter((item) =>
      item.ltoId?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [cardData, searchText]);

  const handlePress = (item) => {
    navigation.navigate('CancelledLTODetail', { itemData: item }); // Navigate to ApprovedLTO screen with LTO data
  };

  if (loading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  const reportsList = [
    {
      id: '1',
      tripTitle: 'TRIP # 1',
      tripContent:
        'Vehicle ABC-123 started on August 24, 2024, at 03:01 AM from Avari Plaza, Fatimah Jinnah Road, and stopped on August 24, 2024, at 04:15 AM, having traveled 25 km with a maximum speed of 30 km/h.',
      tripDuration: '1 hr 14 mins.',
    },
    {
      id: '2',
      tripTitle: 'TRIP # 2',
      tripContent:
        'Vehicle XYZ-456 started on August 25, 2024, at 10:30 AM from Saddar Road and stopped on August 25, 2024, at 12:00 PM, having traveled 30 km with a maximum speed of 40 km/h.',
      tripDuration: '1 hr 30 mins.',
    },
    {
      id: '3',
      tripTitle: 'TRIP # 3',
      tripContent:
        'Vehicle LMN-789 started on August 26, 2024, at 02:00 PM from Clifton, Karachi and stopped on August 26, 2024, at 03:45 PM, having traveled 35 km with a maximum speed of 50 km/h.',
      tripDuration: '1 hr 45 mins.',
    },
    {
      id: '4',
      tripTitle: 'TRIP # 4',
      tripContent:
        'Vehicle PQR-101 started on August 27, 2024, at 05:00 PM from University Road and stopped on August 27, 2024, at 06:20 PM, having traveled 40 km with a maximum speed of 55 km/h.',
      tripDuration: '1 hr 20 mins.',
    },
  ];

  // useEffect(() => {
  //   setFilteredResults(reportsList);
  // }, []);

  // Handle input change for search field
  // const handleInputChange = (key, value) => {
  //   setFormData({ ...formData, [key]: value });

  //   // If the search input is cleared, show all data again
  //   if (value.trim() === '') {
  //     setFilteredResults(reportsList);
  //   }
  // };

  const handleSearch = () => {
    if (formData.searchReports.trim() === '') {
      setFilteredResults(reportsList);
    } else {
      const results = reportsList.filter((item) =>
        item.id.toLowerCase().includes(formData.searchReports.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  const handleDropDownChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleVehiclePress = (vehicle) => {
    navigation.navigate('VehicleDetails', { vehicleId: vehicle.id });
  };

  const vtDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'excel',
    },
  ];

  return (
    <Layout
      type="innerScreen"
      title={reportTitle}
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {reportTitle === 'Vehicle Last Update Status' ? (
          ''
        ) : (
          <SearchBox
            placeholder="Search Reports by Trip Title"
            value={searchText}
            onChangeText={handleInputChange}
            showSearchButton={false}
          />
        )}
        <LayoutCard style={{ paddingHorizontal: 28 }}>
          {/* Vehicle Traveling Heading */}
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
            <DownloadButtons files={vtDownload} />
          </View>

          {/* Vehicle Traveling List */}
          <ScrollView>
            {(filteredResults.length > 0 ? filteredResults : cardData).map(
              (report) => (
                <TouchableOpacity key={report.id} style={{ marginBottom: 20 }}>
                  <View style={styles.vehicleInfo}>
                    <Text style={styles.tripTitle}>{report.reportTitle}</Text>
                    <Text style={styles.tripContent}>
                      {report.regNumber} started on {report.startedOn}
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
                    <Text style={styles.tripDuration}>
                      {report.tripDuration}
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            )}
            {filteredResults.length === 0 && reportsList.length === 0 && (
              <Text style={styles.noResultsText}>No results found</Text>
            )}
          </ScrollView>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
  totalDuration: {
    fontWeight: 'bold',
  },
  tripDuration: {
    color: '#5C5C5C',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF0000',
    marginVertical: 20,
  },
});

export default ReportsDetailLists;
