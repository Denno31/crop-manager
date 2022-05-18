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
import { dateFormater, dateFormaterMMYY } from "../utils";
import {
  deleteTransaction,
  fetchTransaction,
  fetchTransactions,
} from "../actions/transactionActions";
import AddTransactionDialog from "../components/forms/AddTransactionDialog";
import { FETCH_TRANSACTION_RESET } from "../constants/transactionConstants";
import MyDataGrid from "../components/MyDataGrid";

const columns = [
  { field: "transactionId", headerName: "Trans ID", width: 150 },
  {
    field: "employee",
    headerName: "Employee",
    flex: 1,
    editable: true,
  },

  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    flex: 1,
    editable: true,
  },

  {
    field: "month",
    headerName: "Month",

    flex: 1,
    editable: true,
  },
  {
    field: "paymentDate",
    headerName: "Transaction Date",

    flex: 1,
    editable: true,
  },
];

const useStyles = makeStyles({
  root: {
    padding: "15px 0",
  },
});
const TransactionScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, transactions } = useSelector(
    (state) => state.transactions
  );
  const {
    loading: loadingTransactionDelete,
    error: errorTransactionDelete,
    success: successTransactionDelete,
  } = useSelector((state) => state.transactionDelete);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, successTransactionDelete]);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchTransaction(id));
    } else {
      dispatch({ type: FETCH_TRANSACTION_RESET });
    }
  }, [dispatch, id]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (!open) setId(null);
  }, [open]);
  const handleClose = () => {
    setOpen(false);
  };
  const formatRowsData = () => {
    let rows = transactions?.map((c) => {
      return {
        ...c,

        id: c._id,
        handleClickOpen,
        employee: c.employeeId.name,
        month: dateFormaterMMYY(c.month),
        paymentDate: dateFormater(c.paymentDate),
        navigateFunc,
        handleDelete,
      };
    });
    if (!rows) return [];
    return rows;
  };
  const navigateFunc = (id) => {
    setId(id);
  };
  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };
  return (
    <MainLayout>
      <div className="table__unresponsive">
        <div className="page__title">
          <Typography className={classes.root} variant="h5">
            Transactions
          </Typography>
        </div>
        <div className="add__btn__container">
          <Button
            onClick={() => {
              //navigate("/transactions");
              dispatch({ type: FETCH_TRANSACTION_RESET });
              handleClickOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </div>
        {(loading || loadingTransactionDelete) && <CircularProgress />}
        {error && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {error}
          </Alert>
        )}
        {errorTransactionDelete && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {errorTransactionDelete}
          </Alert>
        )}
        <MyDataGrid
          cols={columns}
          rows={formatRowsData()}
          handleClickOpen={handleClickOpen}
        />
      </div>
      <div className="table__responsive">
        <Typography variant="div">
          <TableContainer component={Paper}>
            <Typography variant="div">
              <Typography className={classes.root} variant="h5">
                Transactions
              </Typography>
              <Typography className={classes.root} variant="div">
                <Button
                  onClick={() => {
                    //navigate("/transactions");
                    dispatch({ type: FETCH_TRANSACTION_RESET });
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
            {(loading || loadingTransactionDelete) && <CircularProgress />}
            {error && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
            {errorTransactionDelete && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {errorTransactionDelete}
              </Alert>
            )}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell>Harvest Unit </TableCell>
                  <TableCell>Plantings</TableCell>
                  <TableCell>Varieties</TableCell>
                  <TableCell size="small" colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.map((transaction) => (
                  <TableRow key={transaction?._id}>
                    <TableCell align="left">
                      {transaction?.transactionName}
                    </TableCell>
                    <TableCell>{transaction?.harvestUnit}</TableCell>
                    <TableCell>{transaction?.plantings}</TableCell>
                    <TableCell>{transaction?.varieties}</TableCell>

                    <TableCell size="small" align="right">
                      <Button
                        onClick={() => {
                          //navigate(`/transactions/${transaction._id}`);
                          setId(transaction?._id);
                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          dispatch(deleteTransaction(transaction._id));
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
        </Typography>
      </div>
      <AddTransactionDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        id={id}
      ></AddTransactionDialog>
    </MainLayout>
  );
};

export default TransactionScreen;
