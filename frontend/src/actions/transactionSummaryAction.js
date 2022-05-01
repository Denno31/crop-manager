import Axios from "axios";
import {
  FETCH_SUMMARY_FAIL,
  FETCH_SUMMARY_REQUEST,
  FETCH_SUMMARY_SUCCESS,
} from "../constants/transactionSummaryConstant";

export const fetchTransactionSummary = () => async (dispatch) => {
  dispatch({ type: FETCH_SUMMARY_REQUEST });
  try {
    const { data } = await Axios.get("/api/income/transaction/summary");
    dispatch({ type: FETCH_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SUMMARY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
