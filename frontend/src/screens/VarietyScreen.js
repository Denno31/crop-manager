import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { deleteVariety, fetchVarieties } from "../actions/varietyActions";
import AddVarietyDialog from "../components/forms/AddVarietyDialog";
import { FETCH_VARIETY_RESET } from "../constants/varietyConstants";
import { fetchCrop } from "../actions/cropActions";
import { FETCH_CROP_RESET } from "../constants/cropConstants";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const VarietyScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, varieties } = useSelector((state) => state.varieties);
  const {
    loading: loadingVarietyDelete,
    error: errorVarietyDelete,
    success: successVarietyDelete,
  } = useSelector((state) => state.varietyDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchVarieties());
  }, [dispatch, successVarietyDelete]);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchCrop(id));
    } else {
      dispatch({ type: FETCH_CROP_RESET });
    }
  }, [dispatch, id]);

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
              Varieties
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/variety");
                  dispatch({ type: FETCH_VARIETY_RESET });
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
          {(loading || loadingVarietyDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorVarietyDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorVarietyDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>

                <TableCell>Crop</TableCell>

                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {varieties?.map((variety) => (
                <TableRow key={variety?._id}>
                  <TableCell align="left">{variety?.name}</TableCell>
                  <TableCell>{variety?.crop?.cropName}</TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/variety/${variety._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(variety._id);
                        dispatch(deleteVariety(variety._id));
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
        <AddVarietyDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddVarietyDialog>
      </Typography>
    </MainLayout>
  );
};

export default VarietyScreen;
