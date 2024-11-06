import {
  FETCH_INDIVIDUAL_BLACKPOINTS_REQUEST,
  FETCH_INDIVIDUAL_BLACKPOINTS_SUCCESS,
  FETCH_INDIVIDUAL_BLACKPOINTS_FAILURE,
  FETCH_ALL_BLACKPOINTS_REQUEST,
  FETCH_ALL_BLACKPOINTS_SUCCESS,
  FETCH_ALL_BLACKPOINTS_FAILURE,
  FETCH_VIOLATIONS_RIGHT_NOW_REQUEST,
  FETCH_VIOLATIONS_RIGHT_NOW_SUCCESS,
  FETCH_VIOLATIONS_RIGHT_NOW_FAILURE,
  FETCH_TOP_FIVE_DRIVERS_REQUEST,
  FETCH_TOP_FIVE_DRIVERS_SUCCESS,
  FETCH_TOP_FIVE_DRIVERS_FAILURE,
  FETCH_TOP_FIVE_TRAVELERS_REQUEST,
  FETCH_TOP_FIVE_TRAVELERS_SUCCESS,
  FETCH_TOP_FIVE_TRAVELERS_FAILURE,
  GET_VEHICLE_CURRENT_STATUS_REQUEST,
  GET_VEHICLE_CURRENT_STATUS_SUCCESS,
  GET_VEHICLE_CURRENT_STATUS_FAILURE,
  FETCH_LATE_NIGHT_EXIT_REPORT_REQUEST,
  FETCH_LATE_NIGHT_EXIT_REPORT_SUCCESS,
  FETCH_LATE_NIGHT_EXIT_REPORT_FAILURE,
  FETCH_TRIP_REPORT_REQUEST,
  FETCH_TRIP_REPORT_SUCCESS,
  FETCH_TRIP_REPORT_FAILURE,
  FETCH_VEHICLE_INSPECTION_REPORT_REQUEST,
  FETCH_VEHICLE_INSPECTION_REPORT_SUCCESS,
  FETCH_VEHICLE_INSPECTION_REPORT_FAILURE,
  FETCH_DRIVING_OBSERVATIONS_REPORT_REQUEST,
  FETCH_DRIVING_OBSERVATIONS_REPORT_SUCCESS,
  FETCH_DRIVING_OBSERVATIONS_REPORT_FAILURE,
  FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_REQUEST,
  FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_SUCCESS,
  FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_FAILURE,
} from './types';

import {
  individualBlackPointsDetail as apiIndividualBlackPointsDetail,
  allBlackPointsSummary as apiAllBlackPointsSummary,
  violationsRightNow as apiViolationsRightNow,
  topFiveDrivers as apiTopFiveDrivers,
  topFiveTravelers as apiTopFiveTravelers,
  vehicleCurrentStatus as apiVehicleCurrentStatus,
  fetchLateNightExitReport as apiFetchLateNightExitReport,
  fetchTripReport as apiFetchTripReport,
  fetchVehicleInspectionReport as apiFetchVehicleInspectionReport,
  fetchDrivingObservationsReport as apiFetchDrivingObservationsReport,
  fetchVehiclesMonthlyMileageReport as apiFetchVehiclesMonthlyMileageReport,
} from '@utils/api';

// Async fetchIndividualBlackPointsDetail action using Redux Thunk
export const fetchIndividualBlackPointsDetail =
  (from, to, ownerName, localId) => async (dispatch) => {
    dispatch({ type: FETCH_INDIVIDUAL_BLACKPOINTS_REQUEST });

    try {
      const data = await apiIndividualBlackPointsDetail(
        from,
        to,
        ownerName,
        localId,
      );

      dispatch({
        type: FETCH_INDIVIDUAL_BLACKPOINTS_SUCCESS,
        payload: JSON.parse(data),
      });

      return data;
    } catch (error) {
      dispatch({
        type: FETCH_INDIVIDUAL_BLACKPOINTS_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

// Async getAllBlackPointsDetail action using Redux Thunk
export const getAllBlackPointsDetail = (from, to) => async (dispatch) => {
  dispatch({ type: FETCH_ALL_BLACKPOINTS_REQUEST });
  try {
    const data = await apiAllBlackPointsSummary(from, to);

    dispatch({
      type: FETCH_ALL_BLACKPOINTS_SUCCESS,
      payload: JSON.parse(data),
    });
    return data;
  } catch (error) {
    dispatch({
      type: FETCH_ALL_BLACKPOINTS_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};

export const getViolationsRightNow = (userID, roleID) => async (dispatch) => {
  dispatch({ type: FETCH_VIOLATIONS_RIGHT_NOW_REQUEST });
  try {
    const data = await apiViolationsRightNow(userID, roleID);

    // Parse and dispatch success
    const parsedData = JSON.parse(data);
    dispatch({ type: FETCH_VIOLATIONS_RIGHT_NOW_SUCCESS, payload: parsedData });
  } catch (error) {
    console.error('Dispatching fetching violation right now:', error.message);
    dispatch({
      type: FETCH_VIOLATIONS_RIGHT_NOW_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getTopFiveDrivers = (userID, roleID) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TOP_FIVE_DRIVERS_REQUEST });
    try {
      const response = await apiTopFiveDrivers(userID, roleID);
      const parsedData = JSON.parse(response);
      dispatch({ type: FETCH_TOP_FIVE_DRIVERS_SUCCESS, payload: parsedData });
    } catch (error) {
      dispatch({
        type: FETCH_TOP_FIVE_DRIVERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getTopFiveTravelers = (
  userID,
  roleID,
  fromDateTime,
  toDateTime,
) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TOP_FIVE_TRAVELERS_REQUEST });
    try {
      const response = await apiTopFiveTravelers(
        userID,
        roleID,
        fromDateTime,
        toDateTime,
      );
      const parsedData = JSON.parse(response);
      dispatch({ type: FETCH_TOP_FIVE_TRAVELERS_SUCCESS, payload: parsedData });
    } catch (error) {
      dispatch({
        type: FETCH_TOP_FIVE_TRAVELERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getVehicleCurrentStatus = () => {
  return async (dispatch) => {
    dispatch({ type: GET_VEHICLE_CURRENT_STATUS_REQUEST });
    try {
      const response = await apiVehicleCurrentStatus();
      const parsedData = JSON.parse(response);
      dispatch({
        type: GET_VEHICLE_CURRENT_STATUS_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: GET_VEHICLE_CURRENT_STATUS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getLateNightExitReport = (startDate, endDate, ffid) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LATE_NIGHT_EXIT_REPORT_REQUEST });
    try {
      const response = await apiFetchLateNightExitReport(
        startDate,
        endDate,
        ffid,
      );
      const parsedData = JSON.parse(response);
      dispatch({
        type: FETCH_LATE_NIGHT_EXIT_REPORT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LATE_NIGHT_EXIT_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getTripReport = (from, to, ffid, duration) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TRIP_REPORT_REQUEST });
    try {
      const response = await apiFetchTripReport(from, to, ffid, duration);
      const parsedData = JSON.parse(response);
      dispatch({
        type: FETCH_TRIP_REPORT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TRIP_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getFetchVehicleInspectionReport = (from, to, region) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VEHICLE_INSPECTION_REPORT_REQUEST });
    try {
      const response = await apiFetchVehicleInspectionReport(from, to, region);
      const parsedData = JSON.parse(response);
      dispatch({
        type: FETCH_VEHICLE_INSPECTION_REPORT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_VEHICLE_INSPECTION_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getDrivingObservationsReport = (from, to) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DRIVING_OBSERVATIONS_REPORT_REQUEST });
    try {
      const response = await apiFetchDrivingObservationsReport(from, to);
      const parsedData = JSON.parse(response);
      dispatch({
        type: FETCH_DRIVING_OBSERVATIONS_REPORT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DRIVING_OBSERVATIONS_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getVehiclesMonthlyMileageReport = (from, to, ffid) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_REQUEST });
    try {
      const response = await apiFetchVehiclesMonthlyMileageReport(
        from,
        to,
        ffid,
      );
      const parsedData = JSON.parse(response);
      dispatch({
        type: FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_FAILURE,
        payload: error.message,
      });
    }
  };
};
