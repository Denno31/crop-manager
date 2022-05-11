import {
  FETCH_EMPLOYEES_FAIL,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_RESET,
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAIL,
  FETCH_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_FAIL,
} from "../constants/employeeConstants";
export const employeesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return { loading: true };
    case FETCH_EMPLOYEES_SUCCESS:
      return { loading: false, employees: action.payload };
    case FETCH_EMPLOYEES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const employeeReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_REQUEST:
      return { loading: true };
    case FETCH_EMPLOYEE_SUCCESS:
      return { loading: false, employee: action.payload };
    case FETCH_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_EMPLOYEE_RESET:
      return {};
    default:
      return state;
  }
};

export const addEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return { loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      return { loading: false, success: true, employee: action.payload };
    case ADD_EMPLOYEE_RESET:
      return {};
    case ADD_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE_REQUEST:
      return { loading: true };
    case UPDATE_EMPLOYEE_SUCCESS:
      return { loading: false, success: true, employee: action.payload };
    case UPDATE_EMPLOYEE_RESET:
      return {};
    case UPDATE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return { loading: true };
    case DELETE_EMPLOYEE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_EMPLOYEE_RESET:
      return {};
    case DELETE_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
