import {
  GET_ALL_REGIONS_REQUEST,
  GET_ALL_REGIONS_SUCCESS,
  GET_ALL_REGIONS_FAILURE,
  GET_ALL_GROUP_REQUEST,
  GET_ALL_GROUP_SUCCESS,
  GET_ALL_GROUP_FAILURE,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAILURE,
  GET_DASHBOARD_COUNTERS_REQUEST,
  GET_DASHBOARD_COUNTERS_SUCCESS,
  GET_DASHBOARD_COUNTERS_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  PUT_UPDATE_PROFILE_REQUEST,
  PUT_UPDATE_PROFILE_SUCCESS,
  PUT_UPDATE_PROFILE_FAILURE,
  GET_USER_PROFILES_REQUEST,
  GET_USER_PROFILES_SUCCESS,
  GET_USER_PROFILES_FAILURE,
} from './types';

import {
  getAllRegion as apiGetAllRegion,
  getAllBusinessGroup as apiGetAllBusinessGroup,
  userDetail as apiGetUserDetail,
  dashboardCounters as apiDashboardCounters,
  userProfile as apiUserProfile,
  updateProfile as apiUpdateProfile,
  userProfiles as apiUserProfiles,
} from '@utils/api';

export const getAllRegions = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REGIONS_REQUEST });
  try {
    const data = await apiGetAllRegion();
    dispatch({ type: GET_ALL_REGIONS_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    dispatch({
      type: GET_ALL_REGIONS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getAllBusinessGroup = () => async (dispatch) => {
  dispatch({ type: GET_ALL_GROUP_REQUEST });
  try {
    const data = await apiGetAllBusinessGroup();
    dispatch({ type: GET_ALL_GROUP_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    dispatch({
      type: GET_ALL_GROUP_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getUserDetail = () => async (dispatch) => {
  dispatch({ type: GET_USER_DETAIL_REQUEST });
  try {
    const response = await apiGetUserDetail();
    dispatch({ type: GET_USER_DETAIL_SUCCESS, payload: JSON.parse(response) });
  } catch (error) {
    dispatch({ type: GET_USER_DETAIL_FAILURE, payload: error.message });
  }
};

export const getDashboardCounters = () => async (dispatch) => {
  dispatch({ type: GET_DASHBOARD_COUNTERS_REQUEST });
  try {
    const response = await apiDashboardCounters();
    dispatch({
      type: GET_DASHBOARD_COUNTERS_SUCCESS,
      payload: JSON.parse(response),
    });
  } catch (error) {
    dispatch({ type: GET_DASHBOARD_COUNTERS_FAILURE, payload: error.message });
  }
};

export const getUserProfile = (Id) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const response = await apiUserProfile(Id);
    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error.message });
  }
};

// Async putUpdateProfile action using Redux Thunk
export const putUpdateProfile = (userData) => async (dispatch) => {
  dispatch({ type: PUT_UPDATE_PROFILE_REQUEST });
  try {
    const data = await apiUpdateProfile(userData);

    dispatch({ type: PUT_UPDATE_PROFILE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: PUT_UPDATE_PROFILE_FAILURE, payload: error.message });
    throw error;
  }
};

export const getUserProfiles = () => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILES_REQUEST });
  try {
    const response = await apiUserProfiles();
    dispatch({
      type: GET_USER_PROFILES_SUCCESS,
      payload: JSON.parse(response),
    });
  } catch (error) {
    dispatch({ type: GET_USER_PROFILES_FAILURE, payload: error.message });
  }
};
