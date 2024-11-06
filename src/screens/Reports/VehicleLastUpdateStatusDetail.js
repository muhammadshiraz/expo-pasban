import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import InvoiceLayout from '@components/InvoiceLayout';
import LoadingIndicator from '@components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { getFleetReport } from '@redux/actions/fleetActions';

const VehicleLastUpdateStatusDetail = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { itemData, loginID, businessGroup, region, userId, roleId } =
    route.params;
  const [detailData, setDetailData] = useState(null);
  const allFleetReportDetails = useSelector((state) => state.fleet.report);

  const { Responding = [] } = allFleetReportDetails || {};

  useEffect(() => {
    if (!Responding.length) {
      dispatch(getFleetReport(loginID, businessGroup, region, userId, roleId));
    } else {
      const itemDetail = Responding.find((item) => item.FFID === itemData.id);
      setDetailData(itemDetail);
    }
  }, [Responding, itemData.id, dispatch]);

  const CarUserInfoRow = ({ label, value }) => (
    <View style={styles.carUserInfoRow}>
      <Text style={{ fontSize: 12, color: '#757575' }}>{label}</Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 'medium',
          color: '#000000',
          width: 200,
          textAlign: 'right',
        }}
      >
        {value}
      </Text>
    </View>
  );

  // Build map URL only if detailData is available
  const mapUrl = detailData
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${detailData.Latitude},${detailData.Longitude}&zoom=19&size=300x150&maptype=roadmap&markers=color:orange|label:${detailData.RegNo}|${detailData.Latitude},${detailData.Longitude}&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg`
    : null;

  if (!detailData) {
    return <LoadingIndicator size="large" color="#006EDA" />;
  }

  return (
    <InvoiceLayout>
      <View style={styles.container}>
        {/* Car Info */}
        {mapUrl ? (
          <Image
            source={{ uri: mapUrl }}
            style={{
              width: 300,
              height: 150,
            }}
            resizeMode="contain"
          />
        ) : (
          <View style={{ width: 300, height: 250, backgroundColor: '#ccc' }}>
            {/* Placeholder view or loading indicator */}
          </View>
        )}
        <View style={styles.carInfo}>
          <View style={styles.ltoContent}>
            <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>
              Local ID # {detailData.FFID}
            </Text>
          </View>
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow label="Driver Name" value={detailData.DriverName} />
          <CarUserInfoRow label="Vehicle No #" value={detailData.RegNo} />
          <CarUserInfoRow label="Engine No" value={detailData.EngNo} />
          <CarUserInfoRow label="Chassis No" value={detailData.ChassisNo} />
          <CarUserInfoRow label="Color" value={detailData.Color} />
          <CarUserInfoRow label="Vehicle Made" value={detailData.VehicleMade} />
          <CarUserInfoRow
            label="Vehicle Model"
            value={detailData.VehicleModel || 'N/A'}
          />
        </View>
        <View style={styles.carUserInfo}>
          <CarUserInfoRow label="Lease" value={detailData.Lease} />
          <CarUserInfoRow label="Insurance" value={detailData.Insurance} />
          <CarUserInfoRow label="Region Name" value={detailData.CorpName} />
          <CarUserInfoRow
            label="Business Group"
            value={detailData.BusinessGroup}
          />
          <CarUserInfoRow
            label="Last Update"
            value={new Date(detailData.LastUpdate).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
          <CarUserInfoRow label="Latitude" value={detailData.Latitude} />
          <CarUserInfoRow label="Longitude" value={detailData.Longitude} />
        </View>

        <View style={styles.carUserInfo}>
          <CarUserInfoRow
            label="Last Location"
            value={detailData.LastLocation}
          />
          <CarUserInfoRow label="Speed" value={detailData.speed} />
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
    marginTop: 8,
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
    alignItems: 'flex-start',
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

export default VehicleLastUpdateStatusDetail;
