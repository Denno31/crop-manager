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
  deleteEmployee,
  fetchEmployee,
  fetchEmployees,
} from "../actions/employeeActions";
import AddEmployeeDialog from "../components/forms/AddEmployeeDialog";
import { FETCH_EMPLOYEE_RESET } from "../constants/employeeConstants";
import MyDataGrid from "../components/MyDataGrid";
import { dateFormater } from "../utils";

const columns = [
  { field: "employeeNo", headerName: "Employee No:", width: 150 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    editable: true,
  },
  {
    field: "joinDate",
    headerName: "Start Date",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    type: "string",
    flex: 1,
    editable: true,
  },

  {
    field: "designation",
    headerName: "Designation",

    flex: 1,
    editable: true,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    flex: 1,
    editable: true,
  },
];

const useStyles = makeStyles({
  root: {
    padding: "15px 0",
  },
});
const EmployeeScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, employees } = useSelector((state) => state.employees);
  const {
    loading: loadingEmployeeDelete,
    error: errorEmployeeDelete,
    success: successEmployeeDelete,
  } = useSelector((state) => state.employeeDelete);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch, successEmployeeDelete]);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchEmployee(id));
    } else {
      dispatch({ type: FETCH_EMPLOYEE_RESET });
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
    let rows = employees?.map((c) => {
      return {
        ...c,

        id: c._id,
        handleClickOpen,
        phone: c.phone.toString(),
        joinDate: dateFormater(c?.joinDate),
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
    dispatch(deleteEmployee(id));
  };
  return (
    <MainLayout>
      <div className="table__unresponsive">
        <div className="page__title">
          <Typography className={classes.root} variant="h5">
            Employees
          </Typography>
        </div>
        <div className="add__btn__container">
          <Button
            onClick={() => {
              //navigate("/employees");
              dispatch({ type: FETCH_EMPLOYEE_RESET });
              handleClickOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </div>
        {(loading || loadingEmployeeDelete) && <CircularProgress />}
        {error && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {error}
          </Alert>
        )}
        {errorEmployeeDelete && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {errorEmployeeDelete}
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
                Employees
              </Typography>
              <Typography className={classes.root} variant="div">
                <Button
                  onClick={() => {
                    dispatch({ type: FETCH_EMPLOYEE_RESET });
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
            {(loading || loadingEmployeeDelete) && <CircularProgress />}
            {error && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
            {errorEmployeeDelete && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {errorEmployeeDelete}
              </Alert>
            )}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee No</TableCell>
                  <TableCell> Name </TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell size="small" colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees?.map((employee) => (
                  <TableRow key={employee?._id}>
                    <TableCell align="left">{employee?.employeeNo}</TableCell>
                    <TableCell>{employee?.name}</TableCell>
                    <TableCell>{employee?.phone}</TableCell>
                    <TableCell>{employee?.designation}</TableCell>
                    <TableCell>{employee?.salary}</TableCell>

                    <TableCell size="small" align="right">
                      <Button
                        onClick={() => {
                          //navigate(`/employees/${employee._id}`);
                          setId(employee?._id);
                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          console.log(employee._id);
                          dispatch(deleteEmployee(employee._id));
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
      <AddEmployeeDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        id={id}
      ></AddEmployeeDialog>
    </MainLayout>
  );
};

export default EmployeeScreen;
