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
} from '@redux/actions/types';

const initialState = {
  report: {},
  violationVehReport: [],
  violationDayReport: [],
  violationTimeReport: [],
  speedViolationsReport: [],
  fetchVehiclesRegNo: [],
  // apiStatuses: {
  //   report: false,
  //   violationVehReport: false,
  //   violationDayReport: false,
  //   violationTimeReport: false,
  //   speedViolationsReport: false,
  // },
  loading: true,
  error: null,
};

const allAPIsCompleted = (statuses) =>
  Object.values(statuses).every((status) => status === true);

const fleetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLEET_REPORT_REQUEST:
    case FETCH_VIOLATION_VEH_WISE_REPORT_REQUEST:
    case FETCH_VIOLATION_DAY_WISE_REPORT_REQUEST:
    case FETCH_VIOLATION_TIME_WISE_REPORT_REQUEST:
    case FETCH_SPEED_VIOLATION_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_FLEET_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_VIOLATION_VEH_WISE_REPORT_SUCCESS:
      return {
        ...state,
        violationVehReport: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_VIOLATION_DAY_WISE_REPORT_SUCCESS:
      return {
        ...state,
        violationDayReport: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_VIOLATION_TIME_WISE_REPORT_SUCCESS:
      return {
        ...state,
        violationTimeReport: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_SPEED_VIOLATION_REPORT_SUCCESS:
      return {
        ...state,
        speedViolationsReport: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_FLEET_REPORT_FAILURE:
      return {
        ...state,
        report: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_VIOLATION_VEH_WISE_REPORT_FAILURE:
      return {
        ...state,
        violationVehReport: [],
        loading: false,
        error: action.payload,
      };

    case FETCH_VIOLATION_DAY_WISE_REPORT_FAILURE:
      return {
        ...state,
        violationDayReport: [],
        loading: false,
        error: action.payload,
      };

    case FETCH_VIOLATION_TIME_WISE_REPORT_FAILURE:
      return {
        ...state,
        violationTimeReport: [],
        loading: false,
        error: action.payload,
      };

    case FETCH_SPEED_VIOLATION_REPORT_FAILURE:
      return {
        ...state,
        speedViolationsReport: [],
        loading: false,
        error: action.payload,
      };

    case GET_VEHICLE_REG_NO_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_VEHICLE_REG_NO_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchVehiclesRegNo: action.payload,
        error: null,
      };
    case GET_VEHICLE_REG_NO_FAILURE:
      return {
        ...state,
        fetchVehiclesRegNo: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default fleetReducer;
