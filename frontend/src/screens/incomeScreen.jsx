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
import { deleteIncome, fetchIncomes } from "../actions/incomeActions";
import moment from "moment";
import { FETCH_INCOME_RESET } from "../constants/incomeConstants";
import AddIncomeDialog from "../components/forms/AddIncomeDialog";
import { dateFormater } from "../utils";
import MyDataGrid from "../components/MyDataGrid";

const columns = [
  { field: "category", headerName: "Source", width: 150 },
  {
    field: "incomeDate",
    headerName: "Date Of Income",
    flex: 1,
    editable: true,
  },

  {
    field: "incomeAmount",
    headerName: "Amount",
    type: "number",
    flex: 1,
    editable: true,
  },
];

const useStyles = makeStyles({
  root: {
    padding: "15px 5px",
  },
});
const IncomeScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, incomes } = useSelector((state) => state.incomes);
  const {
    loading: loadingIncomeDelete,
    error: errorIncomeDelete,
    success: successIncomeDelete,
  } = useSelector((state) => state.incomeDelete);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch, successIncomeDelete]);
  React.useEffect(() => {
    if (!open) setId(null);
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formatRowsData = () => {
    let rows = incomes?.map((c) => {
      return {
        ...c,

        id: c._id,
        field: c?.field?.name,
        category: c?.category?.incomeCategory,
        incomeDate: dateFormater(c?.incomeDate),
        handleClickOpen,

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
    dispatch(deleteIncome(id));
  };
  return (
    <MainLayout>
      <div className="table__unresponsive">
        <div className="page__title">
          <Typography className={classes.root} variant="h5">
            Incomes
          </Typography>
        </div>
        <div className="add__btn__container">
          <Button
            onClick={() => {
              //navigate("/income");
              dispatch({ type: FETCH_INCOME_RESET });
              handleClickOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </div>
        {(loading || loadingIncomeDelete) && <CircularProgress />}
        {error && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {error}
          </Alert>
        )}
        {errorIncomeDelete && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {errorIncomeDelete}
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
                Incomes
              </Typography>
              <Typography className={classes.root} variant="div">
                <Button
                  onClick={() => {
                    //navigate("/income");
                    dispatch({ type: FETCH_INCOME_RESET });
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
            {(loading || loadingIncomeDelete) && <CircularProgress />}
            {error && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
            {errorIncomeDelete && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {errorIncomeDelete}
              </Alert>
            )}

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell>Date of Income</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell size="small" colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomes?.map((income) => (
                  <TableRow key={income?._id}>
                    <TableCell>{income?.category?.incomeCategory}</TableCell>
                    <TableCell>{dateFormater(income?.incomeDate)}</TableCell>
                    <TableCell>{income?.incomeAmount}</TableCell>
                    <TableCell size="small" align="right">
                      <Button
                        onClick={() => {
                          //navigate(`/income/${income._id}`);
                          setId(income?._id);
                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          console.log(income._id);
                          dispatch(deleteIncome(income._id));
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
      <AddIncomeDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        id={id}
      ></AddIncomeDialog>
    </MainLayout>
  );
};

export default IncomeScreen;
