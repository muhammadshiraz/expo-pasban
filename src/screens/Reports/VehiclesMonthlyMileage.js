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
  Image,
  ScrollView,
} from 'react-native';
import Layout from '@components/Layout';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '@context/ThemeContext';
import SolarUser from '@assets/icons/solar_user-bold.svg';
import LayoutCard from '@components/LayoutCard';
import DownloadButtons from '@components/DownloadButtons';
import SearchBox from '@components/SearchBox';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getVehiclesMonthlyMileageReport } from '@redux/actions/reportActions';
import throttle from 'lodash.throttle';

// Memoized Card Component
const Card = React.memo(({ item, index, onPress }) => (
  <TouchableOpacity
    key={index}
    style={{
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderColor: item.isActive ? '#006EDA' : '#9B9B9B',
      borderWidth: 1,
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
        flexDirection: 'row',
        columnGap: 12,
        justifyContent: 'space-between',
        marginBottom: 8,
      }}
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
          paddingVertical: 8,
        }}
      >
        <Text
          style={{
            color: '#757575',
            fontSize: 14,
            fontWeight: '600',
          }}
        >
          Veh No
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            fontWeight: '600',
          }}
        >
          {item.registrationNumber}
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
            marginBottom: 5,
            width: '100%',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              columnGap: 2,
            }}
          >
            <Image
              source={require('@assets/images/model.png')}
              resizeMode="cover"
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 2,
                marginLeft: 8,
              }}
            >
              {item.model}
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
            <Text style={{ fontSize: 12, color: '#757575', marginRight: 1 }}>
              Region Name:
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#000000',
                fontWeight: '500',
              }}
            >
              {item.regionName}
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
                marginRight: 2,
              }}
            >
              From:
            </Text>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              {item.dateFrom}
            </Text>
            <Text style={{ color: '#000000', marginHorizontal: 3 }}>-</Text>
            <Text
              style={{
                fontSize: 12,
                color: '#000000',
                fontWeight: '500',
                marginRight: 2,
              }}
            >
              To:
            </Text>
            <Text style={{ fontSize: 12, color: '#757575' }}>
              {item.dateTo}
            </Text>
          </View>
        </View>
      </View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        columnGap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#757575',
        marginTop: 8,
        paddingTop: 8,
      }}
    >
      {/* Top Speed */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: '#000000',
            fontWeight: '500',
            marginRight: 2,
          }}
        >
          Top Speed:
        </Text>
        <Text style={{ fontSize: 12, color: '#757575' }}>
          {item.maxSpeed} Km/h
        </Text>
      </View>
      <Text style={{ color: '#000000', marginHorizontal: 3 }}>-</Text>
      {/* Mileage */}
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: '#000000',
            fontWeight: '500',
            marginRight: 2,
          }}
        >
          Mileage:
        </Text>
        <Text style={{ fontSize: 12, color: '#757575' }}>
          {item.mileage.toFixed(2)} Km
        </Text>
      </View>
    </View>
  </TouchableOpacity>
));

const VehiclesMonthlyMileage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { getThemeColor } = useContext(ThemeContext);
  const { reportTitle, selVehicle, startDate, endDate, ffid } = route.params;

  const [searchText, setSearchText] = useState('');
  const { fetchVehiclesMonthlyMileageReport, loading, error } = useSelector(
    (state) => state.report,
  );

  useEffect(() => {
    if ((startDate && endDate, ffid)) {
      dispatch(getVehiclesMonthlyMileageReport(startDate, endDate, ffid));
    }
  }, [dispatch, startDate, endDate, ffid]);

  // Check if fetchLateNightExitReport and Detail are defined
  const reportData = fetchVehiclesMonthlyMileageReport?.Detail || [];

  // Map over report data
  const mappedData = reportData.map((item) => {
    const dateFrom = new Date(startDate);
    const dateTo = new Date(endDate);
    return {
      id: item.FFID,
      registrationNumber: item.RegNo,
      engineNo: item.EngineNo,
      chassisNo: item.ChassisNo,
      make: item.Make,
      model: item.Model,
      year: item.Year,
      dateFrom: dateFrom
        ? dateFrom.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'N/A',
      dateTo: dateTo
        ? dateTo.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'N/A',
      regionName: item.RegionName || 'N/A',
      businessGroupName: item.BusinessGroupName || 'N/A',
      mileage: item.Mileage || 0,
      maxSpeed: item.MaxSpeed || 0,
      idleTime: item.IdleTime || 0,
    };
  });

  // Aggregation function to calculate totals
  const getAggregatedCard = (data) => {
    const aggregated = data.reduce(
      (acc, item) => {
        acc.mileage += item.mileage || 0;
        acc.idleTime += item.idleTime || 0;
        acc.maxSpeed = Math.max(acc.maxSpeed, item.maxSpeed || 0);
        acc.count += 1;
        return acc;
      },
      {
        registrationNumber: data[0]?.registrationNumber,
        chassisNo: data[0]?.chassisNo,
        engineNo: data[0]?.engineNo,
        make: data[0]?.make,
        model: data[0]?.model,
        year: data[0]?.year,
        dateFrom: data[0]?.dateFrom,
        dateTo: data[0]?.dateTo,
        regionName: data[0]?.regionName || 'N/A',
        businessGroupName: data[0]?.businessGroupName || 'N/A',
        mileage: 0,
        idleTime: 0,
        maxSpeed: 0,
        count: 0,
      },
    );

    delete aggregated.count; // Remove temporary count used for average calculations
    return aggregated;
  };

  // Handle input change for search field
  const handleInputChange = useCallback(
    throttle((value) => {
      setSearchText(value);
    }, 100), // Adjust throttle delay as needed
    [],
  );

  // Filter presentation data based on search text
  const filteredData = useMemo(() => {
    const filtered = mappedData.filter((item) => {
      const registrationNumber = item.registrationNumber
        ? String(item.registrationNumber)
        : '';
      return registrationNumber
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    // Group by registration number and create aggregated cards
    const regNoGroups = {};
    filtered.forEach((item) => {
      if (!regNoGroups[item.registrationNumber]) {
        regNoGroups[item.registrationNumber] = [];
      }
      regNoGroups[item.registrationNumber].push(item);
    });

    // Return an array of aggregated cards
    return Object.values(regNoGroups).map((group) => getAggregatedCard(group));
  }, [mappedData, searchText]);

  const handlePress = (item) => {
    navigation.navigate('VehiclesMonthlyMileageDetailReport', {
      title: reportTitle,
      startDate: startDate,
      endDate: endDate,
      ffid: ffid,
    });
  };

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
          placeholder="Search Reports by Vehicle No"
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

          {/* Vehicles Monthly Mileage List */}
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent, // Apply styles conditionally
            ]}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                return <Card key={index} item={item} onPress={handlePress} />;
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
    lineHeight: 25,
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

export default VehiclesMonthlyMileage;
