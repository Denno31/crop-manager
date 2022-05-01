import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import {
  deleteExpenseCategory,
  fetchExpenseCategories,
} from "../actions/expenseCategoryActions";

import { FETCH_EXPENSE_CATEGORY_RESET } from "../constants/expenseCategoryConstants";
import AddExpenseCategoryDialog from "../components/forms/AddExpenseCategoryDialog";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const ExpenseCategoryScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, expenseCategories } = useSelector(
    (state) => state.expenseCategories
  );
  const {
    loading: loadingExpenseCategoryDelete,
    error: errorExpenseCategoryDelete,
    success: successExpenseCategoryDelete,
  } = useSelector((state) => state.incomeCategoryDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log("useEffect");
    dispatch(fetchExpenseCategories());
  }, [dispatch, successExpenseCategoryDelete]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MainLayout>
      <Typography variant="div">
        <TableContainer component={Paper}>
          <Typography variant="div">
            <Typography className={classes.root} variant="h5">
              Expense Categories
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/expensecategories");
                  dispatch({ type: FETCH_EXPENSE_CATEGORY_RESET });
                  handleClickOpen();
                }}
                startIcon={<AddIcon />}
                color="secondary"
                variant="contained"
              >
                Add
              </Button>
            </Typography>
          </Typography>
          {(loading || loadingExpenseCategoryDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorExpenseCategoryDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorExpenseCategoryDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>

                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenseCategories?.map((expensecategory) => (
                <TableRow key={expensecategory?._id}>
                  <TableCell align="left">
                    {expensecategory?.expenseCategory}
                  </TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/incomecategories/${expensecategory._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(expensecategory._id);
                        dispatch(deleteExpenseCategory(expensecategory._id));
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddExpenseCategoryDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddExpenseCategoryDialog>
      </Typography>
    </MainLayout>
  );
};

export default ExpenseCategoryScreen;
