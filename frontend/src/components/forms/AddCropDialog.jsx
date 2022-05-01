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
import { fetchCrops, fetchCrop, updateCrop } from "../../actions/cropActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_CROP_RESET,
  FETCH_CROP_RESET,
  UPDATE_CROP_RESET,
} from "../../constants/cropConstants";
import { useParams } from "react-router-dom";
import { addCrop } from "../../actions/cropActions";

export default function AddCropDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector((state) => state.cropCreate);
  const {
    error: errorCrop,
    loading: loadingCrop,
    crop,
  } = useSelector((state) => state.crop);
  const {
    error: errorCropUpdate,
    loading: loadingCropUpdate,
    success: successUpdate,
    crop: cropUpdate,
  } = useSelector((state) => state.cropUpdate);
  const [cropName, setCropName] = React.useState("");
  const [harvestUnit, setHarvestUnit] = React.useState("");
  const [shortNotes, setShortNotes] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchCrops());
      dispatch({ type: ADD_CROP_RESET });
      dispatch({ type: UPDATE_CROP_RESET });
      handleClose();
    }
    if (crop) {
      setIsUpdate(true);
      setCropName(crop?.cropName);
      setHarvestUnit(crop?.harvestUnit);
      setShortNotes(crop?.shortNotes);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, crop, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const crop = {};
    crop.cropName = cropName;
    crop.harvestUnit = harvestUnit;
    crop.shortNotes = shortNotes;
    if (!isUpdate) {
      dispatch(addCrop(crop));
    } else {
      crop._id = id;
      dispatch(updateCrop(crop));
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
        <DialogTitle id="alert-dialog-title">{"Add New Crop"}</DialogTitle>
        <DialogContent>
          {(loading || loadingCropUpdate) && (
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
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    label="Name of crop"
                    name="crop"
                    margin="normal"
                    required
                    fullWidth
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                  />

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="harvest-unit">Harvest Unit</InputLabel>
                    <Select
                      labelId="harvest-unit"
                      id="harvetUnit"
                      value={harvestUnit}
                      name="harvestUnit"
                      onChange={(e) => setHarvestUnit(e.target.value)}
                      label="-Select harvest unit-"
                    >
                      <MenuItem value="Quantity">Quantity</MenuItem>
                      <MenuItem value="Bales">Bales</MenuItem>
                      <MenuItem value="Bunches">Bunches</MenuItem>
                      <MenuItem value="Bushels">Bushels</MenuItem>
                      <MenuItem value="Dozen">Dozen</MenuItem>
                      <MenuItem value="Gallons">Galons</MenuItem>
                      <MenuItem value="Grams">Grams</MenuItem>
                      <MenuItem value="Kilograms">Kilograms</MenuItem>
                      <MenuItem value="Litres">Litres</MenuItem>
                      <MenuItem value="Ounces">Ounces</MenuItem>
                      <MenuItem value="Pints">Pints</MenuItem>
                      <MenuItem value="Pounds">Pounds</MenuItem>
                      <MenuItem value="Quartz">Quartz</MenuItem>
                      <MenuItem value="Tonnes">Tonnes</MenuItem>
                      <MenuItem value="Boxes">Boxes</MenuItem>
                      <MenuItem value="Sacks">Sacks</MenuItem>
                      <MenuItem value="Baskets">Baskets</MenuItem>
                      <MenuItem value="Barrels">Barrels</MenuItem>
                    </Select>
                  </FormControl>

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
