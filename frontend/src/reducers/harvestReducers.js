import {
  FETCH_HARVESTS_FAIL,
  FETCH_HARVESTS_REQUEST,
  FETCH_HARVESTS_SUCCESS,
  ADD_HARVEST_REQUEST,
  ADD_HARVEST_SUCCESS,
  ADD_HARVEST_FAIL,
  ADD_HARVEST_RESET,
  FETCH_HARVEST_REQUEST,
  FETCH_HARVEST_SUCCESS,
  FETCH_HARVEST_FAIL,
  FETCH_HARVEST_RESET,
  UPDATE_HARVEST_REQUEST,
  UPDATE_HARVEST_SUCCESS,
  UPDATE_HARVEST_RESET,
  UPDATE_HARVEST_FAIL,
  DELETE_HARVEST_REQUEST,
  DELETE_HARVEST_SUCCESS,
  DELETE_HARVEST_RESET,
  DELETE_HARVEST_FAIL,
} from "../constants/harvestConstants";
export const harvestsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_HARVESTS_REQUEST:
      return { loading: true };
    case FETCH_HARVESTS_SUCCESS:
      return { loading: false, harvests: action.payload };
    case FETCH_HARVESTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const harvestReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_HARVEST_REQUEST:
      return { loading: true };
    case FETCH_HARVEST_SUCCESS:
      return { loading: false, harvest: action.payload };
    case FETCH_HARVEST_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_HARVEST_RESET:
      return {};
    default:
      return state;
  }
};

export const addHarvestReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_HARVEST_REQUEST:
      return { loading: true };
    case ADD_HARVEST_SUCCESS:
      return { loading: false, success: true, harvest: action.payload };
    case ADD_HARVEST_RESET:
      return {};
    case ADD_HARVEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateHarvestReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HARVEST_REQUEST:
      return { loading: true };
    case UPDATE_HARVEST_SUCCESS:
      return { loading: false, success: true, harvest: action.payload };
    case UPDATE_HARVEST_RESET:
      return {};
    case UPDATE_HARVEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteHarvestReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_HARVEST_REQUEST:
      return { loading: true };
    case DELETE_HARVEST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_HARVEST_RESET:
      return {};
    case DELETE_HARVEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
