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
import {
  fetchVarieties,
  fetchVariety,
  updateVariety,
} from "../../actions/varietyActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_VARIETY_RESET,
  FETCH_VARIETY_RESET,
  UPDATE_VARIETY_RESET,
} from "../../constants/varietyConstants";
import { useParams } from "react-router-dom";
import { addVariety } from "../../actions/varietyActions";
import { fetchCrops } from "../../actions/cropActions";

export default function AddVarietyDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.varietyCreate
  );
  const {
    error: errorVariety,
    loading: loadingVariety,
    variety,
  } = useSelector((state) => state.variety);
  const {
    error: errorVarietyUpdate,
    loading: loadingVarietyUpdate,
    success: successUpdate,
    variety: varietyUpdate,
  } = useSelector((state) => state.varietyUpdate);
  const {
    error: errorCrop,
    loading: loadingCrop,
    crops,
  } = useSelector((state) => state.crops);
  const [varietyName, setVarietyName] = React.useState("");
  const [fieldType, setFieldType] = React.useState("");
  const [shortNotes, setShortNotes] = React.useState("");
  const [lightProfile, setLightProfile] = React.useState("");
  const [daysToMaturity, setDaysToMaturity] = React.useState("");
  const [cropName, setCropName] = React.useState("");
  const [harvestWindow, setHarvestWindow] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchVarieties());
      dispatch({ type: ADD_VARIETY_RESET });
      dispatch({ type: UPDATE_VARIETY_RESET });
      handleClose();
    }
    if (variety) {
      setIsUpdate(true);
      setVarietyName(variety?.name);
      setHarvestWindow(variety?.harvestWindow);
      setLightProfile(variety?.lightProfile);
      setCropName(variety?.crop?._id);
      setFieldType(variety?.fieldType);
      setDaysToMaturity(variety?.daysToMaturity);
      setShortNotes(variety?.shortNotes);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, variety, successUpdate]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchVariety(id));
    } else {
      dispatch({ type: FETCH_VARIETY_RESET });
    }
  }, [dispatch, id]);
  React.useEffect(() => {
    dispatch(fetchCrops());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const varietyData = {};
    varietyData.name = varietyName;
    varietyData.crop = cropName;
    varietyData.fieldType = fieldType;
    varietyData.daysToMaturity = daysToMaturity;
    varietyData.lightProfile = lightProfile;
    varietyData.harvestWindow = harvestWindow;
    varietyData.shortNotes = shortNotes;
    if (!isUpdate) {
      dispatch(addVariety(varietyData));
    } else {
      varietyData._id = id;
      dispatch(updateVariety(varietyData));
    }
  };
  const handleChange = (e) => {
    setFieldType(e.target.value);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Variety"}</DialogTitle>
        <DialogContent>
          {(loading || loadingVarietyUpdate) && (
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
          <DialogContentText id="alert-dialog-description">
            <Card>
              <CardContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    label="Name of variety"
                    name="variety"
                    margin="normal"
                    required
                    fullWidth
                    value={varietyName}
                    onChange={(e) => setVarietyName(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="crop-type-label">Crop</InputLabel>
                    <Select
                      labelId="crop-type-label"
                      required
                      id="cropName"
                      value={cropName}
                      name="cropName"
                      onChange={(e) => setCropName(e.target.value)}
                      label="-Select crop type-"
                    >
                      {crops?.map((c) => (
                        <MenuItem key={c._id} value={c._id}>
                          {c.cropName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="field-type-label">Field Type</InputLabel>
                    <Select
                      labelId="field-type-label"
                      required
                      id="fieldType"
                      value={fieldType}
                      name="fieldType"
                      onChange={handleChange}
                      label="-Select field type-"
                    >
                      <MenuItem selected value="Field/Outdoor">
                        Field/Outdoor
                      </MenuItem>
                      <MenuItem value="Greenhouse">Greenhouse</MenuItem>
                      <MenuItem value="Speedling">Speedling</MenuItem>
                      <MenuItem value="Growtent">Growtent</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="light-profile-label">
                      Light Profile
                    </InputLabel>
                    <Select
                      labelId="light-profile-label"
                      required
                      id="lightProfile"
                      value={lightProfile}
                      name="lightProfile"
                      onChange={(e) => setLightProfile(e.target.value)}
                      label="-Select light Profile-"
                    >
                      <MenuItem value="Full to Sun">Full to Sun</MenuItem>
                      <MenuItem value="Full To Partial Sun">
                        Full To Partial Sun
                      </MenuItem>
                      <MenuItem value="Partial Shade">Partial Shade</MenuItem>
                      <MenuItem value="Full Shade">Full Shade</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    label="Days to maturity"
                    value={daysToMaturity}
                    onChange={(e) => setDaysToMaturity(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    label="Harvest Window"
                    value={harvestWindow}
                    onChange={(e) => setHarvestWindow(e.target.value)}
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
