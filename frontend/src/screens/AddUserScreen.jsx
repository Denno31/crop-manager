import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { TextField, Typography } from "@mui/material";
import {
  fetchUsers,
  deleteUser,
  addUser,
  fetchUser,
  updateUser,
} from "../actions/userActions";
// import AddUserDialog from "../components/forms/AddUserDialog";
import { FETCH_USER_RESET } from "../constants/userConstants";
import { dateFormater } from "../utils";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
    margin: "20px 20px",
  },
});
const AddUserScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.users);
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success: successUserDelete,
  } = useSelector((state) => state.userDelete);
  const {
    loading: loadingAddUser,
    error: errorAddUser,
    success: successAddUser,
  } = useSelector((state) => state.userCreate);
  const {
    loading: loadUser,
    error: errorUser,
    user,
  } = useSelector((state) => state.user);
  const {
    loading: loadingUpdateUser,
    error: errorUpdateUser,
    success: successUpdateUser,
  } = useSelector((state) => state.userUpdate);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  React.useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    if (user) {
      setUsername(user?.name);
      setRole(user?.isAdmin);
      setEmail(user?.email);
    }
  }, [user]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match");
    let userData = {
      email,
      name: username,
      password,
      isAdmin: role,
    };
    if (id) {
      userData._id = user._id;
      return dispatch(updateUser(userData));
    }
    dispatch(addUser(user));
  };
  return (
    <MainLayout>
      <Typography variant="div">
        <TableContainer component={Paper}>
          <Typography variant="div"></Typography>

          <div
            style={{
              display: "block",
              textAlign: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <Typography className={classes.root} variant="h5">
              {!id ? "New User" : "Update User"}
            </Typography>
            <div className="create-user-form">
              {(loading || loadingAddUser) && <CircularProgress />}
              {error && (
                <Alert
                  style={{ width: "80%", margin: "0 auto" }}
                  severity="error"
                >
                  {error}
                </Alert>
              )}
              {errorAddUser && (
                <Alert
                  style={{ width: "80%", margin: "0 auto" }}
                  severity="error"
                >
                  {errorAddUser}
                </Alert>
              )}
              {successAddUser && (
                <Alert
                  style={{ width: "80%", margin: "0 auto" }}
                  severity="success"
                >
                  User added successfully
                </Alert>
              )}
              {successUpdateUser && (
                <Alert
                  style={{ width: "80%", margin: "0 auto" }}
                  severity="success"
                >
                  User update successfully
                </Alert>
              )}
              {errorUpdateUser && (
                <Alert
                  style={{ width: "80%", margin: "0 auto" }}
                  severity="success"
                >
                  {errorUpdateUser}
                </Alert>
              )}
              <div className="close-btn">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => navigate("/users")}
                >
                  <CloseRoundedIcon />
                </IconButton>
                {/* <CloseRoundedIcon /> */}
              </div>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <div>
                  <AccountCircleTwoToneIcon
                    className="user-icon"
                    fontSize="large"
                  />
                </div>
                <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                  <InputLabel id="user-role">User role</InputLabel>
                  <Select
                    required
                    labelId="user-role"
                    id="user-role"
                    name="user-role"
                    label="user-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value={true}>Admin</MenuItem>
                    <MenuItem value={false}>DataEntry</MenuItem>
                  </Select>
                  <TextField
                    className="user-input-style"
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    maxRows={4}
                    label="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    className="user-input-style"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    className="user-input-style"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    className="user-input-style"
                    name="password"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    // id="password"
                    autoComplete="current-password"
                  />
                  <div className="save-button">
                    <div className=""></div>

                    <div className="">
                      {!id ? (
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
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                </FormControl>
              </Box>
            </div>
          </div>
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

export default AddUserScreen;
