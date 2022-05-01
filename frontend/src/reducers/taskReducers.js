import {
  FETCH_TASKS_FAIL,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  ADD_TASK_RESET,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAIL,
  FETCH_TASK_RESET,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_RESET,
  UPDATE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_RESET,
  DELETE_TASK_FAIL,
} from "../constants/taskConstants";
export const tasksReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return { loading: true };
    case FETCH_TASKS_SUCCESS:
      return { loading: false, tasks: action.payload };
    case FETCH_TASKS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASK_REQUEST:
      return { loading: true };
    case FETCH_TASK_SUCCESS:
      return { loading: false, task: action.payload };
    case FETCH_TASK_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_TASK_RESET:
      return {};
    default:
      return state;
  }
};

export const addTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      return { loading: true };
    case ADD_TASK_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case ADD_TASK_RESET:
      return {};
    case ADD_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updateTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { loading: true };
    case UPDATE_TASK_SUCCESS:
      return { loading: false, success: true, task: action.payload };
    case UPDATE_TASK_RESET:
      return {};
    case UPDATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const deleteTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { loading: true };
    case DELETE_TASK_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TASK_RESET:
      return {};
    case DELETE_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
