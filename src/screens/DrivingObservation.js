import React, { useContext, useState, useEffect } from 'react';
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

const VehicleObservation = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    localID: '',
  });

  const [filteredResults, setFilteredResults] = useState([]);

  const [cardData, setCardData] = useState([
    {
      id: 1,
      localId: '9121',
      obvDate: '18-Feb-2023',
      obvStatus: 'Approved',
      obvNote: 'Refill',
      name: 'Adeel Ikram',
      owner: 'Ghazala Nosheen',
      issuedBy: 'Majid bajwa',
      percentage: '60',
      region: 'Karachi',
      isActive: false,
    },
    {
      id: 2,
      localId: '9111',
      obvDate: '2024-08-17',
      obvStatus: 'Reject',
      obvNote: 'Oil change due',
      name: 'Jubran Sarwar',
      owner: 'Habib Ullah Khan',
      percentage: '80',
      issuedBy: 'Muzaffar Rehman',
      region: 'Lahore',
      isActive: false,
    },
    {
      id: 3,
      localId: '9112',
      obvDate: '15-Feb-2023',
      obvStatus: 'Approved',
      obvNote: 'Cleaning',
      name: 'Usman Khan',
      owner: 'Ali Raza Janjua',
      percentage: '40',
      region: 'Multan',
      issuedBy: 'Muhammad Sohail',
      isActive: false,
    },
    {
      id: 4,
      localId: '3025',
      obvDate: '05-Feb-2023',
      obvStatus: 'Approved',
      obvNote: 'Cleaning',
      name: 'Ghazala Nosheen',
      owner: 'Jawwad Iqbal',
      percentage: '30',
      issuedBy: 'Muhammad Sohail',
      region: 'Karachi',
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
    navigation.navigate('DrivingObservationReport', { localId: item.localId }); // Navigate to ApprovedLTO screen with LTO data
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
        item.localId.toLowerCase().includes(formData.searchID.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  return (
    <Layout
      type="innerScreen"
      title="Driving Observation"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <SearchBox
          placeholder="Local ID"
          value={formData.localID}
          onChangeText={(value) => handleInputChange('localID', value)}
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
                      minHeight: 125,
                      maxHeight: 125,
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
                        Local ID
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        {item.localId}
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
                        {/* Observation Notes */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 2,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#757575' }}>
                            Region:
                          </Text>
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
                        {/* Vehicle No */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 2,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#757575' }}>
                            Driving Performance:
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color:
                                item.percentage >= 50 ? '#00B569' : '#FF0000',
                              fontWeight: 'bold',
                            }}
                          >
                            {item.percentage}%
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
});

export default VehicleObservation;
