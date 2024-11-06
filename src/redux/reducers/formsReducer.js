import {
  SAVE_VEHICLE_OBSERVATION_REQUEST,
  SAVE_VEHICLE_OBSERVATION_SUCCESS,
  SAVE_VEHICLE_OBSERVATION_FAILURE,
  SAVE_DRIVING_OBSERVATION_REQUEST,
  SAVE_DRIVING_OBSERVATION_SUCCESS,
  SAVE_DRIVING_OBSERVATION_FAILURE,
} from '@redux/actions/types';

const initialState = {
  loading: false,
  vehicleObservation: null,
  drivingObservation: null,
  error: null,
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_VEHICLE_OBSERVATION_REQUEST:
      return { ...state, loading: true, error: null };
    case SAVE_VEHICLE_OBSERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        vehicleObservation: action.payload,
      };
    case SAVE_VEHICLE_OBSERVATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SAVE_DRIVING_OBSERVATION_REQUEST:
      return { ...state, loading: true, error: null };
    case SAVE_DRIVING_OBSERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        drivingObservation: action.payload,
      };
    case SAVE_DRIVING_OBSERVATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default formsReducer;
