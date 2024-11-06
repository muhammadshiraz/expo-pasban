import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ReusableModal from '@components/ReusableModal';
import SolarUser from '@assets/icons/solar_user-bold.svg';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import DownloadButtons from '@components/DownloadButtons';
import SearchBox from '@components/SearchBox';
import LoadingIndicator from '@components/LoadingIndicator';
import LTOToPrint from '@components/LTOToPrint';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAuthorityLetterStatuses,
  getAuthorityLetterForPrint,
} from '@redux/actions/ltoActions';
import throttle from 'lodash.throttle';

// Memoized Card Component
const Card = React.memo(({ item, onPress }) => (
  <TouchableOpacity
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
        Letter #
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        {item.id}
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
          marginBottom: 5,
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
            {item.employeeName}
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
          <Text style={{ fontSize: 12, color: '#757575' }}>Vehicle no:</Text>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
            }}
          >
            {item.regNo}
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
            Validity:
          </Text>
          <Text style={{ fontSize: 12, color: '#757575' }}>
            {item.validity || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
));

const ViewAuthLetter = () => {
  const dispatch = useDispatch();
  const [loadingPrint, setLoadingPrint] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isId, setIsId] = useState();
  const [LTOData, setLTOData] = useState({});
  const { getThemeColor } = useContext(ThemeContext);
  const { viewAuthLetter, authorityLetterForPrint, loading, error } =
    useSelector((state) => state.lto);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getAllAuthorityLetterStatuses());
  }, [dispatch]);

  useEffect(() => {
    if (isId) {
      dispatch(getAuthorityLetterForPrint(isId));
    }
  }, [dispatch, isId]);

  useEffect(() => {
    if (authorityLetterForPrint.length > 0 && isId) {
      const selectedData = authorityLetterForPrint.find(
        (item) => item.Id === isId,
      );
      if (selectedData) {
        setLTOData(selectedData);
        setIsModalVisible(true);
        setLoadingPrint(false);
      }
    }
  }, [authorityLetterForPrint, isId]);

  // Map over report data
  const mappedData = viewAuthLetter
    .filter((item) => item.AuthorityLetterStatus === 'Approved') // Filter for approved letters
    .map((item) => ({
      id: item.Id,
      userId: item.UserId,
      localId: item.LocalId,
      employeeName: item.EmployeeName,
      regNo: item.RegNo,
      validity: item.Validity,
      licenseNo: item.LicenseNo,
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
      const id = item.id ? String(item.id) : ''; // Ensure employeeNo is a string
      return id.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [mappedData, searchText]);

  const vtDownload = [
    {
      name: 'sample.pdf',
      url: 'https://www.example.com/sample.pdf',
      iconName: 'excel',
    },
  ];

  const handlePress = (id) => {
    setIsId(id);
    setLoadingPrint(true);
  };

  if (loading || loadingPrint) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <Layout
      type="innerScreen"
      title="View Authority Letter"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <SearchBox
          placeholder="Search by Letter #"
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
            <Text style={styles.title}>Authority Letter List</Text>
            {/* <DownloadButtons files={vtDownload} /> */}
          </View>

          {/* View Auth Letter List */}
          <ScrollView
            contentContainerStyle={[
              styles.scrollViewContent,
              filteredData.length > 0 ? {} : styles.centerContent, // Apply styles conditionally
            ]}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => {
                return (
                  <Card
                    key={item.id}
                    item={item}
                    onPress={() => handlePress(item.id)}
                  />
                );
              })
            ) : (
              <Text style={styles.noRecordsText}>No records found.</Text>
            )}
          </ScrollView>
        </LayoutCard>
        {/* Modal Integration */}
        <ReusableModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          padding={0}
          showCloseButton={true}
          showTitle={false}
          content={
            authorityLetterForPrint.length > 0 ? (
              <LTOToPrint data={LTOData} />
            ) : (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>
                  No Authority Letter Available
                </Text>
                <Text style={styles.noDataSubText}>
                  We're sorry, but we don't have an authority letter available
                  right now.
                </Text>
              </View>
            )
          }
        />
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
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9EACBF',
    marginBottom: 10,
    textAlign: 'center',
  },
  noDataSubText: {
    fontSize: 14,
    color: '#6D7E92',
    textAlign: 'center',
  },
});

export default ViewAuthLetter;
