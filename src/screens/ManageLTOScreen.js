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

const ManageLTO = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    searchLTO: '',
  });

  const [filteredResults, setFilteredResults] = useState([]);

  const [cardData, setCardData] = useState([
    // {
    //   id: 1,
    //   ltoId: '862',
    //   name: 'Alveena Javed',
    //   regNumber: 'BZB-762',
    //   issuedBy: 'Visha Fatima',
    //   isActive: false,
    // },
    // {
    //   id: 2,
    //   ltoId: '863',
    //   name: 'Samrah Ejaz',
    //   regNumber: 'BVN-631',
    //   issuedBy: 'Visha Fatima',
    //   isActive: false,
    // },
    // {
    //   id: 3,
    //   ltoId: '864',
    //   name: 'Samrah Ejaz',
    //   regNumber: 'BVN-862',
    //   issuedBy: 'Syed Oun Raza Kazmi',
    //   isActive: false,
    // },
    // {
    //   id: 4,
    //   ltoId: '864',
    //   name: 'Zaryab Haider',
    //   regNumber: 'BVN-862',
    //   issuedBy: 'Syed Oun Raza Kazmi',
    //   isActive: false,
    // },
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
    navigation.navigate('ApprovedLTO', { ltoId: item.ltoId }); // Navigate to ApprovedLTO screen with LTO data
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
    if (formData.searchLTO.trim() === '') {
      setFilteredResults(cardData);
    } else {
      const results = cardData.filter((item) =>
        item.ltoId.toLowerCase().includes(formData.searchLTO.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  return (
    <Layout
      type="innerScreen"
      title="LTO for Approval"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <SearchBox
          placeholder="Search LTOs"
          value={formData.searchLTO}
          onChangeText={(value) => handleInputChange('searchLTO', value)}
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
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                rowGap: 12,
                justifyContent:
                  filteredResults.length === 0 ? 'center' : 'flex-start',
              }}
            >
              {/* Check if filteredResults is empty */}
              {filteredResults.length === 0 ? (
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 500,
                    color: '#9EACBF',
                  }}
                >
                  No LTO data available
                </Text>
              ) : (
                // Map over filteredResults if it has items, otherwise use cardData
                (filteredResults.length > 0 ? filteredResults : cardData).map(
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
                          maxWidth: 70,
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
                          LTO ID
                        </Text>
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 16,
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
                  ),
                )
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

export default ManageLTO;
