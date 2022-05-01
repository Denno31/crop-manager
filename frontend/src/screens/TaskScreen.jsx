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
import { deleteTask, fetchTasks } from "../actions/taskActions";
import AddTaskDialog from "../components/forms/AddTaskDialog";
import { FETCH_TASK_RESET } from "../constants/taskConstants";
import { dateFormater } from "../utils";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const TaskScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.tasks);
  const {
    loading: loadingTaskDelete,
    error: errorTaskDelete,
    success: successTaskDelete,
  } = useSelector((state) => state.taskDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, successTaskDelete]);

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
              Tasks
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/task");
                  dispatch({ type: FETCH_TASK_RESET });
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
          {(loading || loadingTaskDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorTaskDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorTaskDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>

                {/* <TableCell>Crop</TableCell> */}
                <TableCell>Field</TableCell>
                <TableCell>Name</TableCell>

                <TableCell>Status</TableCell>

                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks?.map((task) => (
                <TableRow key={task?._id}>
                  <TableCell align="left">
                    {dateFormater(task?.taskDate)}
                  </TableCell>
                  {/* <TableCell>
                    {task?.plantingToTask?.crop?.cropName}
                  </TableCell> */}
                  <TableCell>{task?.field?.name}</TableCell>
                  <TableCell>{task?.taskName}</TableCell>

                  <TableCell>{task?.status}</TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/task/${task._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(task._id);
                        dispatch(deleteTask(task._id));
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
        <AddTaskDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddTaskDialog>
      </Typography>
    </MainLayout>
  );
};

export default TaskScreen;
