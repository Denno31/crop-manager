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
  deleteAttendance,
  fetchAttendance,
  fetchAttendances,
} from "../actions/attendanceActions";
import AddAttendanceDialog from "../components/forms/AddAttendanceDialog";
import { FETCH_ATTENDANCE_RESET } from "../constants/attendanceConstants";
import MyDataGrid from "../components/MyDataGrid";

const columns = [
  { field: "month", headerName: "Attendance Month", width: 150 },
  {
    field: "employee",
    headerName: "Employee",
    flex: 1,
    editable: true,
  },

  {
    field: "paid",
    headerName: "Paid",
    type: "number",
    flex: 1,
    editable: true,
  },

  {
    field: "balance",
    headerName: "Balance",
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
const AttendanceScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, attendances } = useSelector(
    (state) => state.attendances
  );
  const {
    loading: loadingAttendanceDelete,
    error: errorAttendanceDelete,
    success: successAttendanceDelete,
  } = useSelector((state) => state.attendanceDelete);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchAttendances());
  }, [dispatch, successAttendanceDelete]);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchAttendance(id));
    } else {
      dispatch({ type: FETCH_ATTENDANCE_RESET });
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
    let rows = attendances?.map((c) => {
      return {
        ...c,

        id: c._id,
        handleClickOpen,
        employee: c?.eid?.name,
        month: dateFormaterMMYY(c.month),
        paymentDate: dateFormater(c.paymentDate),
        balance: c?.eid?.salary - c?.paidAmount,
        paid: c?.paidAmount,
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
    dispatch(deleteAttendance(id));
  };
  return (
    <MainLayout>
      <div className="table__unresponsive">
        <div className="page__title">
          <Typography className={classes.root} variant="h5">
            Attendances
          </Typography>
        </div>
        <div className="add__btn__container">
          <Button
            onClick={() => {
              //navigate("/attendances");
              dispatch({ type: FETCH_ATTENDANCE_RESET });
              handleClickOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </div>
        {(loading || loadingAttendanceDelete) && <CircularProgress />}
        {error && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {error}
          </Alert>
        )}
        {errorAttendanceDelete && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {errorAttendanceDelete}
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
                Attendances
              </Typography>
              <Typography className={classes.root} variant="div">
                <Button
                  onClick={() => {
                    //navigate("/attendances");
                    dispatch({ type: FETCH_ATTENDANCE_RESET });
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
            {(loading || loadingAttendanceDelete) && <CircularProgress />}
            {error && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
            {errorAttendanceDelete && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {errorAttendanceDelete}
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
                {attendances?.map((attendance) => (
                  <TableRow key={attendance?._id}>
                    <TableCell align="left">
                      {attendance?.attendanceName}
                    </TableCell>
                    <TableCell>{attendance?.harvestUnit}</TableCell>
                    <TableCell>{attendance?.plantings}</TableCell>
                    <TableCell>{attendance?.varieties}</TableCell>

                    <TableCell size="small" align="right">
                      <Button
                        onClick={() => {
                          //navigate(`/attendances/${attendance._id}`);
                          setId(attendance?._id);
                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          dispatch(deleteAttendance(attendance._id));
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
      <AddAttendanceDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        id={id}
      ></AddAttendanceDialog>
    </MainLayout>
  );
};

export default AttendanceScreen;
