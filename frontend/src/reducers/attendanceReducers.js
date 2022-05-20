import {
  FETCH_ATTENDANCES_FAIL,
  FETCH_ATTENDANCES_REQUEST,
  FETCH_ATTENDANCES_SUCCESS,
  ADD_ATTENDANCE_REQUEST,
  ADD_ATTENDANCE_SUCCESS,
  ADD_ATTENDANCE_FAIL,
  ADD_ATTENDANCE_RESET,
  FETCH_ATTENDANCE_REQUEST,
  FETCH_ATTENDANCE_SUCCESS,
  FETCH_ATTENDANCE_FAIL,
  FETCH_ATTENDANCE_RESET,
  UPDATE_ATTENDANCE_REQUEST,
  UPDATE_ATTENDANCE_SUCCESS,
  UPDATE_ATTENDANCE_RESET,
  UPDATE_ATTENDANCE_FAIL,
  DELETE_ATTENDANCE_REQUEST,
  DELETE_ATTENDANCE_SUCCESS,
  DELETE_ATTENDANCE_RESET,
  DELETE_ATTENDANCE_FAIL,
} from "../constants/attendanceConstants";
export const attendancesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCES_REQUEST:
      return { loading: true };
    case FETCH_ATTENDANCES_SUCCESS:
      return { loading: false, attendances: action.payload };
    case FETCH_ATTENDANCES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const attendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE_REQUEST:
      return { loading: true };
    case FETCH_ATTENDANCE_SUCCESS:
      return { loading: false, attendance: action.payload };
    case FETCH_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_ATTENDANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const addAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ATTENDANCE_REQUEST:
      return { loading: true };
    case ADD_ATTENDANCE_SUCCESS:
      return { loading: false, success: true, attendance: action.payload };
    case ADD_ATTENDANCE_RESET:
      return {};
    case ADD_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ATTENDANCE_REQUEST:
      return { loading: true };
    case UPDATE_ATTENDANCE_SUCCESS:
      return { loading: false, success: true, attendance: action.payload };
    case UPDATE_ATTENDANCE_RESET:
      return {};
    case UPDATE_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ATTENDANCE_REQUEST:
      return { loading: true };
    case DELETE_ATTENDANCE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ATTENDANCE_RESET:
      return {};
    case DELETE_ATTENDANCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
