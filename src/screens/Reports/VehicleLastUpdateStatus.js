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
import { getFleetReport } from '@redux/actions/fleetActions';
import throttle from 'lodash.throttle';

// Memoized Card Component
const Card = React.memo(({ item, index, onPress }) => (
  <TouchableOpacity
    key={index}
    style={{
      //flex: 1,
      flexDirection: 'column',
      //columnGap: 12,
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderColor: item.isActive ? '#006EDA' : '#9B9B9B',
      borderWidth: 1,
      // minHeight: 100,
      // maxHeight: 100,
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
        marginBottom: 10,
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
          {item.regNo}
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
            marginBottom: 3,
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
              Business Group:
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#000000',
                fontWeight: '500',
              }}
            >
              {item.businessGroup}
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
              Last Update:
            </Text>
            <Text style={{ fontSize: 12, color: '#757575', width: 140 }}>
              {item.lastUpdate}
            </Text>
          </View>
        </View>
      </View>
    </View>
    <Text
      style={{
        fontSize: 12,
        color: '#000000',
        fontWeight: '500',
        marginBottom: 3,
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#757575',
        marginTop: 8,
        paddingTop: 8,
      }}
    >
      Last Location
    </Text>
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: '#757575',
            lineHeight: 18,
            textAlign: 'center',
          }}
        >
          {item.lastLocation}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
));

const VehicleLastUpdateStatus = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { getThemeColor } = useContext(ThemeContext);
  const { reportTitle } = route.params;
  const [searchText, setSearchText] = useState('');
  const user = useSelector((state) => state.auth.user);
  const { userId, roleId, region, businessGroup } = user || {};
  const { report, loading, error } = useSelector((state) => state.fleet);

  const [formData, setFormData] = useState({
    loginDetailID: 'PR-00210032',
    regionName: region || '',
    businessGroupName: businessGroup || '',
  });

  const loginID = formData.loginDetailID;

  useEffect(() => {
    if (roleId === '1') {
      setFormData((prevData) => ({
        ...prevData,
        regionName: '',
        businessGroupName: '',
      }));
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName,
          formData.regionName,
          userId,
          roleId,
        ),
      );
    } else if (roleId === '16') {
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName,
          formData.regionName,
          userId,
          roleId,
        ),
      );
    } else {
      dispatch(
        getFleetReport(
          loginID,
          formData.businessGroupName,
          formData.regionName,
          userId,
          roleId,
        ),
      );
    }
  }, [dispatch, userId, roleId, region, businessGroup]);

  const { Responding = [] } = report || {};

  const mappedData = Responding.map((item) => {
    const lastUpdate = item.LastUpdate ? new Date(item.LastUpdate) : null;
    return {
      id: item.FFID,
      driverName: item.DriverName,
      businessGroup: item.BusinessGroup,
      regNo: item.RegNo,
      lastUpdate: lastUpdate
        ? lastUpdate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })
        : 'N/A',
      lastLocation: item.LastLocation,
    };
  });

  // Handle input change for search field
  const handleInputChange = useCallback(
    throttle((value) => {
      setSearchText(value);
    }, 100),
    [],
  );

  // Filter mapped data based on search text
  const filteredData = useMemo(() => {
    return mappedData.filter((item) => {
      const regNo = item.regNo ? String(item.regNo) : '';
      return regNo.toLowerCase().includes(searchText.toLowerCase());
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
    navigation.navigate('VehicleLastUpdateStatusReport', {
      itemData: item,
      loginID: loginID,
      businessGroup: formData.businessGroupName,
      region: formData.regionName,
      userId: userId,
      roleId: roleId,
    });
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

          {/* Vehicle Last Update Status List */}
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent,
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

export default VehicleLastUpdateStatus;
