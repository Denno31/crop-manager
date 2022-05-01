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

import {
  fetchExpenseCategories,
  fetchExpenseCategory,
  updateExpenseCategory,
} from "../../actions/expenseCategoryActions";

import { CardContent, TextField } from "@mui/material";
import { addExpenseCategory } from "../../actions/expenseCategoryActions";

import { useParams } from "react-router-dom";

import {
  ADD_EXPENSE_CATEGORY_RESET,
  FETCH_EXPENSE_CATEGORY_RESET,
  UPDATE_EXPENSE_CATEGORY_RESET,
} from "../../constants/expenseCategoryConstants";

export default function AddExpenseCategoryDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.incomeCategoryCreate
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
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchExpenseCategories());
      dispatch({ type: ADD_EXPENSE_CATEGORY_RESET });
      dispatch({ type: UPDATE_EXPENSE_CATEGORY_RESET });
      handleClose();
    }
    if (expenseCategory) {
      setIsUpdate(true);
      setExpenseCategory(expenseCategory?.incomeCategory);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, successUpdate, expenseCategory]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchExpenseCategory(id));
    } else {
      dispatch({ type: FETCH_EXPENSE_CATEGORY_RESET });
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseCategory = {};
    expenseCategory.expenseCategory = expensecategory;

    if (!isUpdate) {
      dispatch(addExpenseCategory(expenseCategory));
    } else {
      expenseCategory._id = id;
      dispatch(updateExpenseCategory(expenseCategory));
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
          {"Add New Expense Category"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingExpenseCategoryUpdate) && (
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
                    label="Category name"
                    name="incomeCategory"
                    margin="normal"
                    required
                    fullWidth
                    value={expensecategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
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
