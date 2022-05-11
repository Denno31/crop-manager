import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Card from "@mui/material/Card";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  fetchTransactions,
  fetchTransaction,
  updateTransaction,
} from "../../actions/transactionActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_TRANSACTION_RESET,
  FETCH_TRANSACTION_RESET,
  UPDATE_TRANSACTION_RESET,
} from "../../constants/transactionConstants";
import { useParams } from "react-router-dom";
import { addTransaction } from "../../actions/transactionActions";
import { fetchEmployees } from "../../actions/employeeActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function AddTransactionDialog({ handleClose, open, id }) {
  const dispatch = useDispatch();
  console.log(id);
  const { error, loading, success } = useSelector(
    (state) => state.transactionCreate
  );
  const {
    error: errorTransaction,
    loading: loadingTransaction,
    transaction,
  } = useSelector((state) => state.transaction);
  const {
    error: errorTransactionUpdate,
    loading: loadingTransactionUpdate,
    success: successUpdate,
    transaction: transactionUpdate,
  } = useSelector((state) => state.transactionUpdate);
  const [transactionName, setTransactionName] = React.useState("");
  const [transactionNumber, setTransactionNumber] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState(undefined);
  const [designation, setDesignation] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [employee, setEmployee] = React.useState("");
  const [month, setMonth] = React.useState(null);
  const [year, setYear] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState("");
  const {
    loading: loadingEmployee,
    error: errorEmployee,
    employees,
  } = useSelector((state) => state.employees);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchTransactions());
      dispatch({ type: ADD_TRANSACTION_RESET });
      dispatch({ type: UPDATE_TRANSACTION_RESET });
      handleClose();
    }
    if (transaction) {
      setIsUpdate(true);

      setTransactionNumber(transaction?.transactionId);
      setEmployee(transaction?.employeeId);
      setSalary(transaction?.amount);
      setMonth(transaction?.month);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, transaction, successUpdate]);
  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {};
    transactionData.transactionId = transactionNumber;
    transactionData.amount = salary;
    transactionData.employeeId = employee;
    transactionData.month = month;

    if (!isUpdate) {
      dispatch(addTransaction(transactionData));
    } else {
      transactionData._id = id;
      dispatch(updateTransaction(transactionData));
    }
  };
  const populateSalary = () => {
    let emp = employees.find((e) => e._id === employee);
    setSalary(emp.salary);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!id ? "Add New Transaction" : "Update Transaction"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingTransactionUpdate) && (
            <div
              styles={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          <DialogContentText id="alert-dialog-description">
            <Card>
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    label="Transaction ID"
                    name="transactionNumber"
                    margin="normal"
                    required
                    fullWidth
                    value={transactionNumber}
                    onChange={(e) => setTransactionNumber(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="employee">employee</InputLabel>
                    <Select
                      labelId="employee"
                      id="lightProfile"
                      value={employee}
                      name="employee"
                      onChange={(e) => {
                        setEmployee(e.target.value);
                        populateSalary();
                      }}
                      label="-Select Employee-"
                    >
                      {employees?.map((emp) => (
                        <MenuItem value={emp._id}>{emp.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="salary"
                    name="salary"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        views={["year", "month"]}
                        label="Month"
                        inputFormat="MM/yyyy"
                        value={month}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setMonth(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!isUpdate ? (
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleSubmit}
              autoFocus
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleSubmit}
              autoFocus
            >
              update
            </Button>
          )}
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
