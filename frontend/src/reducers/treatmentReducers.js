import {
  FETCH_TREATMENTS_FAIL,
  FETCH_TREATMENTS_REQUEST,
  FETCH_TREATMENTS_SUCCESS,
  ADD_TREATMENT_REQUEST,
  ADD_TREATMENT_SUCCESS,
  ADD_TREATMENT_FAIL,
  ADD_TREATMENT_RESET,
  FETCH_TREATMENT_REQUEST,
  FETCH_TREATMENT_SUCCESS,
  FETCH_TREATMENT_FAIL,
  FETCH_TREATMENT_RESET,
  UPDATE_TREATMENT_REQUEST,
  UPDATE_TREATMENT_SUCCESS,
  UPDATE_TREATMENT_RESET,
  UPDATE_TREATMENT_FAIL,
  DELETE_TREATMENT_REQUEST,
  DELETE_TREATMENT_SUCCESS,
  DELETE_TREATMENT_RESET,
  DELETE_TREATMENT_FAIL,
} from "../constants/treatmentConstants";
export const treatmentsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TREATMENTS_REQUEST:
      return { loading: true };
    case FETCH_TREATMENTS_SUCCESS:
      return { loading: false, treatments: action.payload };
    case FETCH_TREATMENTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const treatmentReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TREATMENT_REQUEST:
      return { loading: true };
    case FETCH_TREATMENT_SUCCESS:
      return { loading: false, treatment: action.payload };
    case FETCH_TREATMENT_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_TREATMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const addTreatmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TREATMENT_REQUEST:
      return { loading: true };
    case ADD_TREATMENT_SUCCESS:
      return { loading: false, success: true, treatment: action.payload };
    case ADD_TREATMENT_RESET:
      return {};
    case ADD_TREATMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateTreatmentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TREATMENT_REQUEST:
      return { loading: true };
    case UPDATE_TREATMENT_SUCCESS:
      return { loading: false, success: true, treatment: action.payload };
    case UPDATE_TREATMENT_RESET:
      return {};
    case UPDATE_TREATMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteTreatmentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TREATMENT_REQUEST:
      return { loading: true };
    case DELETE_TREATMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TREATMENT_RESET:
      return {};
    case DELETE_TREATMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
