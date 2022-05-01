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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { fetchTasks, fetchTask, updateTask } from "../../actions/taskActions";

import { CardContent, TextField } from "@mui/material";
import { addField, fetchFields } from "../../actions/fieldActions";
import { fetchCrops } from "../../actions/cropActions";
import {
  ADD_TASK_RESET,
  FETCH_TASK_RESET,
  UPDATE_TASK_RESET,
} from "../../constants/taskConstants";
import { useParams } from "react-router-dom";
import { addTask } from "../../actions/taskActions";
import { dateFormater } from "../../utils";
import { fetchPlantings } from "../../actions/plantingActions";

export default function AddTaskDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector((state) => state.taskCreate);
  const {
    error: errorTask,
    loading: loadingTask,
    task,
  } = useSelector((state) => state.task);
  const {
    error: errorTaskUpdate,
    loading: loadingTaskUpdate,
    success: successUpdate,
    task: taskUpdate,
  } = useSelector((state) => state.taskUpdate);
  const {
    error: errorPlantings,
    loading: loadingPlantings,
    plantings,
  } = useSelector((state) => state.plantings);

  const {
    error: errorFields,
    loading: loadingFields,
    fields,
  } = useSelector((state) => state.fields);
  const [taskDate, setTaskDate] = React.useState(null);

  const [taskName, setTaskName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [field, setField] = React.useState("");

  React.useState(undefined);

  const [shortNotes, setShortNotes] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchTasks());
      dispatch({ type: ADD_TASK_RESET });
      dispatch({ type: UPDATE_TASK_RESET });
      handleClose();
    }
    if (task) {
      setIsUpdate(true);
      setTaskDate(dateFormater(task?.taskDate));
      setTaskName(task?.taskName);
      setStatus(task?.status);
      setField(task?.field);
      setShortNotes(task?.shortNotes);
    } else {
      dispatch({ type: ADD_TASK_RESET });
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, task, successUpdate]);
  React.useEffect(() => {
    dispatch(fetchPlantings());
    dispatch(fetchFields());
  }, [dispatch]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchTask(id));
    } else {
      dispatch({ type: FETCH_TASK_RESET });
    }
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {};
    taskData.taskDate = taskDate;
    taskData.status = status;
    taskData.shortNotes = shortNotes;
    taskData.field = field;
    taskData.planting = null;
    taskData.taskName = taskName;

    if (!isUpdate) {
      dispatch(addTask(taskData));
    } else {
      taskData._id = id;
      dispatch(updateTask(taskData));
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
          {!isUpdate ? "Add New Task" : "Update Task"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingTaskUpdate) && (
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
          {errorTaskUpdate && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorTaskUpdate}
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Task Date"
                        inputFormat="MM/dd/yyyy"
                        value={taskDate}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setTaskDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="Status">Status</InputLabel>
                    <Select
                      labelId="Status"
                      id="Status"
                      value={status}
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      label="-Select Status-"
                    >
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Task"
                    name="task"
                    margin="normal"
                    required
                    fullWidth
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="field">Field</InputLabel>
                    <Select
                      labelId="field"
                      id="field"
                      value={field}
                      name="field"
                      onChange={(e) => setField(e.target.value)}
                      label="-Select Field-"
                    >
                      {fields?.map((f) => (
                        <MenuItem key={f._id} value={f._id}>
                          {f.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    maxRows={4}
                    label="Write short notes"
                    value={shortNotes}
                    onChange={(e) => setShortNotes(e.target.value)}
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
