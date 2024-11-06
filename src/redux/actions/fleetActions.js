// src/redux/actions/fleetActions.js
import {
  FETCH_FLEET_REPORT_REQUEST,
  FETCH_FLEET_REPORT_SUCCESS,
  FETCH_FLEET_REPORT_FAILURE,
  FETCH_VIOLATION_VEH_WISE_REPORT_REQUEST,
  FETCH_VIOLATION_VEH_WISE_REPORT_SUCCESS,
  FETCH_VIOLATION_VEH_WISE_REPORT_FAILURE,
  FETCH_VIOLATION_DAY_WISE_REPORT_REQUEST,
  FETCH_VIOLATION_DAY_WISE_REPORT_SUCCESS,
  FETCH_VIOLATION_DAY_WISE_REPORT_FAILURE,
  FETCH_VIOLATION_TIME_WISE_REPORT_REQUEST,
  FETCH_VIOLATION_TIME_WISE_REPORT_SUCCESS,
  FETCH_VIOLATION_TIME_WISE_REPORT_FAILURE,
  FETCH_SPEED_VIOLATION_REPORT_REQUEST,
  FETCH_SPEED_VIOLATION_REPORT_SUCCESS,
  FETCH_SPEED_VIOLATION_REPORT_FAILURE,
  GET_VEHICLE_REG_NO_REQUEST,
  GET_VEHICLE_REG_NO_SUCCESS,
  GET_VEHICLE_REG_NO_FAILURE,
} from './types';
import {
  fleetReport as apiGetFleetReport,
  violationsVehWiseReport as apiViolationsVehWiseReport,
  violationsDayWiseReport as apiViolationsDayWiseReport,
  violationsTimeWiseReport as apiViolationsTimeWiseReport,
  speedViolationsReport as apiSpeedViolationsReport,
  fetchVehiclesRegNo as apiFetchVehiclesRegNo,
} from '@utils/api';

export const getFleetReport =
  (loginDetailID, businessGroupName, regionName, userID, roleID) =>
  async (dispatch) => {
    dispatch({ type: FETCH_FLEET_REPORT_REQUEST });
    try {
      const data = await apiGetFleetReport(
        loginDetailID,
        businessGroupName,
        regionName,
        userID,
        roleID,
      );

      // Parse and dispatch success
      const parsedData = JSON.parse(data);
      dispatch({ type: FETCH_FLEET_REPORT_SUCCESS, payload: parsedData });
    } catch (error) {
      console.error('Dispatching fleet report error:', error.message);
      dispatch({
        type: FETCH_FLEET_REPORT_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

export const getViolationVehWiseReport =
  (from, to, regionName = '', businessGroupName = '') =>
  async (dispatch) => {
    dispatch({ type: FETCH_VIOLATION_VEH_WISE_REPORT_REQUEST });
    try {
      const data = await apiViolationsVehWiseReport(
        from,
        to,
        regionName,
        businessGroupName,
      );
      const parsedData = data ? JSON.parse(data) : []; // Check if data is not empty
      dispatch({
        type: FETCH_VIOLATION_VEH_WISE_REPORT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      console.error('Dispatching veh wise report error:', error.message);
      dispatch({
        type: FETCH_VIOLATION_VEH_WISE_REPORT_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

export const getViolationsDayWiseReport =
  (from, to, regionName, businessGroupName) => async (dispatch) => {
    dispatch({ type: FETCH_VIOLATION_DAY_WISE_REPORT_REQUEST });
    try {
      const data = await apiViolationsDayWiseReport(
        from,
        to,
        regionName,
        businessGroupName,
      );
      dispatch({
        type: FETCH_VIOLATION_DAY_WISE_REPORT_SUCCESS,
        payload: JSON.parse(data),
      });
    } catch (error) {
      console.error('Dispatching fleet report error:', error.message);
      dispatch({
        type: FETCH_VIOLATION_DAY_WISE_REPORT_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

export const getViolationsTimeWiseReport =
  (from, to, regionName, businessGroupName) => async (dispatch) => {
    dispatch({ type: FETCH_VIOLATION_TIME_WISE_REPORT_REQUEST });
    try {
      const data = await apiViolationsTimeWiseReport(
        from,
        to,
        regionName,
        businessGroupName,
      );
      dispatch({
        type: FETCH_VIOLATION_TIME_WISE_REPORT_SUCCESS,
        payload: JSON.parse(data),
      });
    } catch (error) {
      console.error('Dispatching fleet report error:', error.message);
      dispatch({
        type: FETCH_VIOLATION_TIME_WISE_REPORT_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

export const getSpeedViolationsReport =
  (from, to, regionName, businessGroupName) => async (dispatch) => {
    dispatch({ type: FETCH_SPEED_VIOLATION_REPORT_REQUEST });
    try {
      const data = await apiSpeedViolationsReport(
        from,
        to,
        regionName,
        businessGroupName,
      );
      dispatch({
        type: FETCH_SPEED_VIOLATION_REPORT_SUCCESS,
        payload: JSON.parse(data),
      });
    } catch (error) {
      console.error('Dispatching fleet report error:', error.message);
      dispatch({
        type: FETCH_SPEED_VIOLATION_REPORT_FAILURE,
        payload: error.response ? error.response.data : error.message,
      });
    }
  };

export const getFetchVehiclesRegNo = () => {
  return async (dispatch) => {
    dispatch({ type: GET_VEHICLE_REG_NO_REQUEST });
    try {
      const response = await apiFetchVehiclesRegNo();
      dispatch({
        type: GET_VEHICLE_REG_NO_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: GET_VEHICLE_REG_NO_FAILURE,
        payload: error.message,
      });
    }
  };
};
