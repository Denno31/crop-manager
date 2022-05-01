import {
  FETCH_SUMMARY_FAIL,
  FETCH_SUMMARY_REQUEST,
  FETCH_SUMMARY_SUCCESS,
} from "../constants/transactionSummaryConstant";

export const transactionSummaryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUMMARY_REQUEST:
      return { loading: true };
    case FETCH_SUMMARY_SUCCESS:
      return { loading: false, transactionSummary: action.payload };
    case FETCH_SUMMARY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
