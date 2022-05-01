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
import { dateFormater } from "../../utils";
import moment from "moment";
import {
  fetchIncomes,
  fetchIncome,
  updateIncome,
} from "../../actions/incomeActions";

import { CardContent, TextField } from "@mui/material";
import { addIncome } from "../../actions/incomeActions";

import { useParams } from "react-router-dom";

import {
  ADD_INCOME_RESET,
  FETCH_INCOME_RESET,
  UPDATE_INCOME_RESET,
} from "../../constants/incomeConstants";
import { fetchFields } from "../../actions/fieldActions";
import { fetchIncomeCategories } from "../../actions/incomeCategoryActions";

export default function AddIncomeDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.incomeCreate
  );
  const {
    error: errorIncome,
    loading: loadingIncome,
    income,
  } = useSelector((state) => state.income);
  const {
    error: errorIncomeUpdate,
    loading: loadingIncomeUpdate,
    success: successUpdate,
    income: incomeUpdate,
  } = useSelector((state) => state.incomeUpdate);
  const {
    loading: loadingFields,
    error: errorFields,
    fields,
  } = useSelector((state) => state.fields);
  const {
    loading: loadingIncomeCategories,
    error: errorincomeCategories,
    incomeCategories,
  } = useSelector((state) => state.incomeCategories);
  const [incomeTrans, setIncome] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [field, setField] = React.useState("");

  const [incomeCategory, setIncomeCategory] = React.useState("");
  const [receipt, setReceipt] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [incomeDate, setIncomeDate] = React.useState(new Date());
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchIncomes());
      dispatch({ type: ADD_INCOME_RESET });
      dispatch({ type: UPDATE_INCOME_RESET });
      handleClose();
    }
    if (income) {
      setIsUpdate(true);

      setIncome(income?.incomeAmount);
      setReceipt(income?.receiptNo);
      setCustomer(income.customerName);
      setIncomeCategory(income?.category._id);
      setIncomeDate(dateFormater(income?.incomeDate));
      setField(income?.field._id);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, successUpdate, income]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchIncome(id));
    } else {
      dispatch({ type: FETCH_INCOME_RESET });
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    dispatch(fetchFields());
    dispatch(fetchIncomeCategories());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeData = {};
    incomeData.field = field;
    incomeData.category = incomeCategory;
    incomeData.incomeAmount = incomeTrans;
    incomeData.receiptNo = receipt;
    incomeData.customerName = customer;
    incomeData.incomeDate = formatDate(new Date(incomeDate));
    console.log(incomeData);
    if (!isUpdate) {
      dispatch(addIncome(incomeData));
    } else {
      incomeData._id = id;
      dispatch(updateIncome(incomeData));
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
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!isUpdate ? "Add New Income " : "Update Income"}
        </DialogTitle>
        <DialogContent>
          {(loading ||
            loadingIncomeUpdate ||
            loadingIncomeCategories ||
            loadingFields ||
            loadingIncome) && (
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
                        <MenuItem key={fields?._id} value={field._id}>
                          {field?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="planting-label">Planting</InputLabel>
                    <Select
                      labelId="planting-label"
                      id="planting"
                      value={planting}
                      name="planting"
                      onChange={(e) => setPlanting(e.target.value)}
                      label="-Select field-"
                    >
                      {incomeCategories?.map((incomecategory) => (
                        <MenuItem value={incomecategory._id}>
                          {incomecategory.incomeCategory}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="income-category-label">
                      Income Category
                    </InputLabel>
                    <Select
                      labelId="income-category-label"
                      id="incomeType"
                      value={incomeCategory}
                      name="income"
                      onChange={(e) => setIncomeCategory(e.target.value)}
                      label="-Select incomeType-"
                    >
                      {incomeCategories?.map((incomecategory) => (
                        <MenuItem
                          key={incomecategory?._id}
                          value={incomecategory?._id}
                        >
                          {incomecategory.incomeCategory}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="How much did you earn"
                    name="amount"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={incomeTrans}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={incomeDate}
                        onChange={(newValue) => setIncomeDate(newValue)}
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
