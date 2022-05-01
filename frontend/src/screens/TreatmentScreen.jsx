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
import { deleteTreatment, fetchTreatments } from "../actions/treatmentActions";
import AddTreatmentDialog from "../components/forms/AddTreatmentDialog";
import { FETCH_TREATMENT_RESET } from "../constants/treatmentConstants";
import { dateFormater } from "../utils";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const TreatmentScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, treatments } = useSelector(
    (state) => state.treatments
  );
  const {
    loading: loadingTreatmentDelete,
    error: errorTreatmentDelete,
    success: successTreatmentDelete,
  } = useSelector((state) => state.treatmentDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchTreatments());
  }, [dispatch, successTreatmentDelete]);

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
              Treatments
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/treatment");
                  dispatch({ type: FETCH_TREATMENT_RESET });
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
          {(loading || loadingTreatmentDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorTreatmentDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorTreatmentDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>

                {/* <TableCell>Crop</TableCell> */}
                <TableCell>Field</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>

                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {treatments?.map((treatment) => (
                <TableRow key={treatment?._id}>
                  <TableCell align="left">
                    {dateFormater(treatment?.treatmentDate)}
                  </TableCell>
                  {/* <TableCell>
                    {treatment?.plantingToTreatment?.crop?.cropName}
                  </TableCell> */}
                  <TableCell>{treatment?.field?.name}</TableCell>
                  <TableCell>{treatment?.productUsed}</TableCell>
                  <TableCell>{treatment?.quantityOfProduct}</TableCell>
                  <TableCell>{treatment?.status}</TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/treatment/${treatment._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(treatment._id);
                        dispatch(deleteTreatment(treatment._id));
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
        <AddTreatmentDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddTreatmentDialog>
      </Typography>
    </MainLayout>
  );
};

export default TreatmentScreen;
