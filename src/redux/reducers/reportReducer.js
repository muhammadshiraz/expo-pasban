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
} from '@redux/actions/types';

const initialState = {
  individualBlackPoints: {},
  allBlackPoints: {},
  violationsRightNow: {},
  topFiveDrivers: [],
  topFiveTravelers: [],
  vehicleCurrentStatus: [],
  fetchLateNightExitReport: {},
  fetchTripReport: {},
  fetchVehicleInspectionReport: {},
  fetchDrivingObservationsReport: [],
  fetchVehiclesMonthlyMileageReport: {},
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INDIVIDUAL_BLACKPOINTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_INDIVIDUAL_BLACKPOINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        individualBlackPoints: action.payload,
        error: null,
      };
    case FETCH_INDIVIDUAL_BLACKPOINTS_FAILURE:
      return {
        ...state,
        individualBlackPoints: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_ALL_BLACKPOINTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALL_BLACKPOINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allBlackPoints: action.payload,
        error: null,
      };
    case FETCH_ALL_BLACKPOINTS_FAILURE:
      return {
        ...state,
        allBlackPoints: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_VIOLATIONS_RIGHT_NOW_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VIOLATIONS_RIGHT_NOW_SUCCESS:
      return {
        ...state,
        loading: false,
        violationsRightNow: action.payload,
        error: null,
      };
    case FETCH_VIOLATIONS_RIGHT_NOW_FAILURE:
      return {
        ...state,
        violationsRightNow: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_TOP_FIVE_DRIVERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TOP_FIVE_DRIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        topFiveDrivers: action.payload,
        error: null,
      };
    case FETCH_TOP_FIVE_DRIVERS_FAILURE:
      return {
        ...state,
        topFiveDrivers: [],
        loading: false,
        error: action.payload,
      };

    case FETCH_TOP_FIVE_TRAVELERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TOP_FIVE_TRAVELERS_SUCCESS:
      return {
        ...state,
        loading: false,
        topFiveTravelers: action.payload,
        error: null,
      };
    case FETCH_TOP_FIVE_TRAVELERS_FAILURE:
      return {
        ...state,
        topFiveTravelers: [],
        loading: false,
        error: action.payload,
      };

    case GET_VEHICLE_CURRENT_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_VEHICLE_CURRENT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleCurrentStatus: action.payload,
        error: null,
      };
    case GET_VEHICLE_CURRENT_STATUS_FAILURE:
      return {
        ...state,
        vehicleCurrentStatus: [],
        loading: false,
        error: action.payload,
      };

    case FETCH_LATE_NIGHT_EXIT_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LATE_NIGHT_EXIT_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchLateNightExitReport: action.payload,
        error: null,
      };
    case FETCH_LATE_NIGHT_EXIT_REPORT_FAILURE:
      return {
        ...state,
        fetchLateNightExitReport: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_TRIP_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TRIP_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchTripReport: action.payload,
        error: null,
      };
    case FETCH_TRIP_REPORT_FAILURE:
      return {
        ...state,
        fetchTripReport: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_VEHICLE_INSPECTION_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VEHICLE_INSPECTION_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchVehicleInspectionReport: action.payload,
        error: null,
      };
    case FETCH_VEHICLE_INSPECTION_REPORT_FAILURE:
      return {
        ...state,
        fetchVehicleInspectionReport: {},
        loading: false,
        error: action.payload,
      };

    case FETCH_DRIVING_OBSERVATIONS_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_DRIVING_OBSERVATIONS_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchDrivingObservationsReport: action.payload,
        error: null,
      };
    case FETCH_DRIVING_OBSERVATIONS_REPORT_FAILURE:
      return {
        ...state,
        fetchDrivingObservationsReport: [],
        loading: false,
        error: action.payload,
      };

    case FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        fetchVehiclesMonthlyMileageReport: action.payload,
        error: null,
      };
    case FETCH_VEHICLES_MONTHLY_MILEAGE_REPORT_FAILURE:
      return {
        ...state,
        fetchVehiclesMonthlyMileageReport: {},
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
