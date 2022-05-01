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
import FormControl from "@mui/material/FormControl";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  fetchPlantings,
  fetchPlanting,
  updatePlanting,
} from "../../actions/plantingActions";

import { CardContent, TextField } from "@mui/material";
import { addField, fetchFields } from "../../actions/fieldActions";
import { fetchCrops } from "../../actions/cropActions";
import {
  ADD_PLANTING_RESET,
  FETCH_PLANTING_RESET,
  UPDATE_PLANTING_RESET,
} from "../../constants/plantingConstants";
import { useParams } from "react-router-dom";
import { addPlanting } from "../../actions/plantingActions";
import { dateFormater } from "../../utils";

export default function AddPlantingDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.plantingCreate
  );
  const {
    error: errorPlanting,
    loading: loadingPlanting,
    planting,
  } = useSelector((state) => state.planting);
  const {
    error: errorPlantingUpdate,
    loading: loadingPlantingUpdate,
    success: successUpdate,
    planting: plantingUpdate,
  } = useSelector((state) => state.plantingUpdate);
  const {
    error: errorCrops,
    loading: loadingCrops,
    crops,
  } = useSelector((state) => state.crops);
  const {
    error: errorFields,
    loading: loadingFields,
    fields,
  } = useSelector((state) => state.fields);
  const [plantingDate, setPlantingDate] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [field, setField] = React.useState("");
  const [crop, setCrop] = React.useState("");
  const [harvestDate, setHarvestDate] = React.useState(null);
  const [qtyPlanted, setQtyPlanted] = React.useState(null);
  const [estimatedYield, setEstimatedYield] = React.useState(null);
  const [seedCompany, setSeedCompany] = React.useState("");
  const [seedLotNumber, setSeedLotNumber] = React.useState(null);
  const [seedType, setSeedType] = React.useState("");
  const [seedOrigin, setSeedOrigin] = React.useState("");
  const [distanceBetweenPlants, setDistanceBetweenPlants] =
    React.useState(null);
  const [harvestUnit, setHarvestUnit] = React.useState("");
  const [shortNotes, setShortNotes] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchPlantings());
      dispatch({ type: ADD_PLANTING_RESET });
      dispatch({ type: UPDATE_PLANTING_RESET });
      handleClose();
    }
    if (planting) {
      setIsUpdate(true);
      setPlantingDate(dateFormater(planting?.plantingDate));
      setStatus(planting?.status);
      setField(planting?.field);
      setCrop(planting?.crop);
      setHarvestDate(dateFormater(planting?.fHarvestDate));
      setQtyPlanted(planting?.qtyPlanted);
      setEstimatedYield(planting?.estimatedYield);
      setDistanceBetweenPlants(planting?.distanceBetweenPlants);
      setSeedCompany(planting?.seedCompany);
      setSeedType(planting?.seedType);
      setSeedOrigin(planting?.seedOrigin);
      setSeedLotNumber(planting?.seedLotNumber);
      setShortNotes(planting?.shortNotes);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, planting, successUpdate]);
  React.useEffect(() => {
    dispatch(fetchFields());
    dispatch(fetchCrops());
  }, [dispatch]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchPlanting(id));
    } else {
      dispatch({ type: FETCH_PLANTING_RESET });
    }
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const plantingData = {};
    plantingData.plantingDate = plantingDate;
    plantingData.status = status;
    plantingData.shortNotes = shortNotes;
    plantingData.crop = crop;
    plantingData.field = field;
    plantingData.fHarvestDate = harvestDate;
    plantingData.qtyPlanted = qtyPlanted;
    plantingData.estimatedYield = estimatedYield;
    plantingData.distanceBetweenPlants = distanceBetweenPlants;
    plantingData.seedCompany = seedCompany;
    plantingData.seedLotNumber = seedLotNumber;
    plantingData.seedOrigin = seedOrigin;
    plantingData.seedType = seedType;
    console.log(plantingData);
    if (!isUpdate) {
      dispatch(addPlanting(plantingData));
    } else {
      plantingData._id = id;
      dispatch(updatePlanting(plantingData));
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
          {!isUpdate ? "Add New Planting" : "Update Planting"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingPlantingUpdate) && (
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
          {errorPlantingUpdate && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorPlantingUpdate}
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
                        label="Planting Date"
                        inputFormat="MM/dd/yyyy"
                        value={plantingDate}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setPlantingDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      value={status}
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      label="-Select Status-"
                    >
                      <MenuItem value="planted">Planted</MenuItem>
                      <MenuItem value="harvested">Harvested</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="field">Field</InputLabel>
                    <Select
                      labelId="Field"
                      id="field"
                      value={field}
                      name="status"
                      onChange={(e) => setField(e.target.value)}
                      label="-Select Field-"
                    >
                      {fields?.map((f) => (
                        <MenuItem value={f?._id}>{f?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="crop">Crop</InputLabel>
                    <Select
                      labelId="crop"
                      id="crop"
                      value={crop}
                      name="crop"
                      onChange={(e) => setCrop(e.target.value)}
                      label="-Select Status-"
                    >
                      {crops?.map((c) => (
                        <MenuItem value={c?._id}>{c?.cropName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="First Harvest Date"
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

                  <TextField
                    label="Quantity planted"
                    name="qtyPlanted"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={qtyPlanted}
                    onChange={(e) => setQtyPlanted(e.target.value)}
                  />
                  <TextField
                    label="Estimated Yield"
                    name="estimatedYield"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={estimatedYield}
                    onChange={(e) => setEstimatedYield(e.target.value)}
                  />
                  <TextField
                    label="Distance between plants"
                    name="amount"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={distanceBetweenPlants}
                    onChange={(e) => setDistanceBetweenPlants(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    maxRows={4}
                    label="Seed Company"
                    value={seedCompany}
                    onChange={(e) => setSeedCompany(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    maxRows={4}
                    label="Seed Type"
                    value={seedType}
                    onChange={(e) => setSeedType(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    multiline
                    fullWidth
                    maxRows={4}
                    label="Seed origin"
                    value={seedOrigin}
                    onChange={(e) => setSeedOrigin(e.target.value)}
                  />
                  <TextField
                    label="Seed Lot Number"
                    name="seedLotNumber"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={seedLotNumber}
                    onChange={(e) => setSeedLotNumber(e.target.value)}
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
