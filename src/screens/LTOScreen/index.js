import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import Layout from '@components/Layout';
import ProgressCircle from '@components/ProgressCircle';
import ProgressRectangle from '@components/ProgressRectangle';
import { ThemeContext } from '@context/ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import HeadingComponent from '@components/HeadingComponent';
import DownloadButtons from '@components/DownloadButtons';
import HorizontalTabs from '@components/HorizontalTabs';
import Slick from 'react-native-slick';
import Card from '@components/Card';
import LayoutCard from '@components/LayoutCard';
import CountCard from '@components/CountCard';
import ReIcon from '@assets/icons/re-icon.svg';
import VaIcon from '@assets/icons/va-icon.svg';
import AtIcon from '@assets/icons/at-icon.svg';
import EltoIcon from '@assets/icons/elto-icon.svg';
import PltoIcon from '@assets/icons/plto-icon.svg';
import DDCVector from '@assets/icons/ddc-vector.svg';
import QZVector from '@assets/icons/qz-vector.svg';
import BgVector from '@assets/icons/bg-vector.svg';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLTOStats,
  getVehiclesStats,
  getDDCStatus,
  getEmpTrainingStats,
  getDocumentsStatus,
} from '@redux/actions/ltoActions';

const LTOScreen = () => {
  const { getThemeColor } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { userId, roleId } = user || {};
  const {
    ltoStats,
    vehiclesStats,
    ddcStatus,
    empTrainingStats,
    documentsStatus,
    loading,
    error,
  } = useSelector((state) => state.lto);

  useEffect(() => {
    if (userId && roleId) {
      dispatch(getLTOStats(userId, roleId));
      dispatch(getVehiclesStats(userId, roleId));
      dispatch(getDDCStatus(userId, roleId));
      dispatch(getEmpTrainingStats(userId, roleId));
      dispatch(getDocumentsStatus(userId, roleId));
    }
  }, [dispatch, userId, roleId]);

  const {
    RegisteredUsers = [],
    RegisteredProfilesAssignedVeh = [],
    ActiveLTO = [],
    ExpiredLTO = [],
    PendingLTO = [],
  } = ltoStats || {};

  const {
    TotalVehicles = [],
    AdminCarPool = [],
    ParkedVehicle = [],
    BusinessGroupWise = [],
    UnaddedVehicles = [],
  } = vehiclesStats || {};

  const combinedTotalVehLength = TotalVehicles.length + UnaddedVehicles.length;

  const {
    Table: ddcTable = [],
    Table1: ddcTable1 = [],
    Table2: ddcTable2 = [],
    Table3: ddcTable3 = [],
  } = ddcStatus || {};

  const combinedDDCStatusLength = ddcTable.length + ddcTable2.length;

  const { Table: empTrainingTable = [], Table1: empTrainingTable1 = [] } =
    empTrainingStats || {};

  const {
    Table: documentsStatusTable = [],
    Table1: documentsStatusTable1 = [],
    Table2: documentsStatusTable2 = [],
    Table3: documentsStatusTable3 = [],
    Table4: documentsStatusTable4 = [],
    Table5: documentsStatusTable5 = [],
  } = documentsStatus || {};

  const progressCirclesData = [
    {
      id: '1',
      icon: <ReIcon width={14} height={14} />,
      progress: RegisteredUsers.length,
      maxProgress: 441,
      progressText: 'Registered Employees',
      color: '#4A90E2',
    },
    {
      id: '2',
      icon: <VaIcon width={16} height={16} />,
      progress: RegisteredProfilesAssignedVeh.length,
      maxProgress: 200,
      progressText: 'Vehicles Assigned',
      color: '#50C878',
    },
    {
      id: '3',
      icon: <AtIcon width={16} height={16} />,
      progress: ActiveLTO.length,
      maxProgress: 100,
      progressText: 'Active LTOs',
      color: '#FF9933',
    },
    {
      id: '4',
      icon: <EltoIcon width={16} height={16} />,
      progress: ExpiredLTO.length,
      maxProgress: 41,
      progressText: 'Expired LTOs',
      color: '#1E90FF',
      gradientColors: ['#1E90FF', '#cccccc'], // Dodger Blue gradient
    },
    {
      id: '5',
      icon: <PltoIcon width={18} height={18} />,
      progress: PendingLTO.length,
      maxProgress: 372,
      progressText: 'Pending LTOs',
      color: '#F8C855',
      gradientColors: ['#F8C855', '#cccccc'], // Yellow to Orange gradient
    },
  ];

  // Determine the maximum progress value from data
  const maxProgress = Math.max(
    ...progressCirclesData.map((item) => item.progress),
  );

  const renderProgressCircle = ({ item }) => (
    <View
      style={[styles.itemContainer, { alignItems: 'flex-start' }]}
      key={item.id}
    >
      <ProgressCircle
        size={75}
        strokeWidth={3}
        progress={item.progress}
        maxProgress={maxProgress}
        progressText={item.progressText}
        color={item.color}
        backgroundColor="#ecf0f1"
        icon={item.icon}
      />
    </View>
  );

  const renderProgressRectangle = ({ item }) => (
    <View
      style={[styles.itemContainer, { alignItems: 'center' }]}
      key={item.id}
    >
      <ProgressRectangle
        size={75}
        strokeWidth={3}
        progress={item.progress}
        maxProgress={maxProgress}
        progressText={item.progressText}
        gradientColors={item.color}
        backgroundColor="#ecf0f1"
        icon={item.icon}
      />
    </View>
  );

  // Data for CountCard
  const countTVCardData = [
    { count: AdminCarPool.length, label: 'Admin / Pool Vehicles' },
    {
      count: BusinessGroupWise.filter((item) => item.bgName === 'Ice Cream')
        .length,
      label: 'Ice Cream',
    },
    {
      count: BusinessGroupWise.filter((item) => item.bgName === 'Foods').length,
      label: 'Foods',
    },
    {
      count: BusinessGroupWise.filter((item) => item.bgName === 'General Trade')
        .length,
      label: 'General\nTrade',
    },
    {
      count: BusinessGroupWise.filter(
        (item) => item.bgName === 'Unilever Pakistan Limited',
      ).length,
      label: 'Unilever\nPakistan Ltd',
    },
    {
      count: BusinessGroupWise.filter((item) => item.bgName === 'ECOM').length,
      label: 'ECOM',
    },

    {
      count: BusinessGroupWise.filter((item) => item.bgName === 'WPS').length,
      label: 'WPS',
    },
    {
      count: BusinessGroupWise.filter((item) => item.bgName === 'Supply Chain')
        .length,
      label: 'Supply Chain',
    },
    { count: ParkedVehicle.length, label: 'Parked Vehicles' },
  ];

  const countQzCardData = [
    { count: ddcTable.length, label: 'Managers With Active DDC' },
    { count: ddcTable1.length, label: 'Managers With Exp DDC' },

    { count: ddcTable2.length, label: 'Drivers With Active DDC' },
    { count: ddcTable3.length, label: 'Drivers With Exp DDC' },
  ];

  const countQSCardData = [
    { count: empTrainingTable.length, label: 'Quiz Takers' },
    { count: empTrainingTable.length, label: 'Passed' },
    { count: empTrainingTable.length, label: 'Failed' },

    {
      count: empTrainingTable1.length,
      label: 'Quiz Takers',
    },
    {
      count: empTrainingTable1.filter((item) => item.Result === 'PASSED')
        .length,
      label: 'Passed',
    },
    {
      count: empTrainingTable1.filter((item) => item.Result === 'FAILED')
        .length,
      label: 'Failed',
    },
  ];

  const countMgrCardData = [
    { count: documentsStatusTable.length, label: 'Driving\nLicense Exp' },
    { count: documentsStatusTable1.length, label: 'Driving License\nExp Soon' },
    { count: documentsStatusTable2.length, label: 'DDC\nExp Soon' },
  ];

  const countDvrCardData = [
    { count: documentsStatusTable3.length, label: 'Driving\nLicense Exp' },
    { count: documentsStatusTable4.length, label: 'Driving License\nExp Soon' },
    { count: documentsStatusTable5.length, label: 'DDC\nExp Soon' },
  ];

  const cards = [
    {
      slide: (
        <View
          style={[
            {
              flex: 1,
              minHeight: 250,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Text
              style={{
                color: '#787878',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              Swap left for DDC Statistics
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 900 }}>
                  {combinedTotalVehLength}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#787878',
                  }}
                >
                  Total Vehicles
                </Text>
              </View>
              <DDCVector />
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#DBDBDB',
              paddingVertical: 8,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              # of Vehicles by Business Groups
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap', // Allow wrapping
            }}
          >
            {countTVCardData.map((data, index) => {
              const isLastRow =
                index >= countTVCardData.length - (countTVCardData.length % 3);
              const isLastCardAlone =
                isLastRow && countTVCardData.length % 3 === 1;

              return (
                <View
                  key={index}
                  style={{
                    maxWidth: 100,
                    flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                    marginBottom: 12, // Spacing between rows
                    alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                  }}
                >
                  <View style={{ width: 100, height: 80 }}>
                    <CountCard count={data.count} label={data.label} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ),
    },
    {
      slide: (
        <View
          style={[
            {
              flex: 1,
              minHeight: 420,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Text
              style={{
                color: '#787878',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              Swap left for Quiz Statistics
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 900 }}>
                  {combinedDDCStatusLength}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#787878',
                  }}
                >
                  Active DDCs
                </Text>
              </View>
              <QZVector />
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#DBDBDB',
              paddingVertical: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              DDC Statistics
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'left',
              paddingVertical: 8,
              marginBottom: 12,
              borderBottomWidth: 1,
              borderColor: '#DBDBDB',
            }}
          >
            Managers
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap', // Allow wrapping
              marginBottom: 12,
              columnGap: 14,
            }}
          >
            {countQzCardData.slice(0, 2).map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    maxWidth: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 12,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ width: '100%', height: 80 }}>
                    <CountCard count={data.count} label={data.label} />
                  </View>
                </View>
              );
            })}
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'left',
              paddingVertical: 8,
              marginBottom: 12,
              borderBottomWidth: 1,
              borderColor: '#DBDBDB',
            }}
          >
            Drivers
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap', // Allow wrapping
              marginBottom: 12,
              columnGap: 14,
            }}
          >
            {countQzCardData.slice(2, 4).map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    maxWidth: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 12,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ width: '100%', height: 80 }}>
                    <CountCard count={data.count} label={data.label} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ),
    },
    {
      slide: (
        <View
          style={[
            {
              flex: 1,
              minHeight: 450,
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'start',
            }}
          >
            <Text
              style={{
                color: '#787878',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              Swap left for Business Groups
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 900 }}>
                  DDC HO 7 June 24
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: '#787878',
                  }}
                >
                  Last DDC Quiz Conducted
                </Text>
              </View>
              <BgVector />
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#DBDBDB',
              paddingVertical: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              DDC Quiz Statistics
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap', // Allow wrapping
              columnGap: 14,
            }}
          >
            {countQSCardData.slice(0, 3).map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    maxWidth: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 12,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ width: '100%', height: 80 }}>
                    <CountCard count={data.count} label={data.label} />
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#DBDBDB',
              paddingVertical: 8,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Past 18 Months Quiz Statistics
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap', // Allow wrapping
              marginBottom: 12,
              columnGap: 14,
            }}
          >
            {countQSCardData.slice(3, 6).map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    maxWidth: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 12,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ width: '100%', height: 80 }}>
                    <CountCard count={data.count} label={data.label} />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ),
    },
  ];

  if (loading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error fetching LTO Stats: {error}</Text>
      </View>
    );
  }

  return (
    <Layout
      type="innerScreen"
      title="LTO Statistics"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flex: 1,
              rowGap: 15,
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.boxesContainer}>
              {progressCirclesData
                .slice(0, 3)
                .map((item, index) => renderProgressCircle({ item, index }))}
            </View>
            <View style={styles.fullBoxesContainer}>
              {progressCirclesData
                .slice(3, 5)
                .map((item, index) => renderProgressRectangle({ item, index }))}
            </View>
            {/* # of Vehicles by Business Groups */}
            <Card>
              <Slick
                style={styles.wrapper}
                showsButtons={false}
                autoplay={false}
                loop={true}
                showsPagination={true}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
              >
                {cards.map((item, index) => (
                  <View key={index} style={[styles.cardsContainer]}>
                    {item.slide}
                  </View>
                ))}
              </Slick>

              {/* <View>
                <Text
                  style={{
                    color: '#787878',
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 10,
                  }}
                >
                  Swap left for DDC Statistics
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: 900 }}>422</Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: '#787878',
                      }}
                    >
                      Total Vehicles
                    </Text>
                  </View>
                  <DDCVector />
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#DBDBDB',
                    paddingVertical: 8,
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    # of Vehicles by Business Groups
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap', // Allow wrapping
                  }}
                >
                  {countTVCardData.map((data, index) => {
                    const isLastRow =
                      index >=
                      countTVCardData.length - (countTVCardData.length % 3);
                    const isLastCardAlone =
                      isLastRow && countTVCardData.length % 3 === 1;

                    return (
                      <View
                        key={index}
                        style={{
                          maxWidth: 100,
                          flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                          marginBottom: 12, // Spacing between rows
                          alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                        }}
                      >
                        <View style={{ width: 100, height: 80 }}>
                          <CountCard count={data.count} label={data.label} />
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View> */}
            </Card>
            {/* Documents Expired / Expiring Soon */}
            <Card>
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Documents Expired / Expiring Soon
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  paddingVertical: 8,
                  marginBottom: 12,
                  borderBottomWidth: 1,
                  borderColor: '#DBDBDB',
                }}
              >
                Managers
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap', // Allow wrapping
                }}
              >
                {countMgrCardData.map((data, index) => {
                  const isLastRow =
                    index >=
                    countMgrCardData.length - (countMgrCardData.length % 3);
                  const isLastCardAlone =
                    isLastRow && countMgrCardData.length % 3 === 1;

                  return (
                    <View
                      key={index}
                      style={{
                        flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                        marginBottom: 12, // Spacing between rows
                        alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                      }}
                    >
                      <View style={{ width: '100%', height: 80 }}>
                        <CountCard count={data.count} label={data.label} />
                      </View>
                    </View>
                  );
                })}
              </View>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'left',
                  paddingVertical: 8,
                  marginBottom: 12,
                  borderBottomWidth: 1,
                  borderColor: '#DBDBDB',
                }}
              >
                Drivers
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap', // Allow wrapping
                }}
              >
                {countDvrCardData.map((data, index) => {
                  const isLastRow =
                    index >=
                    countDvrCardData.length - (countDvrCardData.length % 3);
                  const isLastCardAlone =
                    isLastRow && countDvrCardData.length % 3 === 1;

                  return (
                    <View
                      key={index}
                      style={{
                        maxWidth: 110,
                        flexBasis: isLastCardAlone ? '100%' : '30%', // Make the last card take full width if it's alone
                        marginBottom: 12, // Spacing between rows
                        alignItems: isLastCardAlone ? 'center' : 'flex-start', // Center the last card if it's alone, otherwise align normally
                      }}
                    >
                      <View style={{ width: '100%', height: 80 }}>
                        <CountCard count={data.count} label={data.label} />
                      </View>
                    </View>
                  );
                })}
              </View>
            </Card>
          </View>
        </LayoutCard>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 30,
  },
  text: {
    fontSize: 16,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 5,
  },
  boxesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
    columnGap: 32,
  },
  fullBoxesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    columnGap: 18,
    marginBottom: 5,
  },
  itemContainer: {
    flex: 1,
  },
  cardHeader: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  slickContainer: {
    width: '100%',
    maxHeight: '100%',
  },
  wrapper: {
    height: 430,
  },
  activeDot: {
    top: 60,
  },
  dot: {
    top: 60,
  },
});

export default LTOScreen;
