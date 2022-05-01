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
  fetchTreatments,
  fetchTreatment,
  updateTreatment,
} from "../../actions/treatmentActions";

import { CardContent, TextField } from "@mui/material";
import { addField, fetchFields } from "../../actions/fieldActions";
import { fetchCrops } from "../../actions/cropActions";
import {
  ADD_TREATMENT_RESET,
  FETCH_TREATMENT_RESET,
  UPDATE_TREATMENT_RESET,
} from "../../constants/treatmentConstants";
import { useParams } from "react-router-dom";
import { addTreatment } from "../../actions/treatmentActions";
import { dateFormater } from "../../utils";
import { fetchPlantings } from "../../actions/plantingActions";

export default function AddTreatmentDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector(
    (state) => state.treatmentCreate
  );
  const {
    error: errorTreatment,
    loading: loadingTreatment,
    treatment,
  } = useSelector((state) => state.treatment);
  const {
    error: errorTreatmentUpdate,
    loading: loadingTreatmentUpdate,
    success: successUpdate,
    treatment: treatmentUpdate,
  } = useSelector((state) => state.treatmentUpdate);
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
  const [treatmentDate, setTreatmentDate] = React.useState(null);

  const [type, setType] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [field, setField] = React.useState("");
  const [qtyTreatmented, setQtyTreatmented] = React.useState("");
  const [productUsed, setProductUsed] = React.useState("");
  const [productQty, setProductQty] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [treatmentQuality, setTreatmentQuality] = React.useState("");
  const [isFinal, setIsFinal] = React.useState(false);
  const [qtyRejected, setQtyRejected] = React.useState("");
  const [unitCost, setUnitCost] = React.useState(undefined);
  const [incomeFromTreatment, setIncomeFromTreatment] =
    React.useState(undefined);

  React.useState(undefined);

  const [shortNotes, setShortNotes] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchTreatments());
      dispatch({ type: ADD_TREATMENT_RESET });
      dispatch({ type: UPDATE_TREATMENT_RESET });
      handleClose();
    }
    if (treatment) {
      setIsUpdate(true);
      setTreatmentDate(dateFormater(treatment?.treatmentDate));
      setStatus(treatment?.status);
      setType(treatment?.treatmentType);
      setField(treatment?.field);
      setProductUsed(treatment?.productUsed);
      setProductQty(treatment?.quantityOfProduct);

      setShortNotes(treatment?.shortNotes);
    } else {
      dispatch({ type: ADD_TREATMENT_RESET });
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, treatment, successUpdate]);
  React.useEffect(() => {
    dispatch(fetchPlantings());
    dispatch(fetchFields());
  }, [dispatch]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchTreatment(id));
    } else {
      dispatch({ type: FETCH_TREATMENT_RESET });
    }
  }, [dispatch, id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const treatmentData = {};
    treatmentData.treatmentDate = treatmentDate;
    treatmentData.status = status;
    treatmentData.shortNotes = shortNotes;
    treatmentData.treatmentType = type;
    treatmentData.field = field;
    treatmentData.productUsed = productUsed;
    treatmentData.planting = null;
    treatmentData.quantityOfProduct = productQty;

    console.log(treatmentData);
    if (!isUpdate) {
      dispatch(addTreatment(treatmentData));
    } else {
      treatmentData._id = id;
      dispatch(updateTreatment(treatmentData));
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
          {!isUpdate ? "Add New Treatment" : "Update Treatment"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingTreatmentUpdate) && (
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
          {errorTreatmentUpdate && (
            <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
              {errorTreatmentUpdate}
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
                        label="Treatment Date"
                        inputFormat="MM/dd/yyyy"
                        value={treatmentDate}
                        onChange={(newValue) => {
                          console.log(newValue);
                          setTreatmentDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="Status">Status</InputLabel>
                    <Select
                      labelId="Status"
                      id="Status"
                      value={status}
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      label="-Select Status-"
                    >
                      <MenuItem value="Planned">Planned</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="type">Treatment type</InputLabel>
                    <Select
                      labelId="type"
                      id="type"
                      value={type}
                      name="type"
                      onChange={(e) => setType(e.target.value)}
                      label="-Select Status-"
                    >
                      <MenuItem key="Fertilizer" value="Fertilizer">
                        Fertilizer
                      </MenuItem>
                      <MenuItem key="Fungicide" value="Fungicide">
                        Fungicide
                      </MenuItem>
                      <MenuItem key="Herbicide" value="Herbicide">
                        Herbicide
                      </MenuItem>
                      <MenuItem key="Insecticide" value="Insecticide">
                        Insecticide
                      </MenuItem>
                      <MenuItem key="Nutrients" value="Nutrients">
                        Nutrients
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="field">Field</InputLabel>
                    <Select
                      labelId="field"
                      id="field"
                      value={field}
                      name="field"
                      onChange={(e) => setField(e.target.value)}
                      label="-Select Field-"
                    >
                      {fields?.map((f) => (
                        <MenuItem key={f._id} value={f._id}>
                          {f.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Product used/to be used"
                    name="productUsed"
                    margin="normal"
                    required
                    fullWidth
                    value={productUsed}
                    onChange={(e) => setProductUsed(e.target.value)}
                  />

                  <TextField
                    label="Quantity of product used/to be used"
                    name="productQty"
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    value={productQty}
                    onChange={(e) => setProductQty(e.target.value)}
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
