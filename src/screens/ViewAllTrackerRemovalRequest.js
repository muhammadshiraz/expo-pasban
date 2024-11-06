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

const ViewAllTrackerRemovalRequest = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    searchComplainID: '',
  });

  const [filteredResults, setFilteredResults] = useState([]);

  const [cardData, setCardData] = useState([
    {
      id: 1,
      comId: '9121',
      reg: 'BRT-840',
      comStatus: 'Removal',
      date: 'May 27, 2024',
      status: 'Completed',
      isActive: false,
    },
    {
      id: 2,
      comId: '8152',
      reg: 'BVT-960',
      comStatus: 'Removal',
      date: 'February 8, 2023',
      status: 'Received',
      isActive: false,
    },
    {
      id: 3,
      comId: '3025',
      reg: 'OIT-832',
      comStatus: 'Removal',
      date: 'March 6, 2023',
      status: 'Pending',
      isActive: false,
    },
    {
      id: 4,
      comId: '3025',
      reg: 'KOI-023',
      comStatus: 'Removal',
      date: 'June 8, 2023',
      status: 'Rejected',
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
    // navigation.navigate('ViewAllTrackerRemovalRequestReport', {
    //   comId: item.comId,
    // });
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
    if (formData.searchComplainID.trim() === '') {
      setFilteredResults(cardData);
    } else {
      const results = cardData.filter((item) =>
        item.comId
          .toLowerCase()
          .includes(formData.searchComplainID.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  return (
    <Layout
      type="innerScreen"
      title="Tracker Removal Request"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        {/* Search Box */}
        <SearchBox
          placeholder="Search Complain ID"
          value={formData.searchComplainID}
          onChangeText={(value) => handleInputChange('searchComplainID', value)}
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
                      justifyContent: 'flex-start',
                      backgroundColor: '#ffffff',
                      borderColor: item.isActive ? '#006EDA' : '#9B9B9B',
                      borderWidth: 1,
                      minHeight: 115,
                      maxHeight: 115,
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
                        Reg #
                      </Text>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        {item.comId}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        rowGap: 0,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignContent: 'flex-start',
                          height: 65,
                        }}
                      >
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
                            Vehicle No:
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#000000',
                              fontWeight: '500',
                            }}
                          >
                            {item.reg}
                          </Text>
                        </View>
                        {/* Request For */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 2,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#757575' }}>
                            Request For:
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#000000',
                              fontWeight: '500',
                            }}
                          >
                            {item.comStatus}
                          </Text>
                        </View>
                        {/* Request On */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 2,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#757575' }}>
                            Request On:
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#000000',
                              fontWeight: '500',
                            }}
                          >
                            {item.date}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.status,
                          {
                            backgroundColor:
                              item.status === 'Pending'
                                ? 'orange'
                                : item.status === 'Received'
                                ? '#FFD700' // Gold for better contrast
                                : item.status === 'Completed'
                                ? '#00B569' // Green
                                : item.status === 'Rejected'
                                ? '#D32F2F' // Strong Red for better readability
                                : 'transparent', // fallback for any other statuses
                          },
                        ]}
                      >
                        {item.status}
                      </Text>
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
    position: 'relative',
  },
  verifyIcon: {
    width: 25,
    height: 25,
  },
  status: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    fontSize: 12,
    color: 'white',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});

export default ViewAllTrackerRemovalRequest;
