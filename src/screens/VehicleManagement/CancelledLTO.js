import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import SolarUser from '@assets/icons/solar_user-bold.svg';
import InactiveDot from '@assets/icons/inactive-dot.svg';
import ActiveDot from '@assets/icons/active-dot.svg';
import SearchBox from '@components/SearchBox';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getCancelledLTO } from '@redux/actions/ltoActions';
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
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        LTO ID
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 18,
          fontWeight: '600',
        }}
      >
        {item.ltoId}
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
          flex: 1,
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
            columnGap: 8,
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
            {item.name}
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
            Approval request for Reg #
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#000000',
              fontWeight: '500',
            }}
          >
            {item.regNumber}
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
            Issued by:
          </Text>
          <Text style={{ fontSize: 12, color: '#757575' }}>
            {item.issuedBy}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
));

const CancelledLTO = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { getThemeColor } = useContext(ThemeContext);
  const user = useSelector((state) => state.auth.user);
  const { roleId } = user || {};
  const [cardData, setCardData] = useState([]);
  const { cancelledLTO, loading, error } = useSelector((state) => state.lto);
  const [searchText, setSearchText] = useState('');

  // Fetch getCancelledLTO data from API
  useEffect(() => {
    if (roleId) {
      dispatch(getCancelledLTO());
    }
  }, [dispatch, roleId]);

  useEffect(() => {
    const mappedData = cancelledLTO
      ?.filter((item) => item.isdeleted === 1)
      .map((item) => ({
        id: item.idx,
        ltoId: item.idx?.toString() || '',
        name: item.employeeName || '',
        regNumber: item.regNo || '',
        issuedBy: item.entryusername || '',
        isActive: false,
      }));

    setCardData(mappedData);
  }, [cancelledLTO]);

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

  return (
    <Layout
      type="innerScreen"
      title="Cancelled LTO"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <SearchBox
          placeholder="Search LTO ID"
          value={searchText}
          onChangeText={handleInputChange}
          showSearchButton={false}
        />
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              rowGap: 15,
              paddingHorizontal: 28,
              height: '100%',
              justifyContent:
                filteredResults.length === 0 ? 'center' : 'flex-start',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                rowGap: 12,
                justifyContent:
                  filteredResults.length === 0 ? 'center' : 'flex-start',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => (
                  <Card key={index} item={item} onPress={handlePress} />
                ))
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 500,
                    color: '#9EACBF',
                  }}
                >
                  Loading...
                </Text>
              )}
            </View>
          </View>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    rowGap: 30,
  },
});

export default CancelledLTO;
