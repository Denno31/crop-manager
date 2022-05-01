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
import { deleteField, fetchFields } from "../actions/fieldActions";
import AddFieldDialog from "../components/forms/AddFieldDialog";
import { FETCH_FIELD_RESET } from "../constants/fieldConstants";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const FieldScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, fields } = useSelector((state) => state.fields);
  const {
    loading: loadingFieldDelete,
    error: errorFieldDelete,
    success: successFieldDelete,
  } = useSelector((state) => state.fieldDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchFields());
  }, [dispatch, successFieldDelete]);

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
              Fields
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/fields");
                  dispatch({ type: FETCH_FIELD_RESET });
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
          {(loading || loadingFieldDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorFieldDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorFieldDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Light Profile</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Size</TableCell>
                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((field) => (
                <TableRow key={field?._id}>
                  <TableCell>{field?.name}</TableCell>
                  <TableCell>{field?.fieldType}</TableCell>
                  <TableCell>{field?.lightProfile}</TableCell>
                  <TableCell>{field?.fieldStatus}</TableCell>
                  <TableCell>{field?.fieldSize}</TableCell>
                  <TableCell align="right" size="small">
                    <Button
                      onClick={() => {
                        navigate(`/fields/${field._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(field._id);
                        dispatch(deleteField(field._id));
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
        <AddFieldDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddFieldDialog>
      </Typography>
    </MainLayout>
  );
};

export default FieldScreen;
