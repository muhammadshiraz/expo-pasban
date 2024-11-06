// redux/reducers/authReducer.js
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
} from '@redux/actions/types';

const initialState = {
  loading: false,
  user: null,
  token: null,
  userId: null,
  // roleId: null, // Removed
  email: null,
  username: null,
  employeeId: null,
  regions: [],
  group: [],
  error: null,
  uploadStatus: null,
  uploadError: null,
  uploadedImage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        userId: action.payload.userId,
        // roleId: action.payload.roleId, // Removed
        email: action.payload.email,
        username: action.payload.username,
        employeeId: action.payload.employeeId,
        region: action.payload.region,
        businessGroup: action.payload.businessGroup,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: null }; // Handle success message if needed
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_REGIONS_SUCCESS:
      return { ...state, regions: action.payload, error: null };
    case GET_REGIONS_FAILURE:
      return { ...state, error: action.payload };

    case GET_BUS_GROUP_SUCCESS:
      return { ...state, group: action.payload, error: null };
    case GET_BUS_GROUP_FAILURE:
      return { ...state, error: action.payload };

    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        token: action.payload.token,
        userId: action.payload.userId,
        email: action.payload.email,
        username: action.payload.username,
        region: action.payload.region,
      };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadStatus: 'success',
        uploadedImage: action.payload.imageURL, // Assuming action.payload has imageURL
        uploadError: null,
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploadStatus: 'error',
        uploadError: action.payload,
      };

    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
