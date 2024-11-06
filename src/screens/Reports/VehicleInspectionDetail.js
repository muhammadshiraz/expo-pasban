import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import InvoiceLayout from '@components/InvoiceLayout';
import Car from '@assets/icons/alsvin.svg';
import CarLogo from '@assets/icons/alsvin_logo.svg';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchVehicleInspectionReport } from '@redux/actions/reportActions';

const VehicleInspectionDetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { startDate, endDate, region, itemData } = route.params;
  const [detailData, setDetailData] = useState(null);
  const allVehInspectionDetails = useSelector(
    (state) => state.report.fetchVehicleInspectionReport,
  );
  const reportData =
    allVehInspectionDetails?.['Vehicle Observation Data'] || [];

  useEffect(() => {
    if (!reportData.length) {
      dispatch(getFetchVehicleInspectionReport(startDate, endDate, region));
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
              Vehicle No # {detailData.VehicleNo}
            </Text>
            <Text
              style={{ color: '#757575', fontSize: 14, fontWeight: 'semibold' }}
            >
              Employee No # {detailData.EmployeeNo}
            </Text>
          </View>
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow label="Date" value={detailData.Date} />
          <CarUserInfoRow label="Driver Name" value={detailData.Name} />
          <CarUserInfoRow
            label="Business Group"
            value={detailData.BusinessGroup}
          />
          <CarUserInfoRow label="Designation" value={detailData.Designation} />
          <CarUserInfoRow label="Line Manager" value={detailData.LineManager} />
          <CarUserInfoRow label="Region" value={detailData.Region} />
          <CarUserInfoRow label="Assessee" value={detailData.Assessee} />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Fuel For One Tour"
            value={detailData.FuelForOneTour}
          />
          <CarUserInfoRow
            label="Radiator Water Bottle Filled"
            value={detailData.RadiatorWaterBottleFilled}
          />
          <CarUserInfoRow
            label="Wind Screen Water Bottle Filled"
            value={detailData.WindScreenWaterBottleFilled}
          />
          <CarUserInfoRow
            label="Engine Oil Greater Than Level"
            value={detailData.EngineOilGreaterThanLevel}
          />
          <CarUserInfoRow
            label="Brake Reservoir Level"
            value={detailData.BrakeReservoirLevel}
          />
          <CarUserInfoRow
            label="Clutch Reservoir Level"
            value={detailData.ClutchReservoirLevel}
          />
          <CarUserInfoRow
            label="Ignition Switch Working"
            value={detailData.IgnitionSwitchWorking}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Parts Working"
            value={detailData.PartsWorking}
          />
          <CarUserInfoRow
            label="Radiator Fan Working"
            value={detailData.RadiatorFanWorking}
          />
          <CarUserInfoRow
            label="Tire Pressure OK"
            value={detailData.TirePressureOK}
          />
          <CarUserInfoRow
            label="Paddle Rubber Good Condition"
            value={detailData.PaddleRubberGoodCondition}
          />
          <CarUserInfoRow
            label="Wiper Rubber Good Condition"
            value={detailData.WiperRubberGoodCondition}
          />
          <CarUserInfoRow
            label="Wiper Working Good Condition"
            value={detailData.WiperWorkingGoodCondition}
          />
          <CarUserInfoRow
            label="Is Vehicle Damage"
            value={detailData.IsVehicleDamage}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Vehicle Log Fill On Time"
            value={detailData.VehicleLogFillOnTime}
          />
          <CarUserInfoRow
            label="Extra Tire Stupnee Good Condition"
            value={detailData.ExtraTireStupneeGoodCondition}
          />
          <CarUserInfoRow
            label="First Aid Kit Available"
            value={detailData.FirstAidKitAvailable}
          />
          <CarUserInfoRow
            label="Seat Belts In Working Condition"
            value={detailData.SeatBeltsInWorkingCondition}
          />
          <CarUserInfoRow
            label="Side Rear Mirrors In Good Condition"
            value={detailData.SideRearMirrorsInGoodCondition}
          />
          <CarUserInfoRow
            label="Last Tuning Date"
            value={formatDate(detailData.LastTuningDate)}
          />
          <CarUserInfoRow
            label="Last Service Date"
            value={formatDate(detailData.LastServiceDate)}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Next Inspection Date"
            value={formatDate(detailData.NextInspectionDate)}
          />
          <CarUserInfoRow
            label="Last Month Finding"
            value={detailData.LastMonthFinding}
          />
          <CarUserInfoRow
            label="Any Improvement In Last Month Observation"
            value={detailData.AnyImprovementInLastMonthObservation}
          />
          <CarUserInfoRow
            label="Any Other Observation"
            value={detailData.AnyOtherObservation}
          />
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

export default VehicleInspectionDetail;
