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
import {
  fetchHarvests,
  fetchHarvest,
  updateHarvest,
} from "../../actions/harvestActions";

import { CardContent, TextField } from "@mui/material";
import { addField, fetchFields } from "../../actions/fieldActions";
import { fetchCrops } from "../../actions/cropActions";
import {
  ADD_HARVEST_RESET,
  FETCH_HARVEST_RESET,
  UPDATE_HARVEST_RESET,
} from "../../constants/harvestConstants";
import { useParams } from "react-router-dom";
import { addHarvest } from "../../actions/harvestActions";
import { dateFormater } from "../../utils";
import { fetchPlantings } from "../../actions/plantingActions";

export default function AddHarvestDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.harvestCreate
  );
  const {
    error: errorHarvest,
    loading: loadingHarvest,
    harvest,
  } = useSelector((state) => state.harvest);
  const {
    error: errorHarvestUpdate,
    loading: loadingHarvestUpdate,
    success: successUpdate,
    harvest: harvestUpdate,
  } = useSelector((state) => state.harvestUpdate);
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
  const [harvestDate, setHarvestDate] = React.useState(null);

  const [plantingToHarvest, setPlantingToHarvest] = React.useState("");
  const [qtyHarvested, setQtyHarvested] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [harvestQuality, setHarvestQuality] = React.useState("");
  const [isFinal, setIsFinal] = React.useState(false);
  const [qtyRejected, setQtyRejected] = React.useState("");
  const [unitCost, setUnitCost] = React.useState(undefined);
  const [incomeFromHarvest, setIncomeFromHarvest] = React.useState(undefined);

  React.useState(undefined);

  const [shortNotes, setShortNotes] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchHarvests());
      dispatch({ type: ADD_HARVEST_RESET });
      dispatch({ type: UPDATE_HARVEST_RESET });
      handleClose();
    }
    if (harvest) {
      setIsUpdate(true);
      setHarvestDate(dateFormater(harvest?.harvestDate));
      setQtyHarvested(harvest?.qtyHarvested);
      setPlantingToHarvest(harvest?.plantingToHarvest);
      setBatch(harvest?.batch);
      setHarvestQuality(harvest?.harvestQuality);
      setQtyRejected(harvest?.quantityRejected);
      setIncomeFromHarvest(harvest?.income);
      setIsFinal(harvest?.isFinalHarvest);
      setIncomeFromHarvest(harvest?.income);
      setUnitCost(harvest?.unitCost);
      setHarvestQuality(harvest?.harvestQuality);

      setShortNotes(harvest?.shortNotes);
    } else {
      dispatch({ type: ADD_HARVEST_RESET });
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, harvest, successUpdate]);
  React.useEffect(() => {
    dispatch(fetchPlantings());
  }, [dispatch]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchHarvest(id));
    } else {
      dispatch({ type: FETCH_HARVEST_RESET });
    }
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const harvestData = {};
    harvestData.harvestDate = harvestDate;
    harvestData.plantingToHarvest = plantingToHarvest;
    harvestData.shortNotes = shortNotes;
    harvestData.qtyHarvested = qtyHarvested;
    harvestData.batch = batch;
    harvestData.isFinalHarvest = isFinal;
    harvestData.unitCost = unitCost;
    harvestData.income = incomeFromHarvest;
    harvestData.quantityRejected = qtyRejected;
    harvestData.harvestQuality = harvestQuality;

    console.log(harvestData);
    if (!isUpdate) {
      dispatch(addHarvest(harvestData));
    } else {
      harvestData._id = id;
      dispatch(updateHarvest(harvestData));
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
          {!isUpdate ? "Add New Harvest" : "Update Harvest"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingHarvestUpdate) && (
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
          {errorHarvestUpdate && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorHarvestUpdate}
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
                        label="Harvest Date"
                        inputFormat="MM/dd/yyyy"
                        value={harvestDate}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setHarvestDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="planting">Planting to harvest</InputLabel>
                    <Select
                      labelId="planting"
                      id="planting"
                      value={plantingToHarvest}
                      name="planting"
                      onChange={(e) => setPlantingToHarvest(e.target.value)}
                      label="-Select Status-"
                    >
                      {plantings?.map((planting) => (
                        <MenuItem value={planting._id}>
                          {planting?.crop?.cropName +
                            ", " +
                            planting?.field?.name +
                            ", " +
                            dateFormater(planting?.plantingDate)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Quantity Harvested"
                    name="qtyHarvested"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={qtyHarvested}
                    onChange={(e) => setQtyHarvested(e.target.value)}
                  />
                  <TextField
                    label="Batch number"
                    name="batch"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    maxRows={4}
                    label="Harvest Quality eg(A,B,etc)"
                    value={harvestQuality}
                    onChange={(e) => setHarvestQuality(e.target.value)}
                  />
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Is this the final Harvest for the planting?
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={isFinal}
                      onChange={(e) => setIsFinal(e.target.value)}
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="NO"
                      />
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="YES"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    label="Quantity rejected"
                    name="qtyRejected"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={qtyRejected}
                    onChange={(e) => setQtyRejected(e.target.value)}
                  />
                  <TextField
                    label="Unit cost"
                    name="unitCost"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={unitCost}
                    onChange={(e) => setUnitCost(e.target.value)}
                  />
                  <TextField
                    label="Income from this harvest"
                    name="incomeFromHarvest"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={incomeFromHarvest}
                    onChange={(e) => setIncomeFromHarvest(e.target.value)}
                  />

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
