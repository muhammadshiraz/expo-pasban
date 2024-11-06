// utils/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_IMAGE_URL = 'https://www.megatechapi.com:9002/';
const API_BASE_URL = 'https://www.megatechapi.com:9002/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// List of endpoints that don't require authentication
const NON_AUTH_ENDPOINTS = ['Account/login', 'Account/register'];

api.interceptors.request.use(
  async (config) => {
    // Skip adding token for non-auth endpoints
    if (!NON_AUTH_ENDPOINTS.some((endpoint) => config.url.includes(endpoint))) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('Account/login', {
      email,
      password,
    });

    const {
      token,
      userId,
      roleId,
      email: userEmail,
      username,
      employeeId,
      region,
      businessGroup,
    } = response.data;

    // Store token and user info in AsyncStorage
    await AsyncStorage.multiSet([
      ['token', token],
      ['userId', userId],
      ['roleId', roleId],
      ['email', userEmail],
      ['username', username],
      ['region', region],
      ['businessGroup', businessGroup],
      ['employeeId', employeeId],
    ]);
    return response.data;
  } catch (error) {
    console.error(
      'Login error:',
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// API function to get fleet report
export const fleetReport = async (
  loginDetailID,
  businessGroupName,
  regionName,
  userID,
  roleID,
) => {
  try {
    const response = await api.post('Report/get-fleet-report', {
      loginDetailID,
      businessGroupName,
      regionName,
      userID,
      roleID,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fleet report:', error.response || error);
    throw error; // Throw error so that it can be handled by the Redux action
  }
};

export const violationsVehWiseReport = async (
  from,
  to,
  regionName,
  businessGroupName,
) => {
  try {
    const response = await api.post('Report/get-violations-vehwise', {
      from,
      to,
      regionName,
      businessGroupName,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '[]'; // Return an empty object or any default value you prefer
    } else {
      console.warn('Error fetching veh wise report:', error.response || error);
      throw error; // Throw error so that it can be handled by the Redux action
    }
  }
};

export const violationsDayWiseReport = async (
  from,
  to,
  regionName,
  businessGroupName,
) => {
  try {
    const response = await api.post('Report/get-violations-daywise', {
      from,
      to,
      regionName,
      businessGroupName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fleet report:', error.response || error);
    throw error; // Throw error so that it can be handled by the Redux action
  }
};

export const violationsTimeWiseReport = async (
  from,
  to,
  regionName,
  businessGroupName,
) => {
  try {
    const response = await api.post('Report/get-violatiosn-timewindowwise', {
      from,
      to,
      regionName,
      businessGroupName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fleet report:', error.response || error);
    throw error; // Throw error so that it can be handled by the Redux action
  }
};

export const speedViolationsReport = async (
  from,
  to,
  regionName,
  businessGroupName,
) => {
  try {
    const response = await api.post('Report/get-speedviolations', {
      from,
      to,
      regionName,
      businessGroupName,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fleet report:', error.response || error);
    throw error; // Throw error so that it can be handled by the Redux action
  }
};

// Function to reset password
export const resetPassword = async (email) => {
  try {
    const response = await api.post(`Account/resetPassword/${email}`);
    return response.data; // Handle successful response
  } catch (error) {
    console.error('Error resetting password:', error.response || error);
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// Sign-up function
export const signUp = async (userData) => {
  try {
    const response = await api.post('Account/register', userData);
    return response.data;
  } catch (error) {
    console.error(
      'Error signing up:',
      error.response ? error.response.data : error,
    );
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// get regions for sign-up
export const getRegionsForSignUp = async () => {
  try {
    const response = await api.get('Account/get-regions-for-signUp');
    return response.data; // Return the regions data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// get allBusinessGroup for sign-up
export const getallBusinessGroup = async () => {
  try {
    const response = await api.get('UserRoleManagement/get-allBusinessGroup');
    return response.data; // Return the regions data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// Function to upload image
export const uploadImage = async (formData) => {
  try {
    // Set headers for multipart/form-data
    const response = await api.post('UploadFile/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Ensure this includes imageURL
  } catch (error) {
    console.error(
      'Error uploading image:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Rethrow to handle it in the Redux action
  }
};

export const ltoStats = async (userId, roleId) => {
  try {
    const response = await api.post('LTO/get-lto-stats', { userId, roleId });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const vehiclesStats = async (userId, roleId) => {
  try {
    const response = await api.post('LTO/get-vehicles-stats', {
      userId,
      roleId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const ddcStatus = async (userId, roleId) => {
  try {
    const response = await api.post('LTO/get-ddc-status', {
      userId,
      roleId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const empTrainingStats = async (userId, roleId) => {
  try {
    const response = await api.post('LTO/get-emp-training-stats', {
      userId,
      roleId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const documentsStatus = async (userId, roleId) => {
  try {
    const response = await api.post('LTO/get-documents-status', {
      userId,
      roleId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

// get getAllRegion for UserRoleManagement
export const getAllRegion = async () => {
  try {
    const response = await api.get('UserRoleManagement/get-allRegion');
    return response.data; // Return the regions data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// get getAllBusinessGroup for UserRoleManagement
export const getAllBusinessGroup = async () => {
  try {
    const response = await api.get('UserRoleManagement/get-allBusinessGroup');
    return response.data; // Return the allBusinessGroup data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// User Dashboard APIs
export const userDetail = async () => {
  try {
    const response = await api.get('Dashboard/get-userDetail');
    return response.data; // Return the regions data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

export const dashboardCounters = async () => {
  try {
    const response = await api.get('Dashboard/get-dashboard-counters');
    return response.data; // Return the regions data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

export const userProfile = async (Id) => {
  try {
    const response = await api.get(`UserProfile/get-userProfile/${Id}`);
    return response.data; // Return the regions data
  } catch (error) {
    throw error; // Rethrow error to handle it in the Redux action
  }
};

// updateProfile function
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('UserProfile/update-userProfile', userData);

    return response.data;
  } catch (error) {
    console.error(
      'Error user profile:',
      error.response ? error.response.data : error,
    );
    throw error;
  }
};

// individualBlackPointsDetail function
export const individualBlackPointsDetail = async (
  from,
  to,
  ownerName,
  localId,
) => {
  try {
    const response = await api.post(
      'Report/get-violation-dashboard-blackpoint-details',
      {
        from,
        to,
        ownerName,
        localId,
      },
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error blackpoints detail:',
      error.response ? error.response.data : error,
    );
    throw error;
  }
};

// allBlackPointsSummary function
export const allBlackPointsSummary = async (from, to) => {
  try {
    const response = await api.post('Report/get-blackpoints-summary', {
      from,
      to,
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error all blackpoints detail:',
      error.response ? error.response.data : error,
    );
    throw error;
  }
};

// API function to gsm get-on-violations-right-now
export const violationsRightNow = async (userID, roleID) => {
  try {
    const response = await api.get(
      'Report/get-on-violations-right-now?userID=' +
        userID +
        '&roleID=' +
        roleID,
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '{}'; // Return an empty object or any default value you prefer
    } else {
      console.warn(
        'Error fetching api violation right now report:',
        error.response || error,
      );
      throw error; // Throw error so that it can be handled by the Redux action
    }
  }
};

// API function to gsm Report/get-topfive-high-risk-drivers
export const topFiveDrivers = async (userID, roleID) => {
  try {
    const response = await api.get(
      'Report/get-topfive-high-risk-drivers?userID=' +
        userID +
        '&roleID=' +
        roleID,
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '{}'; // Return an empty object or any default value you prefer
    } else {
      console.warn(
        'Error top five high risk drivers:',
        error.response || error,
      );
      throw error; // Throw error so that it can be handled by the Redux action
    }
  }
};

export const topFiveTravelers = async (
  userID,
  roleID,
  fromDateTime,
  toDateTime,
) => {
  try {
    const response = await api.post('Report/get-topfive-travelers', {
      userID,
      roleID,
      fromDateTime,
      toDateTime,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

// API function to LTO
export const LTO = async () => {
  try {
    const response = await api.get('LTO');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '[]';
    } else {
      console.warn('Error LTO:', error.response || error);
      throw error;
    }
  }
};

// API function to CancelledLTO
export const CancelledLTO = async () => {
  try {
    const response = await api.get('LTO/get-CancelledLTO');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '[]';
    } else {
      console.warn('Error Cancelled LTO:', error.response || error);
      throw error;
    }
  }
};

// API function to AllUserWithVehicleCurrentStatus
export const vehicleCurrentStatus = async () => {
  try {
    const response = await api.get(
      'Pasban/get-AllUserWithVehicleCurrentStatus',
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '[]';
    } else {
      console.warn(
        'Error All User With Vehicle Current Status:',
        error.response || error,
      );
      throw error;
    }
  }
};

// API function to fetch the late night exit report with a specified date range and ffids
export const fetchLateNightExitReport = async (startDate, endDate, ffid) => {
  try {
    const response = await api.post('Report/get-late-night-exit-report', {
      from: startDate,
      to: endDate,
      ffids: ffid,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return '[]';
    } else {
      console.warn(
        'Error fetching Late Night Exit Report:',
        error.response || error,
      );
      throw error;
    }
  }
};

// API function to get-allVehicleFFIDAndRegNo
export const fetchVehiclesRegNo = async () => {
  try {
    const response = await api.get('FleetDashboard/get-allVehicleFFIDAndRegNo');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return '[]';
    } else {
      console.warn('Error fetch vehicles reg no:', error.response || error);
      throw error;
    }
  }
};

// API function to fetch the trip report with a specified date range and ffids
export const fetchTripReport = async (from, to, ffid, duration) => {
  try {
    const response = await api.post('Report/get-trip-report', {
      from,
      to,
      ffid,
      duration,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return '{}';
    } else {
      console.warn('Error fetching Trip Report:', error.response || error);
      throw error;
    }
  }
};

// API function to fetch the vehicle inspection report with a specified date range and region
export const fetchVehicleInspectionReport = async (from, to, region) => {
  try {
    const response = await api.post('PowerBi/get-vehicleObservationData', {
      from,
      to,
      region,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return '{}';
    } else {
      console.warn('Error vehicle inspection report:', error.response || error);
      throw error;
    }
  }
};

// API function to fetch the driving observations list report with a specified date range
export const fetchDrivingObservationsReport = async (from, to) => {
  try {
    const response = await api.post('Report/get-drivingObservations-list', {
      from,
      to,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return '[]';
    } else {
      console.warn(
        'Error driving observations list report:',
        error.response || error,
      );
      throw error;
    }
  }
};

// API function to fetch the monthly mileage report with a specified date range and ffids
export const fetchVehiclesMonthlyMileageReport = async (from, to, ffid) => {
  try {
    const response = await api.post('Report/get-monthly-mileage-report', {
      from,
      to,
      ffid,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return '{}';
    } else {
      console.warn(
        'Error fetching monthly mileage Report:',
        error.response || error,
      );
      throw error;
    }
  }
};

// save-vehicleObservation function
export const vehicleObservation = async (observationData) => {
  try {
    const response = await api.post(
      'MobileApp/save-vehicleObservation',
      observationData,
    );

    return response;
  } catch (error) {
    console.error(
      'Error vehicle observation data:',
      error.response ? error.response.data : error,
    );
    throw error;
  }
};

// save-drivingObservation function
export const drivingObservation = async (observationData) => {
  try {
    const response = await api.post(
      'MobileApp/save-drivingObservation',
      observationData,
    );

    return response;
  } catch (error) {
    console.error(
      'Error driving observation data:',
      error.response ? error.response.data : error,
    );
    throw error;
  }
};

export const userProfiles = async () => {
  try {
    const response = await api.get(`UserProfile/get-userProfiles`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const allAuthorityLetterStatuses = async () => {
  try {
    const response = await api.get('Pasban/get-allAuthorityLetterStatuses');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const authorityLetterForPrint = async (Id) => {
  try {
    const response = await api.get(
      `Pasban/get-getAuthorityLetterForPrint/${Id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { API_IMAGE_URL };
