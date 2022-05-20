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
import {
  fetchAttendances,
  fetchAttendance,
  updateAttendance,
} from "../../actions/attendanceActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_ATTENDANCE_RESET,
  FETCH_ATTENDANCE_RESET,
  UPDATE_ATTENDANCE_RESET,
} from "../../constants/attendanceConstants";

import { addAttendance } from "../../actions/attendanceActions";
import { fetchEmployees } from "../../actions/employeeActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function AddAttendanceDialog({ handleClose, open, id }) {
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector(
    (state) => state.attendanceCreate
  );
  const {
    error: errorAttendance,
    loading: loadingAttendance,
    attendance,
  } = useSelector((state) => state.attendance);
  const {
    error: errorAttendanceUpdate,
    loading: loadingAttendanceUpdate,
    success: successUpdate,
    attendance: attendanceUpdate,
  } = useSelector((state) => state.attendanceUpdate);

  const [attendanceNumber, setAttendanceNumber] = React.useState("");

  const [salary, setSalary] = React.useState("");

  const [employee, setEmployee] = React.useState("");
  const [month, setMonth] = React.useState(null);

  const [paymentDate, setPayDate] = React.useState(null);
  const [isUpdate, setIsUpdate] = React.useState("");
  const {
    loading: loadingEmployee,
    error: errorEmployee,
    employees,
  } = useSelector((state) => state.employees);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchAttendances());
      dispatch({ type: ADD_ATTENDANCE_RESET });
      dispatch({ type: UPDATE_ATTENDANCE_RESET });
      handleClose();
    }
    if (attendance) {
      setIsUpdate(true);

      setEmployee(attendance?.eid?._id);

      setMonth(attendance?.month);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, attendance, successUpdate]);
  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const attendanceData = {};

    attendanceData.eid = employee;
    attendanceData.month = month;

    if (!isUpdate) {
      dispatch(addAttendance(attendanceData));
    } else {
      console.log(attendanceData);
      attendanceData._id = id;
      dispatch(updateAttendance(attendanceData));
    }
  };
  const populateSalary = () => {
    console.log("Employees: ", employees);
    let emp = employees.find((e) => e._id === employee);
    setSalary(emp?.salary);
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
          {!id ? "Add New Attendance" : "Update Attendance"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingAttendanceUpdate) && (
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
                    <InputLabel id="employee">employee</InputLabel>
                    <Select
                      labelId="employee"
                      id="lightProfile"
                      value={employee}
                      name="employee"
                      onChange={(e) => {
                        setEmployee(e.target.value);
                        populateSalary();
                      }}
                      label="-Select Employee-"
                    >
                      {employees?.map((emp) => (
                        <MenuItem value={emp._id}>{emp.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        views={["year", "month"]}
                        label="Month"
                        inputFormat="MM/yyyy"
                        value={month}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setMonth(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
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
