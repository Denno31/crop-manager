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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { convertToLocalTime } from "date-fns-timezone";

import {
  fetchExpenses,
  fetchExpense,
  updateExpense,
} from "../../actions/expenseActions";

import { CardContent, TextField } from "@mui/material";
import { addExpense } from "../../actions/expenseActions";

import { useParams } from "react-router-dom";

import {
  ADD_EXPENSE_RESET,
  FETCH_EXPENSE_RESET,
  UPDATE_EXPENSE_RESET,
} from "../../constants/expenseConstants";
import { fetchFields } from "../../actions/fieldActions";
import { fetchExpenseCategories } from "../../actions/expenseCategoryActions";
import { dateFormater } from "../../utils";
export default function AddExpenseDialog({ handleClose, open }) {
  const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.expenseCreate
  );
  const {
    error: errorExpense,
    loading: loadingExpense,
    expense,
  } = useSelector((state) => state.expense);
  const {
    error: errorExpenseUpdate,
    loading: loadingExpenseUpdate,
    success: successUpdate,
    expense: expenseUpdate,
  } = useSelector((state) => state.expenseUpdate);
  const {
    loading: loadingFields,
    error: errorFields,
    fields,
  } = useSelector((state) => state.fields);
  const {
    loading: loadingExpenseCategories,
    error: errorexpenseCategories,
    expenseCategories,
  } = useSelector((state) => state.expenseCategories);
  const [expenseTrans, setExpense] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [field, setField] = React.useState("");

  const [expenseCategory, setExpenseCategory] = React.useState("");
  const [receipt, setReceipt] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [expenseDate, setExpenseDate] = React.useState(new Date());
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchExpenses());
      dispatch({ type: ADD_EXPENSE_RESET });
      dispatch({ type: UPDATE_EXPENSE_RESET });
      handleClose();
    }
    if (expense) {
      setIsUpdate(true);

      setExpense(expense?.expenseAmount);
      setReceipt(expense?.receiptNo);
      setCustomer(expense.customerName);
      setExpenseCategory(expense?.category._id);
      setExpenseDate(dateFormater(expense.expenseDate));
      setField(expense?.field._id);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, successUpdate, expense]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchExpense(id));
    } else {
      dispatch({ type: FETCH_EXPENSE_RESET });
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    dispatch(fetchFields());
    dispatch(fetchExpenseCategories());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseData = {};
    expenseData.field = field;
    expenseData.category = expenseCategory;
    expenseData.expenseAmount = expenseTrans;
    expenseData.receiptNo = receipt;
    expenseData.customerName = customer;
    expenseData.expenseDate = formatDate(new Date(expenseDate));

    if (!isUpdate) {
      dispatch(addExpense(expenseData));
    } else {
      expenseData._id = id;
      dispatch(updateExpense(expenseData));
    }
  };
  const formatDate = (dateX) => {
    return (
      dateX.getFullYear() +
      "-" +
      (dateX.getMonth() + 1) +
      "-" +
      (dateX.getDate() + 1)
    );
  };
  function convertUTCDateToLocalDate(date) {
    console.log(date);
    var newDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return newDate;
  }
  const createDate = (date) => {};
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!isUpdate ? "Add New Expense " : "Update Expense"}
        </DialogTitle>
        <DialogContent>
          {(loading ||
            loadingExpenseUpdate ||
            loadingExpenseCategories ||
            loadingFields ||
            loadingExpense) && (
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
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="field-label">Field</InputLabel>
                    <Select
                      labelId="field-label"
                      id="fieldType"
                      value={field}
                      name="field"
                      onChange={(e) => setField(e.target.value)}
                      label="-Select field-"
                    >
                      {fields?.map((field) => (
                        <MenuItem key={field?._id} value={field._id}>
                          {field?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="expense-category-label">
                      Expense Category
                    </InputLabel>
                    <Select
                      labelId="expense-category-label"
                      id="expenseType"
                      value={expenseCategory}
                      name="expense"
                      onChange={(e) => setExpenseCategory(e.target.value)}
                      label="-Select expenseType-"
                    >
                      {expenseCategories?.map((expensecategory) => (
                        <MenuItem
                          key={expensecategory?._id}
                          value={expensecategory?._id}
                        >
                          {expensecategory.expenseCategory}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="How much did spend"
                    name="amount"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={expenseTrans}
                    onChange={(e) => setExpense(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={expenseDate}
                        onChange={(newValue) => setExpenseDate(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <TextField
                    label="Receipt no (optional)"
                    name="receipt"
                    margin="normal"
                    required
                    fullWidth
                    value={receipt}
                    onChange={(e) => setReceipt(e.target.value)}
                  />
                  <TextField
                    label="Name of Customer"
                    name="customer"
                    margin="normal"
                    required
                    fullWidth
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
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
