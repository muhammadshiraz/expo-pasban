import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import InactiveDot from '@assets/icons/inactive-dot.svg';
import ActiveDot from '@assets/icons/active-dot.svg';
import SearchBox from '@components/SearchBox';

const VehicleObservation = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    searchVehNo: '',
  });

  const [filteredResults, setFilteredResults] = useState([]);

  const [cardData, setCardData] = useState([
    {
      id: 1,
      empId: '9121',
      obvDate: '18-Feb-2023',
      obvStatus: 'Approved',
      obvNote: 'Refill',
      percentage: '80',
      regNumber: 'BZB-762',
      issuedBy: 'Majid bajwa',
      isActive: false,
    },
    {
      id: 2,
      empId: '9111',
      obvDate: '2024-08-17',
      obvStatus: 'Reject',
      obvNote: 'Oil change due',
      percentage: '60',
      regNumber: 'BVN-631',
      issuedBy: 'Muzaffar Rehman',
      isActive: false,
    },
    {
      id: 3,
      empId: '9112',
      obvDate: '15-Feb-2023',
      obvStatus: 'Approved',
      obvNote: 'Cleaning',
      percentage: '40',
      regNumber: 'BVN-862',
      issuedBy: 'Muhammad Sohail',
      isActive: false,
    },
    {
      id: 4,
      empId: '3025',
      obvDate: '05-Feb-2023',
      obvStatus: 'Approved',
      obvNote: 'Cleaning',
      percentage: '30',
      regNumber: 'BVN-863',
      issuedBy: 'Muhammad Sohail',
      isActive: false,
    },
  ]);

  useEffect(() => {
    setFilteredResults(cardData);
  }, []);

  // Function to toggle active/inactive status
  const toggleCardStatus = (id) => {
    setCardData((prevCardData) =>
      prevCardData.map((card) => ({
        ...card,
        isActive: card.id === id, // Only the clicked card will be active
      })),
    );
  };

  const handlePress = (item) => {
    toggleCardStatus(item.id); // Set card as active
    navigation.navigate('VehicleObservationReport', { empId: item.empId }); // Navigate to ApprovedLTO screen with LTO data
  };

  // Handle input change for search field
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    // If the search input is cleared, show all data again
    if (value.trim() === '') {
      setFilteredResults(cardData);
    }
  };

  const handleSearch = () => {
    if (formData.searchID.trim() === '') {
      setFilteredResults(cardData);
    } else {
      const results = cardData.filter((item) =>
        item.empId.toLowerCase().includes(formData.searchID.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  return (
    <Layout
      type="innerScreen"
      title="Vehicle Observation"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <SearchBox
          placeholder="Search Vehicle"
          value={formData.searchVehNo}
          onChangeText={(value) => handleInputChange('searchVehNo', value)}
          onSearch={handleSearch}
        />
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flex: 1,
              flexDirection: 'column',
              rowGap: 15,
              paddingHorizontal: 28,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'column', rowGap: 8 }}>
              {(filteredResults.length > 0 ? filteredResults : cardData).map(
                (item, index) => (
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
                    onPress={() => handlePress(item)}
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
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        Veh No
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        {item.regNumber}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        rowGap: 8,
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
                            columnGap: 8,
                          }}
                        >
                          <Image
                            source={
                              item.percentage >= 50
                                ? require('@assets/icons/green-verify-64.png')
                                : require('@assets/icons/red-verify-64.png')
                            }
                            style={styles.verifyIcon}
                            resizeMode="contain"
                          />
                          <Text
                            style={[
                              styles.percentage,
                              {
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 2,
                                color:
                                  item.percentage >= 50 ? '#00B569' : '#FF0000',
                              },
                            ]}
                          >
                            {item.percentage}%
                          </Text>
                        </View>
                        {/* {item.isActive ? <ActiveDot /> : <InactiveDot />} */}
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                        }}
                      >
                        {/* Observation Date */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 2,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#757575' }}>
                            Observation Date:
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#000000',
                              fontWeight: '500',
                            }}
                          >
                            {item.obvDate}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
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
  verifyIcon: {
    width: 25,
    height: 25,
  },
});

export default VehicleObservation;
