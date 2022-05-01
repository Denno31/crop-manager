import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import MainLayout from "../components/MainLayout";
import { fetchTransactionSummary } from "../actions/transactionSummaryAction";
import { Alert } from "@mui/material";
const HomeScreen = () => {
  const { loading, error, transactionSummary } = useSelector(
    (state) => state.transactionSummary
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTransactionSummary());
  }, [dispatch]);

  return (
    <MainLayout>
      {loading ? (
        <CircularProgress></CircularProgress>
      ) : error ? (
        <Alert>{error}</Alert>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <div className="card" style={{ background: "#2ECC71" }}>
                <div class="card_inner">
                  <p
                    class="text-primary-p"
                    style={{ color: "#ffffff !important;" }}
                  >
                    Total Income
                  </p>
                  <span class="font-bold text-title">
                    {transactionSummary?.income[0]?.totalIncome.toLocaleString(
                      "KE",
                      { style: "currency", currency: "KSH" }
                    )}
                  </span>
                  <span
                    class="font-bold text-title"
                    style={{ color: "#ffffff !important" }}
                  ></span>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="card" style={{ background: "#FF9800" }}>
                <div class="card_inner">
                  <p
                    class="text-primary-p"
                    style={{ color: "#ffffff !important;" }}
                  >
                    Total Expense
                  </p>
                  <span class="font-bold text-title">
                    {transactionSummary?.expense[0]?.totalExpense.toLocaleString(
                      "KE",
                      { style: "currency", currency: "KSH" }
                    )}
                  </span>
                  <span
                    class="font-bold text-title"
                    style={{ color: "#ffffff !important" }}
                  ></span>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="card" style={{ background: "#00BBD9" }}>
                <div class="card_inner">
                  <p
                    class="text-primary-p"
                    style={{ color: "#ffffff !important;" }}
                  >
                    Net Profit
                  </p>
                  <span class="font-bold text-title">
                    {(
                      transactionSummary?.income[0]?.totalIncome -
                      transactionSummary?.expense[0]?.totalExpense
                    ).toLocaleString("KE", {
                      style: "currency",
                      currency: "KSH",
                    })}
                  </span>
                  <span
                    class="font-bold text-title"
                    style={{ color: "#ffffff !important" }}
                  ></span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
    </MainLayout>
  );
};

export default HomeScreen;
