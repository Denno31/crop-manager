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
import Axios from "axios";

import {
  fetchExpenseCategories,
  fetchExpenseCategory,
  updateExpenseCategory,
} from "../../actions/expenseCategoryActions";

import { CardContent, FormControl, TextField } from "@mui/material";
import { addExpenseCategory } from "../../actions/expenseCategoryActions";

import { useParams } from "react-router-dom";

import {
  ADD_EXPENSE_CATEGORY_RESET,
  FETCH_EXPENSE_CATEGORY_RESET,
  UPDATE_EXPENSE_CATEGORY_RESET,
} from "../../constants/expenseCategoryConstants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { fetchItems } from "../../actions/itemActions";

export default function AddDeductStock({ handleClose, open, additionType }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { add_type } = useParams();
  const [month, setMonth] = React.useState(null);
  const { error, loading, success } = useSelector(
    (state) => state.expenseCategoryCreate
  );
  const {
    error: errorExpenseCategory,
    loading: loadingExpenseCategory,
    expenseCategory,
  } = useSelector((state) => state.expenseCategory);
  const {
    error: errorExpenseCategoryUpdate,
    loading: loadingExpenseCategoryUpdate,
    success: successUpdate,
    expenseCategory: expenseCategoryUpdate,
  } = useSelector((state) => state.expenseCategoryUpdate);
  const [expensecategory, setExpenseCategory] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [quantity, setQuantity] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [loadingStock, setLoadingStock] = React.useState(false);
  const [successAdd, setSuccessAdd] = React.useState(false);
  React.useEffect(() => {
    if (successAdd) {
      dispatch(fetchItems());
      handleClose();
    }
    // if (success || successUpdate) {
    //   dispatch(fetchExpenseCategories());
    //   dispatch({ type: ADD_EXPENSE_CATEGORY_RESET });
    //   dispatch({ type: UPDATE_EXPENSE_CATEGORY_RESET });
    //   handleClose();
    // }
    // if (expenseCategory) {
    //   console.log("Expense category here", expenseCategory);
    //   setIsUpdate(true);
    //   setExpenseCategory(expenseCategory?.expenseCategory);
    // } else {
    //   setIsUpdate(false);
    // }
  }, [dispatch, successAdd]);
  React.useEffect(() => {
    // if(success)
    setSuccessAdd(false);
  }, [successAdd]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchExpenseCategory(id));
    } else {
      dispatch({ type: FETCH_EXPENSE_CATEGORY_RESET });
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseCategoryData = {};
    expenseCategoryData.expenseCategory = expensecategory;

    if (!isUpdate) {
      dispatch(addExpenseCategory(expenseCategoryData));
    } else {
      expenseCategoryData._id = id;
      dispatch(updateExpenseCategory(expenseCategoryData));
    }
  };
  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      setLoadingStock(true);
      const res = await Axios.post(`/api/items/stocks`, {
        item: id?.split("_")[1],
        quantity: quantity,
        additionType: add_type,
        addedDate: date,
        comment: comment,
      });
      setLoadingStock(false);
      setSuccessAdd(true);
    } catch (err) {
      setLoadingStock(false);
      setSuccessAdd(false);
      console.log(err);
    }
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
          {add_type === "addition"
            ? "Add Stock for " + id?.split("_")[0]
            : "Deduct Stock for " + id?.split("_")[0]}
        </DialogTitle>
        <DialogContent>
          {(loadingStock || loadingExpenseCategoryUpdate) && (
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
                    label={
                      add_type === "addition"
                        ? "Quantity To Add"
                        : "Quantity To Deduct"
                    }
                    name="quantity"
                    margin="normal"
                    type="number"
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    required
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Box>
                <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="date"
                      value={date}
                      onChange={(newValue) => {
                        console.log(newValue);
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
                <TextField
                  fullWidth
                  label="Comments"
                  margin="normal"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></TextField>
              </CardContent>
            </Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            type="submit"
            onClick={handleAddStock}
            autoFocus
          >
            Submit
          </Button>

          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
