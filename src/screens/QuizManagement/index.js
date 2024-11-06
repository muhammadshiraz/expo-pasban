import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '@components/Layout';
import { ThemeContext } from '@context/ThemeContext';
import LayoutCard from '@components/LayoutCard';
import SolarUser from '@assets/icons/solar_user-bold.svg';
import MoreArrow from '@assets/icons/more_arrow.svg';
import LessArrow from '@assets/icons/less_arrow.svg';

const QuizManagement = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    searchQuizName: '',
  });

  const [cardData, setCardData] = useState([
    {
      id: 1,
      totalDuration: '500',
      quizName: 'Karachi IC/HO DDC 8th Oct 2024',
      quiz: 'ACTUAL DDC Quiz',
      allowAtt: '2',
      isActive: true,
      isDetailVisible: false,
    },
    {
      id: 2,
      totalDuration: '300',
      quizName: 'Karachi IC/HO DDC 8th Oct 2023',
      quiz: 'ACTUAL DDC Quiz',
      allowAtt: '3',
      isActive: true,
      isDetailVisible: false,
    },
    {
      id: 3,
      totalDuration: '200',
      quizName: 'Karachi IC/HO DDC 8th Oct 2020',
      quiz: 'ACTUAL DDC Quiz',
      allowAtt: '5',
      isActive: true,
      isDetailVisible: false,
    },
    {
      id: 4,
      totalDuration: '400',
      quizName: 'Karachi IC/HO DDC 8th Oct 2019',
      quiz: 'ACTUAL DDC Quiz',
      allowAtt: '3',
      isActive: true,
      isDetailVisible: false,
    },
  ]);

  // Toggle visibility of violations details
  const toggleCardStatus = (id) => {
    setCardData((prevData) =>
      prevData.map((item) => ({
        ...item,
        isDetailVisible: item.id === id ? !item.isDetailVisible : false,
      })),
    );
  };

  // Handle input change for search field
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Filter card data based on searchLocalID
  // Filter card data based on searchQuizName
  const filteredCardData = cardData.filter((item) =>
    item.quizName.toLowerCase().includes(formData.searchQuizName.toLowerCase()),
  );

  return (
    <Layout
      type="innerScreen"
      title="Quiz Management"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBoxCard}>
            <TextInput
              style={[{ flex: 1 }]} // TextInput takes all available space
              placeholder="Search Quiz Name"
              value={formData.searchQuizName}
              onChangeText={(value) =>
                handleInputChange('searchQuizName', value)
              } // Handle text input change
            />
          </View>
        </View>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('EditQuiz')}
              style={{
                flexDirection: 'column',
                rowGap: 20,
                justifyContent: 'space-between',
              }}
            >
              {filteredCardData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'column',
                    rowGap: 15,
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                    borderColor: '#757575',
                    borderWidth: 1,
                    borderRadius: 6,
                    paddingHorizontal: 15,
                    paddingTop: 15,
                  }}
                  onPress={() => toggleCardStatus(item.id)}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      columnGap: 12,
                      justifyContent: 'flex-start',
                      minHeight: 60,
                      maxHeight: 60,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: 90,
                        rowGap: 2,
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: '#9B9B9B',
                      }}
                    >
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 20,
                          fontWeight: '600',
                        }}
                      >
                        {item.totalDuration}
                      </Text>
                      <Text
                        style={{
                          color: '#757575',
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        Total Duration
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 70,
                        maxHeight: 70,
                      }}
                    >
                      {/* User Name */}
                      <View
                        style={{
                          flexDirection: 'row',
                          columnGap: 0,
                          width: '100%',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          alignItems: 'flex-start',
                          marginBottom: 7,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            columnGap: 8,
                          }}
                        >
                          {/* <SolarUser /> */}
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              marginTop: 2,
                            }}
                          >
                            {item.quizName}
                          </Text>
                        </View>
                      </View>
                      {/* User Detail */}
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignContent: 'center',
                          columnGap: 12,
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
                            Quiz:
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#000000',
                              fontWeight: '500',
                            }}
                          >
                            {item.quiz}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 2,
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#757575' }}>
                            Attempts:
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#000000',
                              fontWeight: '500',
                            }}
                          >
                            {item.allowAtt}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* User Violations Detail (Toggled) */}
                  {item.isDetailVisible && (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                        alignContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          rowGap: 10,
                          alignItems: 'center',
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#DEDEDE',
                          width: '100%',
                          alignContent: 'center',
                          paddingVertical: 8,
                        }}
                      >
                        {/* User Violations Detail Row 1 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            columnGap: 20,
                            alignItems: 'flex-start',
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Session Name
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                              Karachi IC/HO DDC 8th Oct 2024
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Quiz
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                              ACTUAL DDC Quiz
                            </Text>
                          </View>
                        </View>
                        {/* User Violations Detail Row 2 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            columnGap: 20,
                            alignItems: 'flex-start',
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Validity
                            </Text>
                            <Text style={{ fontSize: 12 }}>18 months</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Attempts Allowed
                            </Text>
                            <Text style={{ fontSize: 12 }}>2</Text>
                          </View>
                        </View>
                        {/* User Violations Detail Row 3 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            columnGap: 20,
                            alignItems: 'flex-start',
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Total Duration
                            </Text>
                            <Text style={{ fontSize: 12 }}>500 Minutes</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Session Date
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                              October 8, 2024 at 3:00:00 PM
                            </Text>
                          </View>
                        </View>
                        {/* User Violations Detail Row 4 */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            columnGap: 20,
                            alignItems: 'flex-start',
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'column',
                              rowGap: 2,
                            }}
                          >
                            <Text style={{ color: '#757575', fontSize: 12 }}>
                              Passing Criteria
                            </Text>
                            <Text style={{ fontSize: 12 }}>80</Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          columnGap: 4,
                          paddingTop: 15,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'left',
                            color: '#757575',
                            fontSize: 12,
                          }}
                        >
                          Remarks
                        </Text>
                        <Text style={{ textAlign: 'left', fontSize: 12 }}>
                          none
                        </Text>
                      </View>
                    </View>
                  )}
                  {/* User Action Button */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      borderTopWidth: 1,
                      borderColor: '#DEDEDE',
                      width: '100%',
                      marginVertical: 'auto',
                      alignContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        width: '100%',
                        alignContent: 'center',
                        paddingVertical: 12,
                        alignItems: 'center',
                      }}
                      onPress={() => toggleCardStatus(item.id)}
                    >
                      {item.isDetailVisible ? <LessArrow /> : <MoreArrow />}
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </TouchableOpacity>
          </View>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    rowGap: 30,
    height: '100%',
  },
  searchBoxContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 30,
    minHeight: 50,
    maxHeight: 50,
  },
  searchBoxCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default QuizManagement;
