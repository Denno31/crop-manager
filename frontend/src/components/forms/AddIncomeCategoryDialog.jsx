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
  fetchIncomeCategories,
  fetchIncomeCategory,
  updateIncomeCategory,
} from "../../actions/incomeCategoryActions";

import { CardContent, TextField } from "@mui/material";
import { addIncomeCategory } from "../../actions/incomeCategoryActions";

import { useParams } from "react-router-dom";

import {
  ADD_INCOME_CATEGORY_RESET,
  FETCH_INCOME_CATEGORY_RESET,
  UPDATE_INCOME_CATEGORY_RESET,
} from "../../constants/incomeCategoryConstants";

export default function AddIncomeCategoryDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.incomeCategoryCreate
  );
  const {
    error: errorIncomeCategory,
    loading: loadingIncomeCategory,
    incomeCategory,
  } = useSelector((state) => state.incomeCategory);
  const {
    error: errorIncomeCategoryUpdate,
    loading: loadingIncomeCategoryUpdate,
    success: successUpdate,
    incomeCategory: incomeCategoryUpdate,
  } = useSelector((state) => state.incomeCategoryUpdate);
  const [incomecategory, setIncomeCategory] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchIncomeCategories());
      dispatch({ type: ADD_INCOME_CATEGORY_RESET });
      dispatch({ type: UPDATE_INCOME_CATEGORY_RESET });
      handleClose();
    }
    if (incomeCategory) {
      setIsUpdate(true);
      setIncomeCategory(incomeCategory?.incomeCategory);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, successUpdate, incomeCategory]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchIncomeCategory(id));
    } else {
      dispatch({ type: FETCH_INCOME_CATEGORY_RESET });
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const incomeCategory = {};
    incomeCategory.incomeCategory = incomecategory;

    if (!isUpdate) {
      dispatch(addIncomeCategory(incomeCategory));
    } else {
      incomeCategory._id = id;
      dispatch(updateIncomeCategory(incomeCategory));
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
          {"Add New Income Category"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingIncomeCategoryUpdate) && (
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
                    value={incomecategory}
                    onChange={(e) => setIncomeCategory(e.target.value)}
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
