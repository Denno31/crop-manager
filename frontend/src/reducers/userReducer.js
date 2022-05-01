import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_RESET,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_RESET,
  FETCH_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_SIGN_FAIL,
  USER_SIGN_REQUEST,
  USER_SIGN_SUCCESS,
} from "../constants/userConstants";
export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGN_REQUEST:
      return { loading: true };
    case USER_SIGN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_FAIL:
      return { loading: false, error: action.payload };
    case "USER_SIGNOUT":
      localStorage.removeItem("userInfo");
      return {};

    default:
      return state;
  }
};
export const fetchUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { loading: true };
    case FETCH_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case FETCH_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const fetchUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { loading: true };
    case FETCH_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case FETCH_USER_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return { loading: true };
    case ADD_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case ADD_USER_RESET:
      return {};
    case ADD_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case UPDATE_USER_RESET:
      return {};
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_USER_RESET:
      return {};
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
