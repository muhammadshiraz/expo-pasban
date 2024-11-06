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
  GET_USER_PROFILES_REQUEST,
  GET_USER_PROFILES_SUCCESS,
  GET_USER_PROFILES_FAILURE,
  PUT_UPDATE_PROFILE_REQUEST,
  PUT_UPDATE_PROFILE_SUCCESS,
  PUT_UPDATE_PROFILE_FAILURE,
} from '@redux/actions/types';

const initialState = {
  regions: [],
  group: [],
  userDetail: {},
  dashboardCounters: {},
  userProfile: {},
  userProfiles: [],
  updateProfile: {},
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REGIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_REGIONS_SUCCESS:
      return {
        ...state,
        regions: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_REGIONS_FAILURE:
      return {
        ...state,
        regions: [],
        loading: false,
        error: action.payload,
      };

    case GET_ALL_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_GROUP_SUCCESS:
      return {
        ...state,
        group: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_GROUP_FAILURE:
      return {
        ...state,
        group: [],
        loading: false,
        error: action.payload,
      };

    case GET_USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_DETAIL_FAILURE:
      return {
        ...state,
        userDetail: {},
        loading: false,
        error: action.payload,
      };

    case GET_DASHBOARD_COUNTERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_DASHBOARD_COUNTERS_SUCCESS:
      return {
        ...state,
        dashboardCounters: action.payload,
        loading: false,
        error: null,
      };
    case GET_DASHBOARD_COUNTERS_FAILURE:
      return {
        ...state,
        dashboardCounters: {},
        loading: false,
        error: action.payload,
      };

    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        userProfile: {},
        loading: false,
        error: action.payload,
      };

    case GET_USER_PROFILES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_PROFILES_SUCCESS:
      return {
        ...state,
        userProfiles: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_PROFILES_FAILURE:
      return {
        ...state,
        userProfiles: [],
        loading: false,
        error: action.payload,
      };

    case PUT_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case PUT_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        updateProfile: action.payload,
        error: null,
      };
    case PUT_UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
