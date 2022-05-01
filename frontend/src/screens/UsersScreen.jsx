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
import { fetchUsers, deleteUser } from "../actions/userActions";
// import AddUserDialog from "../components/forms/AddUserDialog";
import { FETCH_USER_RESET } from "../constants/userConstants";
import { dateFormater } from "../utils";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const UsersScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.users);
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success: successUserDelete,
  } = useSelector((state) => state.userDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, successUserDelete]);

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
              Users
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  console.log("clicked");
                  navigate("/users/create");
                }}
                startIcon={<AddIcon />}
                color="secondary"
                variant="contained"
              >
                Add
              </Button>
            </Typography>
          </Typography>
          {(loading || loadingUserDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorUserDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorUserDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>

                <TableCell>Email </TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell align="left">{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    {user?.isAdmin ? "Admin" : "Data Entry"}
                  </TableCell>
                  <TableCell>{dateFormater(user?.createdAt)}</TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/users/${user._id}/edit`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        dispatch(deleteUser(user._id));
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
        {/* <AddUserDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddUserDialog> */}
      </Typography>
    </MainLayout>
  );
};

export default UsersScreen;
