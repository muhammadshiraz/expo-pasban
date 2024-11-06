// redux/actions/authActions.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAILURE,
  GET_BUS_GROUP_SUCCESS,
  GET_BUS_GROUP_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from './types';
import {
  login as apiLogin,
  resetPassword as apiResetPassword,
  signUp as apiSignUp,
  getRegionsForSignUp as apiGetRegionsForSignUp,
  getallBusinessGroup as apiGetAllBusinessGroup,
  uploadImage as apiUploadImage,
} from '@utils/api';

// Async login action using Redux Thunk
export const userLogin = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const data = await apiLogin(email, password);
    // Dispatch success with the user data
    dispatch({ type: LOGIN_SUCCESS, payload: data });

    // You can also navigate to a specific screen here based on the role or other conditions
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// Async reset password action using Redux Thunk
export const resetPassword = (email) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const data = await apiResetPassword(email);

    // Dispatch success if the API call is successful
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });

    // Optionally, you can handle any additional logic after successful reset
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.message });
  }
};

// Async sign-up action using Redux Thunk
export const userSignUp = (userData) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const data = await apiSignUp(userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    throw error; // Rethrow error to handle it in the component if needed
  }
};

// src/redux/actions/authActions.js
export const logoutUser = () => async (dispatch) => {
  try {
    // Clear token and auth_data from AsyncStorage
    await AsyncStorage.multiRemove(['token', 'auth_data']);

    // Dispatch LOGOUT action to reset auth state
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Error during logout in Redux:', error);
    // Optionally, dispatch a logout failure action here
    dispatch({ type: LOGIN_FAILURE, payload: 'Logout failed' });
  }
};

export const getRegionsForSignUp = () => async (dispatch) => {
  try {
    const data = await apiGetRegionsForSignUp();
    const { regionList } = data;
    dispatch({ type: GET_REGIONS_SUCCESS, payload: regionList });
  } catch (error) {
    dispatch({
      type: GET_REGIONS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getAllBusinessGroup = () => async (dispatch) => {
  try {
    const response = await apiGetAllBusinessGroup();
    const data = JSON.parse(response);
    dispatch({ type: GET_BUS_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BUS_GROUP_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Async image upload action using Redux Thunk
export const uploadImageAction = (formData) => async (dispatch) => {
  try {
    const response = await apiUploadImage(formData);

    // Check if data exists and log it
    if (response) {
      const imageURL = response;
      if (imageURL) {
        dispatch({
          type: 'UPLOAD_IMAGE_SUCCESS',
          payload: { imageURL },
        });
      } else {
        console.warn('Image URL is not defined in the response data');
        dispatch({
          type: 'UPLOAD_IMAGE_FAILURE',
          payload: 'Image URL is not defined',
        });
      }
    } else {
      console.warn('Response data is undefined');
      dispatch({
        type: 'UPLOAD_IMAGE_FAILURE',
        payload: 'No data received from API',
      });
    }
  } catch (error) {
    console.error('Image upload failed:', error);
    dispatch({
      type: 'UPLOAD_IMAGE_FAILURE',
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
