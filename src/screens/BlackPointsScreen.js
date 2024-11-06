import React, { useContext, useState, useEffect, useMemo } from 'react';
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
import MoreArrow from '@assets/icons/more_arrow.svg';
import LessArrow from '@assets/icons/less_arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '@components/LoadingIndicator';
import { fetchIndividualBlackPointsDetail } from '@redux/actions/reportActions';
import { getViolationVehWiseReport } from '@redux/actions/fleetActions';

const BlackPoints = () => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState([]);
  const [visibleDetails, setVisibleDetails] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const {
    individualBlackPoints,
    loading: reportLoading,
    error: reportError,
  } = useSelector((state) => state.report);
  const {
    violationVehReport,
    loading: fleetLoading,
    error: fleetError,
  } = useSelector((state) => state.fleet);
  const [isIndividualReportLoading, setIsIndividualReportLoading] =
    useState(true);
  const [isViolationReportLoading, setIsViolationReportLoading] =
    useState(true);
  const isDataLoading = isViolationReportLoading && isIndividualReportLoading;
  const { username, employeeId, roleId, region, businessGroup } = user || {};
  const { getThemeColor } = useContext(ThemeContext);

  useEffect(() => {
    const currentDate = new Date();

    // Set 'to' date as the current date
    const toDate = new Date(currentDate);

    // Set 'from' date as the first day of the current year in UTC
    const fromDate = new Date(Date.UTC(currentDate.getFullYear(), 0, 1)); // January 1st at UTC 00:00:00

    // Format dates to 'YYYY-MM-DDTHH:mm:ss.sssZ' with ISO format
    const formatDate = (date) => date.toISOString();

    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate);

    // Update the formData state with the new dates
    setFormData((prevData) => ({
      ...prevData,
      from: formattedFromDate, // e.g., "2024-01-01T00:00:00.000Z"
      to: formattedToDate, // e.g., "2024-10-26T00:00:00.000Z"
    }));
  }, [roleId]);

  const [formData, setFormData] = useState({
    searchLocalID: '',
    from: '',
    to: '',
    ownerName: username,
    localId: employeeId,
    regionName: region,
    businessGroupName: businessGroup,
  });

  useEffect(() => {
    if (formData.from && formData.to) {
      if (roleId === '3') {
        dispatch(
          fetchIndividualBlackPointsDetail(
            formData.from,
            formData.to,
            formData.ownerName,
            formData.localId,
          ),
        ).finally(() => setIsIndividualReportLoading(false));
      } else if (roleId === '1') {
        dispatch(
          getViolationVehWiseReport(
            formData.from,
            formData.to,
            (formData.regionName = ''),
            (formData.businessGroupName = ''),
          ),
        ).finally(() => setIsViolationReportLoading(false));
      } else if (roleId === '16') {
        dispatch(
          getViolationVehWiseReport(
            formData.from,
            formData.to,
            formData.regionName,
            formData.businessGroupName,
          ),
        ).finally(() => setIsViolationReportLoading(false));
      }
    }
  }, [dispatch, roleId, employeeId, region, businessGroup, formData]);

  const toggleCardStatus = (id) => {
    setVisibleDetails((prev) => (prev === id ? null : id)); // Toggle between card IDs
  };

  // Handle input change for search field
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Set card data dynamically based on roleId
  useEffect(() => {
    if (formData.from && formData.to) {
      if (roleId === '3') {
        // Check if there is data to map from the API response
        const mappedData = individualBlackPoints?.Detail
          ? individualBlackPoints.Detail.map((point, index) => {
              // Filter violations by name for count calculations
              const driverSeatBeltCount = individualBlackPoints.Detail.filter(
                (violation) => violation.ViolationName === 'Driver Seat Belt',
              ).length;
              const delayedDriverSeatBeltCount =
                individualBlackPoints.Detail.filter(
                  (violation) =>
                    violation.ViolationName === 'Delayed Driver Seat Belt',
                ).length;
              const passengerSeatBeltCount =
                individualBlackPoints.Detail.filter(
                  (violation) =>
                    violation.ViolationName === 'Passenger Seat Belt',
                ).length;
              const delayedPassengerSeatBeltCount =
                individualBlackPoints.Detail.filter(
                  (violation) =>
                    violation.ViolationName === 'Delayed Passenger Seat Belt',
                ).length;

              // Calculate total violations by checking the length of the Detail array
              const totalViolationsCount = individualBlackPoints.Detail.length;

              return {
                id: index + 1,
                totalPoints: point.Points || '',
                localId: employeeId || '',
                name: point.DriverName || '',
                region: point.region || '',
                driverSeatBelt: driverSeatBeltCount,
                delayedDriverSeatBelt: delayedDriverSeatBeltCount,
                passengerSeatBelt: passengerSeatBeltCount,
                delayedPassengerSeatBelt: delayedPassengerSeatBeltCount,
                total: totalViolationsCount,
                isActive: true,
                //isDetailVisible: false,
              };
            })
          : [];

        setCardData(mappedData || []); // Set the mapped data to cardData
      } else if (roleId === '1') {
        // When roleId is 1, map all black points data
        const mappedData = violationVehReport?.map((point, index) => ({
          id: index + 1,
          totalPoints: point.TotalBlackPoints || 0,
          localId: point.localid || '',
          name: point.DriverName || '',
          region: point.Region || '',
          driverSeatBelt: point.Driver_Seat_Belt || 0,
          delayedDriverSeatBelt: point.Delayed_Driver_Seat_Belt || 0,
          passengerSeatBelt: point.Passenger_Seat_Belt || 0,
          delayedPassengerSeatBelt: point.Delayed_Passenger_Seat_Belt || 0,
          nightExit: point.Night_Exit || 0,
          fatigueAlert: point.Fatigue_Alert || 0,
          total: point.Total_Violation || 0,
          isActive: true,
          //isDetailVisible: false,
        }));

        setCardData(mappedData || []);
      } else if (roleId === '16') {
        // When roleId is 16, map all black points data
        const mappedData = violationVehReport?.map((point, index) => ({
          id: index + 1,
          totalPoints: point.TotalBlackPoints || 0,
          localId: point.localid || '',
          name: point.DriverName || '',
          region: point.Region || '',
          driverSeatBelt: point.Driver_Seat_Belt || 0,
          delayedDriverSeatBelt: point.Delayed_Driver_Seat_Belt || 0,
          passengerSeatBelt: point.Passenger_Seat_Belt || 0,
          delayedPassengerSeatBelt: point.Delayed_Passenger_Seat_Belt || 0,
          nightExit: point.Night_Exit || 0,
          fatigueAlert: point.Fatigue_Alert || 0,
          total: point.Total_Violation || 0,
          isActive: true,
          //isDetailVisible: false,
        }));

        setCardData(mappedData || []);
      }
    }
  }, [roleId, individualBlackPoints, violationVehReport, employeeId]);

  // Filter card data based on searchLocalID
  const filteredCardData = cardData.filter(
    (item) =>
      item.localId &&
      String(item.localId)
        .toLowerCase()
        .includes(formData.searchLocalID.toLowerCase()),
  );

  if (isDataLoading) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <Layout
      type="innerScreen"
      title="Black Points System"
      layoutBgColor={getThemeColor('primary')}
    >
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBoxCard}>
            <TextInput
              style={[{ flex: 1 }]} // TextInput takes all available space
              placeholder="Search Local ID"
              value={formData.searchLocalID}
              onChangeText={(value) =>
                handleInputChange('searchLocalID', value)
              } // Handle text input change
            />
          </View>
        </View>
        <LayoutCard>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              rowGap: 20,
              paddingHorizontal: 28,
              height: '100%',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                rowGap: 15,
                justifyContent:
                  filteredCardData.length === 0 ? 'center' : 'flex-start',
              }}
            >
              {filteredCardData.length === 0 ? (
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 500,
                    color: '#9EACBF',
                  }}
                >
                  No Black Points data available
                </Text>
              ) : (
                filteredCardData.map((item, index) => (
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
                        flexDirection: 'row',
                        columnGap: 12,
                        justifyContent: 'space-between',
                        minHeight: 70,
                        maxHeight: 70,
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
                          {item.totalPoints}
                        </Text>
                        <Text
                          style={{
                            color: '#757575',
                            fontSize: 12,
                            fontWeight: '600',
                          }}
                        >
                          Total Points
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          minHeight: 80,
                          maxHeight: 80,
                        }}
                      >
                        {/* User Name */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            columnGap: 5,
                            width: '100%',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            alignItems: 'center',
                            marginBottom: 12,
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
                        {/* User Detail */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
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
                              Region
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
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              columnGap: 2,
                            }}
                          >
                            <Text style={{ fontSize: 12, color: '#757575' }}>
                              Local ID:
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#000000',
                                fontWeight: '500',
                              }}
                            >
                              {item.localId}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/* User Violations Detail (Toggled) */}
                    {visibleDetails === item.id && (
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
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              alignItems: 'center',
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
                                Driver Seatbelt
                              </Text>
                              <Text style={{ fontSize: 12 }}>
                                {item.driverSeatBelt}
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
                                Delayed Driver Seatbelt
                              </Text>
                              <Text style={{ fontSize: 12 }}>
                                {item.delayedDriverSeatBelt}
                              </Text>
                            </View>
                          </View>
                          {/* User Violations Detail Row 2 */}
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              alignItems: 'center',
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
                                Passenger Seatbelt
                              </Text>
                              <Text style={{ fontSize: 12 }}>
                                {item.passengerSeatBelt}
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
                                Delayed Passenger Seatbelt
                              </Text>
                              <Text style={{ fontSize: 12 }}>
                                {item.delayedPassengerSeatBelt}
                              </Text>
                            </View>
                          </View>
                          {/* User Violations Detail Row 3 */}
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              alignItems: 'center',
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
                                Night Exit
                              </Text>
                              <Text style={{ fontSize: 12 }}>
                                {item.nightExit}
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
                                Fatigue Alert
                              </Text>
                              <Text style={{ fontSize: 12 }}>
                                {item.fatigueAlert}
                              </Text>
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
                            Total Violation:
                          </Text>
                          <Text style={{ textAlign: 'left', fontSize: 12 }}>
                            {item.total}
                          </Text>
                        </View>
                      </View>
                    )}
                    {/* User Action Button */}
                    {
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
                          {visibleDetails === item.id ? (
                            <LessArrow />
                          ) : (
                            <MoreArrow />
                          )}
                        </TouchableOpacity>
                      </View>
                    }
                  </View>
                ))
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

export default BlackPoints;
