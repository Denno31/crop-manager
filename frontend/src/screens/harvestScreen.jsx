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
import { deleteHarvest, fetchHarvests } from "../actions/harvestActions";
import AddHarvestDialog from "../components/forms/AddHarvestDialog";
import { FETCH_HARVEST_RESET } from "../constants/harvestConstants";
import { dateFormater } from "../utils";

const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const HarvestScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, harvests } = useSelector((state) => state.harvests);
  const {
    loading: loadingHarvestDelete,
    error: errorHarvestDelete,
    success: successHarvestDelete,
  } = useSelector((state) => state.harvestDelete);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchHarvests());
  }, [dispatch, successHarvestDelete]);

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
              Harvests
            </Typography>
            <Typography className={classes.root} variant="div">
              <Button
                onClick={() => {
                  navigate("/harvest");
                  dispatch({ type: FETCH_HARVEST_RESET });
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
          {(loading || loadingHarvestDelete) && <CircularProgress />}
          {error && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {error}
            </Alert>
          )}
          {errorHarvestDelete && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorHarvestDelete}
            </Alert>
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>

                <TableCell>Crop</TableCell>
                <TableCell>Field</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Income</TableCell>
                <TableCell>Final?</TableCell>

                <TableCell size="small" colSpan={2} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {harvests?.map((harvest) => (
                <TableRow key={harvest?._id}>
                  <TableCell align="left">
                    {dateFormater(harvest?.harvestDate)}
                  </TableCell>
                  <TableCell>
                    {harvest?.plantingToHarvest?.crop?.cropName}
                  </TableCell>
                  <TableCell>
                    {harvest?.plantingToHarvest?.field?.name}
                  </TableCell>
                  <TableCell>{harvest?.qtyHarvested}</TableCell>
                  <TableCell>{harvest?.income}</TableCell>
                  <TableCell>
                    {harvest?.isFinalHarvest ? "YES" : "NO"}
                  </TableCell>

                  <TableCell size="small" align="right">
                    <Button
                      onClick={() => {
                        navigate(`/harvest/${harvest._id}`);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell size="small" align="left">
                    <Button
                      onClick={() => {
                        console.log(harvest._id);
                        dispatch(deleteHarvest(harvest._id));
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
        <AddHarvestDialog
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        ></AddHarvestDialog>
      </Typography>
    </MainLayout>
  );
};

export default HarvestScreen;
