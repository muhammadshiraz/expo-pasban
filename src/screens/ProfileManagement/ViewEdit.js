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
  FlatList,
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
import { getUserProfiles } from '@redux/actions/userActions';
import throttle from 'lodash.throttle';

//Testing Lazy Loading

// Custom hook for debouncing search input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

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
        Local ID
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        {item.userId}
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
            {item.userName}
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
          <Text style={{ fontSize: 12, color: '#757575' }}>Region:</Text>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
            }}
          >
            {item.region}
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
            Role:
          </Text>
          <Text style={{ fontSize: 12, color: '#757575' }}>
            {item.roleName}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
));

const ViewEdit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { getThemeColor } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');
  const { userProfiles, loading, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);
  const { userId, roleId } = user || {};

  //Testing Lazy Loading
  const debouncedSearchText = useDebounce(searchText, 300); // Debounce search text
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(getUserProfiles({ page, limit: 20 }));
  }, [dispatch, page]);

  // Map over report data
  const mappedData = Array.isArray(userProfiles)
    ? userProfiles.map((item) => ({
        userId: item.UserId,
        roleId: item.Role,
        userName: item.UserName,
        email: item.Email,
        drivingLicense: item.DrivingLicense,
        drivingLicenseExpiry: item.DrivingLicenseExpiry,
        region: item.Region,
        roleName: item.RoleName,
      }))
    : [];

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
      item.userId.toString().toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [mappedData, searchText]);

  const loadMoreData = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
      setLoadingMore(false);
    }
  };

  const vtDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'excel',
    },
  ];

  const handlePress = (item) => {
    navigation.navigate('EditProfile', {
      //userId: userId,
      itemData: item,
      userId: item.userId,
      roleId: item.roleId,
    });
  };

  // if (loading) {
  //   return <LoadingIndicator size="large" color="#006EDA" />;
  // }

  return (
    <Layout
      type="innerScreen"
      title="View / Edit"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <SearchBox
          placeholder="Search Reports by User ID"
          value={searchText}
          onChangeText={handleInputChange}
          showSearchButton={false}
        />
        <LayoutCard
          style={{ paddingHorizontal: 28 }}
          onScroll={({ nativeEvent }) => {
            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - 20;
            if (isCloseToBottom && !loadingMore) loadMoreData();
          }}
          scrollEventThrottle={400}
        >
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
            <Text style={styles.title}>User Profiles List</Text>
            {/* <DownloadButtons files={vtDownload} /> */}
          </View>

          {/* View Edit List */}
          {/* <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent,
            ]}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => {
                return (
                  <Card key={item.userId} item={item} onPress={handlePress} />
                );
              })
            ) : (
              <Text style={styles.noRecordsText}>No records found.</Text>
            )}
          </ScrollView> */}
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            onScrollEndDrag={loadMoreData}
          >
            {loading && page === 1 ? (
              <LoadingIndicator size="large" color="#006EDA" />
            ) : (
              filteredData.map((item) => (
                <Card key={item.userId} item={item} onPress={handlePress} />
              ))
            )}

            {error && <Text style={styles.errorText}>Error: {error}</Text>}
            {loadingMore && <LoadingIndicator size="small" color="#006EDA" />}
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

export default ViewEdit;
