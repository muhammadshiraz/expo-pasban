// redux/actions/ltoActions.js
import {
  POST_LTO_STATS_REQUEST,
  POST_LTO_STATS_SUCCESS,
  POST_LTO_STATS_FAILURE,
  POST_VEHICLES_STATS_REQUEST,
  POST_VEHICLES_STATS_SUCCESS,
  POST_VEHICLES_STATS_FAILURE,
  POST_DDC_STATS_REQUEST,
  POST_DDC_STATS_SUCCESS,
  POST_DDC_STATS_FAILURE,
  POST_EMP_TRAINING_STATS_REQUEST,
  POST_EMP_TRAINING_STATS_SUCCESS,
  POST_EMP_TRAINING_STATS_FAILURE,
  POST_DOCUMENTS_STATUS_REQUEST,
  POST_DOCUMENTS_STATUS_SUCCESS,
  POST_DOCUMENTS_STATUS_FAILURE,
  GET_LTO_REQUEST,
  GET_LTO_SUCCESS,
  GET_LTO_FAILURE,
  GET_CANCELLED_LTO_REQUEST,
  GET_CANCELLED_LTO_SUCCESS,
  GET_CANCELLED_LTO_FAILURE,
  GET_AUTHORITY_LETTER_REQUEST,
  GET_AUTHORITY_LETTER_SUCCESS,
  GET_AUTHORITY_LETTER_FAILURE,
  GET_AUTHORITY_LETTER_FOR_PRINT_REQUEST,
  GET_AUTHORITY_LETTER_FOR_PRINT_SUCCESS,
  GET_AUTHORITY_LETTER_FOR_PRINT_FAILURE,
} from './types';
import {
  ltoStats as apiLTOStats,
  vehiclesStats as apiVehiclesStats,
  ddcStatus as apiDDCStatus,
  empTrainingStats as apiEmpTrainingStats,
  documentsStatus as apiDocumentsStatus,
  LTO as apiLTO,
  CancelledLTO as apiCancelledLTO,
  allAuthorityLetterStatuses as apiAllAuthorityLetterStatuses,
  authorityLetterForPrint as apiAuthorityLetterForPrint,
} from '@utils/api';

export const getLTOStats = (userId, roleId) => async (dispatch) => {
  dispatch({ type: POST_LTO_STATS_REQUEST });
  try {
    const data = await apiLTOStats(userId, roleId);
    dispatch({ type: POST_LTO_STATS_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    dispatch({
      type: POST_LTO_STATS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getVehiclesStats = (userId, roleId) => async (dispatch) => {
  dispatch({ type: POST_VEHICLES_STATS_REQUEST });
  try {
    const data = await apiVehiclesStats(userId, roleId);
    dispatch({ type: POST_VEHICLES_STATS_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    dispatch({
      type: POST_VEHICLES_STATS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getDDCStatus = (userId, roleId) => async (dispatch) => {
  dispatch({ type: POST_DDC_STATS_REQUEST });
  try {
    const data = await apiDDCStatus(userId, roleId);
    dispatch({ type: POST_DDC_STATS_SUCCESS, payload: JSON.parse(data) });
  } catch (error) {
    dispatch({
      type: POST_DDC_STATS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getEmpTrainingStats = (userId, roleId) => async (dispatch) => {
  dispatch({ type: POST_EMP_TRAINING_STATS_REQUEST });
  try {
    const data = await apiEmpTrainingStats(userId, roleId);
    dispatch({
      type: POST_EMP_TRAINING_STATS_SUCCESS,
      payload: JSON.parse(data),
    });
  } catch (error) {
    dispatch({
      type: POST_EMP_TRAINING_STATS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getDocumentsStatus = (userId, roleId) => async (dispatch) => {
  dispatch({ type: POST_DOCUMENTS_STATUS_REQUEST });
  try {
    const data = await apiDocumentsStatus(userId, roleId);
    dispatch({
      type: POST_DOCUMENTS_STATUS_SUCCESS,
      payload: JSON.parse(data),
    });
  } catch (error) {
    dispatch({
      type: POST_DOCUMENTS_STATUS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getLTO = () => {
  return async (dispatch) => {
    dispatch({ type: GET_LTO_REQUEST });
    try {
      const response = await apiLTO();
      const parsedData = JSON.parse(response);
      dispatch({ type: GET_LTO_SUCCESS, payload: parsedData });
    } catch (error) {
      dispatch({
        type: GET_LTO_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getCancelledLTO = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CANCELLED_LTO_REQUEST });
    try {
      const response = await apiCancelledLTO();
      const parsedData = JSON.parse(response);
      dispatch({ type: GET_CANCELLED_LTO_SUCCESS, payload: parsedData });
    } catch (error) {
      dispatch({
        type: GET_CANCELLED_LTO_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getAllAuthorityLetterStatuses = () => {
  return async (dispatch) => {
    dispatch({ type: GET_AUTHORITY_LETTER_REQUEST });
    try {
      const response = await apiAllAuthorityLetterStatuses();
      const parsedData = JSON.parse(response);
      dispatch({ type: GET_AUTHORITY_LETTER_SUCCESS, payload: parsedData });
    } catch (error) {
      dispatch({
        type: GET_AUTHORITY_LETTER_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getAuthorityLetterForPrint = (Id) => {
  return async (dispatch) => {
    dispatch({ type: GET_AUTHORITY_LETTER_FOR_PRINT_REQUEST });
    try {
      const response = await apiAuthorityLetterForPrint(Id);
      const parsedData = JSON.parse(response);
      dispatch({
        type: GET_AUTHORITY_LETTER_FOR_PRINT_SUCCESS,
        payload: parsedData,
      });
    } catch (error) {
      dispatch({
        type: GET_AUTHORITY_LETTER_FOR_PRINT_FAILURE,
        payload: error.message,
      });
    }
  };
};
