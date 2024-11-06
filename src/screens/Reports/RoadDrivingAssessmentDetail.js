import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import InvoiceLayout from '@components/InvoiceLayout';
import Car from '@assets/icons/alsvin.svg';
import CarLogo from '@assets/icons/alsvin_logo.svg';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getDrivingObservationsReport } from '@redux/actions/reportActions';

const RoadDrivingAssessmentDetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { startDate, endDate, itemData } = route.params;
  const [detailData, setDetailData] = useState(null);
  const allDrivingObservationsDetails = useSelector(
    (state) => state.report.fetchDrivingObservationsReport,
  );
  const reportData = allDrivingObservationsDetails || {};

  useEffect(() => {
    if (!reportData.length) {
      dispatch(getDrivingObservationsReport(startDate, endDate));
    } else {
      const itemDetail = reportData.find((item) => item.ID === itemData.id);
      setDetailData(itemDetail);
    }
  }, [reportData, itemData.id, dispatch]);

  const CarUserInfoRow = ({ label, value }) => (
    <View style={styles.carUserInfoRow}>
      <Text style={{ fontSize: 12, color: '#757575' }}>{label}</Text>
      <Text style={{ fontSize: 12, fontWeight: 'medium', color: '#000000' }}>
        {value}
      </Text>
    </View>
  );

  const formatDate = (date) => new Date(date).toLocaleDateString();

  if (!detailData) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <InvoiceLayout>
      <View style={styles.container}>
        {/* Car Info */}
        <View style={styles.carInfo}>
          <Car />
          <CarLogo />
          <View style={styles.ltoContent}>
            <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
              Local ID # {detailData.DriverID}
            </Text>
          </View>
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow label="Owner" value={detailData.DriverName} />
          <CarUserInfoRow label="Region" value={detailData.Region} />
          <CarUserInfoRow label="Date" value={detailData.observationdate} />
          <CarUserInfoRow
            label="Last Obs."
            value={detailData.LastObservationDate}
          />
          <CarUserInfoRow
            label="Business Group"
            value={detailData.BusinessGroup}
          />
          <CarUserInfoRow label="Designation" value={detailData.Designation} />
          <CarUserInfoRow
            label="Line Manager"
            value={detailData.LineManager || 'N/A'}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Obs. All Sides"
            value={detailData.ObserveAllSides}
          />
          <CarUserInfoRow
            label="Fasten Safety Belt"
            value={detailData.FastenSafetyBelt}
          />
          <CarUserInfoRow
            label="Checks Passenger For Safety Belt"
            value={detailData.ChecksPassengerForSafetyBelt}
          />
          <CarUserInfoRow
            label="Gets In The Proper Lane In Time"
            value={detailData.GetsInTheProperLaneInTime}
          />
          <CarUserInfoRow
            label="Speed On Curve"
            value={detailData.SpeedOnCurve}
          />
          <CarUserInfoRow label="Curve Path" value={detailData.CurvePath} />
          <CarUserInfoRow label="Is Confident" value={detailData.IsConfident} />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow label="Is Relaxed" value={detailData.IsRelaxed} />
          <CarUserInfoRow
            label="Tolerates Bad Driving Of Others"
            value={detailData.ToleratesBadDrivingOfOthers}
          />
          <CarUserInfoRow
            label="Is Considerate To Pedestrians"
            value={detailData.IsConsiderateToPedestrians}
          />
          <CarUserInfoRow label="Plans" value={detailData.Plans} />
          <CarUserInfoRow
            label="Checks Sides & Behind"
            value={detailData.ChecksSidesAndBehind}
          />
          <CarUserInfoRow
            label="Checks Blind Spots"
            value={detailData.ChecksBlindSpots}
          />
          <CarUserInfoRow
            label="Reverses Carefully"
            value={detailData.ReversesCarefully}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Reverses Correctly"
            value={detailData.ReversesCorrectly}
          />
          <CarUserInfoRow label="Scans Ahead" value={detailData.ScansAhead} />
          <CarUserInfoRow label="Uses Mirrors" value={detailData.UsesMirrors} />
          <CarUserInfoRow
            label="Observes Road Signs"
            value={detailData.ObservesRoadSigns}
          />
          <CarUserInfoRow
            label="Maintains Safe Distance"
            value={detailData.MaintainsSafeDistance}
          />
          <CarUserInfoRow
            label="Anticipates Actions Of Others"
            value={detailData.AnticipatesActionsOfOthers}
          />
          <CarUserInfoRow
            label="Clearance When Passing"
            value={detailData.ClearanceWhenPassing}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Signals On Time"
            value={detailData.SignalsOnTime}
          />
          <CarUserInfoRow
            label="Checks Blind Spots While Driving"
            value={detailData.ChecksBlindSpotsDrvg}
          />
          <CarUserInfoRow
            label="Drives At Safe Speed"
            value={detailData.DrivesAtSafeSpeed}
          />
          <CarUserInfoRow
            label="Observes Vehicle Position"
            value={detailData.ObservesVehiclePosition}
          />
          <CarUserInfoRow
            label="Incident This Month"
            value={detailData.AnyIncidentInThisMonth}
          />
          <CarUserInfoRow label="Distance" value={detailData.distance} />
          <CarUserInfoRow label="Inspection" value={detailData.inspection} />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Safe Distance Front"
            value={detailData.safedistancefront}
          />
          <CarUserInfoRow
            label="Safe Distance Back"
            value={detailData.safedistanceback}
          />
          <CarUserInfoRow label="Brakes" value={detailData.brakes} />
          <CarUserInfoRow
            label="Comments"
            value={detailData.comments || 'N/A'}
          />
          <CarUserInfoRow
            label="Percentage"
            value={detailData.percentage1 + '%'}
          />
          <CarUserInfoRow label="Entered By" value={detailData.enteredby} />
          <CarUserInfoRow label="Entery Date" value={detailData.EnteredOn} />
        </View>
      </View>
    </InvoiceLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carInfo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 14,
  },
  ltoContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 2,
  },
  carUserInfo: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#DEDEDE',
    borderTopWidth: 1,
    width: '100%',
    marginTop: 12,
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 10,
  },
  carUserInfoRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 14,
  },
  carUserStatus: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    borderColor: '#DEDEDE',
    borderBottomWidth: 1,
  },
  carUserStatusRow: {
    flex: 1,
    borderColor: '#DEDEDE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    paddingBottom: 5,
    marginBottom: 8,
  },
  carUserContentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginBottom: 5,
    columnGap: 30,
  },
});

export default RoadDrivingAssessmentDetail;
