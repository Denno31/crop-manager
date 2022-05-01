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
import { deleteCrop, fetchCrops } from "../actions/cropActions";
import AddCropDialog from "../components/forms/AddCropDialog";
import { FETCH_CROP_RESET } from "../constants/cropConstants";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const CropScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, crops } = useSelector((state) => state.crops);
  const {
    loading: loadingCropDelete,
    error: errorCropDelete,
    success: successCropDelete,
  } = useSelector((state) => state.cropDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchCrops());
  }, [dispatch, successCropDelete]);

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
              Crops
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/crops");
                  dispatch({ type: FETCH_CROP_RESET });
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
          {(loading || loadingCropDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorCropDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorCropDelete}
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
              {crops?.map((crop) => (
                <TableRow key={crop?._id}>
                  <TableCell align="left">{crop?.cropName}</TableCell>
                  <TableCell>{crop?.harvestUnit}</TableCell>
                  <TableCell>{crop?.plantings}</TableCell>
                  <TableCell>{crop?.varieties}</TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/crops/${crop._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(crop._id);
                        dispatch(deleteCrop(crop._id));
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
        <AddCropDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddCropDialog>
      </Typography>
    </MainLayout>
  );
};

export default CropScreen;
