// redux/actions/ltoReducer.js
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
} from '@redux/actions/types';

const initialState = {
  ltoStats: {},
  vehiclesStats: {},
  ddcStatus: {},
  empTrainingStats: {},
  documentsStatus: {},
  LTO: [],
  cancelledLTO: [],
  viewAuthLetter: [],
  authorityLetterForPrint: [],
  loading: false,
  error: null,
};

const ltoReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LTO_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_LTO_STATS_SUCCESS:
      return {
        ...state,
        ltoStats: action.payload,
        loading: false,
        error: null,
      };
    case POST_LTO_STATS_FAILURE:
      return {
        ...state,
        ltoStats: {},
        loading: false,
        error: action.payload,
      };

    case POST_VEHICLES_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_VEHICLES_STATS_SUCCESS:
      return {
        ...state,
        vehiclesStats: action.payload,
        loading: false,
        error: null,
      };
    case POST_VEHICLES_STATS_FAILURE:
      return {
        ...state,
        vehiclesStats: {},
        loading: false,
        error: action.payload,
      };

    case POST_DDC_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_DDC_STATS_SUCCESS:
      return {
        ...state,
        ddcStatus: action.payload,
        loading: false,
        error: null,
      };
    case POST_DDC_STATS_FAILURE:
      return {
        ...state,
        ddcStatus: {},
        loading: false,
        error: action.payload,
      };

    case POST_EMP_TRAINING_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_EMP_TRAINING_STATS_SUCCESS:
      return {
        ...state,
        empTrainingStats: action.payload,
        loading: false,
        error: null,
      };
    case POST_EMP_TRAINING_STATS_FAILURE:
      return {
        ...state,
        empTrainingStats: {},
        loading: false,
        error: action.payload,
      };

    case POST_DOCUMENTS_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_DOCUMENTS_STATUS_SUCCESS:
      return {
        ...state,
        documentsStatus: action.payload,
        loading: false,
        error: null,
      };
    case POST_DOCUMENTS_STATUS_FAILURE:
      return {
        ...state,
        documentsStatus: {},
        loading: false,
        error: action.payload,
      };

    case GET_LTO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LTO_SUCCESS:
      return {
        ...state,
        LTO: action.payload,
        loading: false,
        error: null,
      };
    case GET_LTO_FAILURE:
      return {
        ...state,
        LTO: [],
        loading: false,
        error: action.payload,
      };

    case GET_CANCELLED_LTO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CANCELLED_LTO_SUCCESS:
      return {
        ...state,
        cancelledLTO: action.payload,
        loading: false,
        error: null,
      };
    case GET_CANCELLED_LTO_FAILURE:
      return {
        ...state,
        cancelledLTO: [],
        loading: false,
        error: action.payload,
      };

    case GET_AUTHORITY_LETTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_AUTHORITY_LETTER_SUCCESS:
      return {
        ...state,
        viewAuthLetter: action.payload,
        loading: false,
        error: null,
      };
    case GET_AUTHORITY_LETTER_FAILURE:
      return {
        ...state,
        viewAuthLetter: [],
        loading: false,
        error: action.payload,
      };

    case GET_AUTHORITY_LETTER_FOR_PRINT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_AUTHORITY_LETTER_FOR_PRINT_SUCCESS:
      return {
        ...state,
        authorityLetterForPrint: action.payload,
        loading: false,
        error: null,
      };
    case GET_AUTHORITY_LETTER_FOR_PRINT_FAILURE:
      return {
        ...state,
        authorityLetterForPrint: [],
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ltoReducer;
