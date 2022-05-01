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
import { deletePlanting, fetchPlantings } from "../actions/plantingActions";
import AddPlantingDialog from "../components/forms/AddPlantingDialog";
import { FETCH_PLANTING_RESET } from "../constants/plantingConstants";
import { dateFormater } from "../utils";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const PlantingScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, plantings } = useSelector((state) => state.plantings);
  const {
    loading: loadingPlantingDelete,
    error: errorPlantingDelete,
    success: successPlantingDelete,
  } = useSelector((state) => state.plantingDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchPlantings());
  }, [dispatch, successPlantingDelete]);

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
              Plantings
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/planting");
                  dispatch({ type: FETCH_PLANTING_RESET });
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
          {(loading || loadingPlantingDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorPlantingDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorPlantingDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>

                <TableCell>Crop</TableCell>
                <TableCell>Field</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Harvest Date</TableCell>
                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plantings?.map((planting) => (
                <TableRow key={planting?._id}>
                  <TableCell align="left">
                    {dateFormater(planting?.plantingDate)}
                  </TableCell>
                  <TableCell>{planting?.crop?.cropName}</TableCell>
                  <TableCell>{planting?.field?.name}</TableCell>
                  <TableCell>{planting?.qtyPlanted}</TableCell>
                  <TableCell>{planting?.distanceBetweenPlants}</TableCell>
                  <TableCell>{planting?.status}</TableCell>
                  <TableCell>{dateFormater(planting?.fHarvestDate)}</TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/planting/${planting._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(planting._id);
                        dispatch(deletePlanting(planting._id));
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
        <AddPlantingDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddPlantingDialog>
      </Typography>
    </MainLayout>
  );
};

export default PlantingScreen;
