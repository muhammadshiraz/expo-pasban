import {
  SAVE_VEHICLE_OBSERVATION_REQUEST,
  SAVE_VEHICLE_OBSERVATION_SUCCESS,
  SAVE_VEHICLE_OBSERVATION_FAILURE,
  SAVE_DRIVING_OBSERVATION_REQUEST,
  SAVE_DRIVING_OBSERVATION_SUCCESS,
  SAVE_DRIVING_OBSERVATION_FAILURE,
} from './types';
import {
  vehicleObservation as apiVehicleObservation,
  drivingObservation as apiDrivingObservation,
} from '@utils/api';

export const saveVehicleObservation = (observationData) => async (dispatch) => {
  dispatch({ type: SAVE_VEHICLE_OBSERVATION_REQUEST });
  try {
    const data = await apiVehicleObservation(observationData);

    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    dispatch({ type: SAVE_VEHICLE_OBSERVATION_SUCCESS, payload: parsedData });
    return parsedData;
  } catch (error) {
    dispatch({
      type: SAVE_VEHICLE_OBSERVATION_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};

export const saveDrivingObservation = (observationData) => async (dispatch) => {
  dispatch({ type: SAVE_DRIVING_OBSERVATION_REQUEST });
  try {
    const data = await apiDrivingObservation(observationData);

    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

    dispatch({ type: SAVE_DRIVING_OBSERVATION_SUCCESS, payload: parsedData });
    return parsedData;
  } catch (error) {
    dispatch({
      type: SAVE_DRIVING_OBSERVATION_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};
