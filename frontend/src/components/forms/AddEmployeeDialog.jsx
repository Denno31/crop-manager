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
  fetchEmployees,
  fetchEmployee,
  updateEmployee,
} from "../../actions/employeeActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_EMPLOYEE_RESET,
  FETCH_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_RESET,
} from "../../constants/employeeConstants";
import { useParams } from "react-router-dom";
import { addEmployee } from "../../actions/employeeActions";

export default function AddEmployeeDialog({ handleClose, open, id }) {
  const dispatch = useDispatch();
  console.log(id);
  const { error, loading, success } = useSelector(
    (state) => state.employeeCreate
  );
  const {
    error: errorEmployee,
    loading: loadingEmployee,
    employee,
  } = useSelector((state) => state.employee);
  const {
    error: errorEmployeeUpdate,
    loading: loadingEmployeeUpdate,
    success: successUpdate,
    employee: employeeUpdate,
  } = useSelector((state) => state.employeeUpdate);
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeNumber, setEmployeeNumber] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState(undefined);
  const [designation, setDesignation] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState("");

  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchEmployees());
      dispatch({ type: ADD_EMPLOYEE_RESET });
      dispatch({ type: UPDATE_EMPLOYEE_RESET });
      handleClose();
    }
    if (employee) {
      setIsUpdate(true);
      setEmployeeName(employee?.name);
      setPhoneNo(employee?.phone);
      setEmployeeNumber(employee?.employeeNo);
      setSalary(employee?.salary);
      setDesignation(employee?.designation);
      setAddress(employee?.address);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, employee, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = {};
    employeeData.name = employeeName;
    employeeData.salary = salary;
    employeeData.designation = designation;
    employeeData.phone = phoneNo;
    employeeData.address = address;
    employeeData.employeeNo = employeeNumber;
    if (!isUpdate) {
      dispatch(addEmployee(employeeData));
    } else {
      employeeData._id = id;
      dispatch(updateEmployee(employeeData));
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
          {!id ? "Add New Employee" : "Update Employee"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingEmployeeUpdate) && (
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
                    label="Employee Number"
                    name="employeeNumber"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                  />
                  <TextField
                    label="Name of employee"
                    name="employee"
                    margin="normal"
                    required
                    fullWidth
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                  <TextField
                    label="Designation"
                    name="designation"
                    margin="normal"
                    required
                    fullWidth
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                  <TextField
                    label="Address"
                    name="address"
                    margin="normal"
                    required
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <TextField
                    label="salary"
                    name="salary"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
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
