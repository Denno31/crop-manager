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
  fetchFields,
  fetchField,
  updateField,
} from "../../actions/fieldActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_FIELD_RESET,
  FETCH_FIELD_RESET,
  UPDATE_FIELD_RESET,
} from "../../constants/fieldConstants";
import { useParams } from "react-router-dom";

export default function AddFieldDialog({ handleClose, open }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { error, loading, success } = useSelector((state) => state.fieldCreate);
  const {
    error: errorField,
    loading: loadingField,
    field,
  } = useSelector((state) => state.field);
  const {
    error: errorFieldUpdate,
    loading: loadingFieldUpdate,
    success: successUpdate,
    field: fieldUpdate,
  } = useSelector((state) => state.fieldUpdate);
  const [fieldType, setFieldType] = React.useState("");
  const [lightProfile, setLightProfile] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [shortNotes, setShortNotes] = React.useState("");
  const [fieldSize, setFieldSize] = React.useState(0);
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchFields());
      dispatch({ type: ADD_FIELD_RESET });
      dispatch({ type: UPDATE_FIELD_RESET });
      handleClose();
    }
    if (field) {
      setIsUpdate(true);
      setName(field?.name);
      setStatus(field?.fieldStatus);
      setFieldSize(field?.fieldSize);
      setLightProfile(field?.lightProfile);
      setFieldType(field?.fieldType);
      setShortNotes(field?.shortNotes);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, field, successUpdate]);
  React.useEffect(() => {
    if (id) {
      dispatch(fetchField(id));
    } else {
      dispatch({ type: FETCH_FIELD_RESET });
    }
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const field = {};
    field.name = name;
    field.fieldType = fieldType;
    field.fieldStatus = status;
    field.shortNotes = shortNotes;
    field.lightProfile = lightProfile;
    field.fieldSize = fieldSize === 0 ? null : fieldSize;
    if (!isUpdate) {
      dispatch(addField(field));
    } else {
      field._id = id;
      dispatch(updateField(field));
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
        <DialogTitle id="alert-dialog-title">{"Add New Field"}</DialogTitle>
        <DialogContent>
          {(loading || loadingFieldUpdate) && (
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
                    label="Field Name"
                    name="field"
                    margin="normal"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="field-type-label">Field Type</InputLabel>
                    <Select
                      labelId="field-type-label"
                      id="fieldType"
                      value={fieldType}
                      name="fieldType"
                      onChange={(e) => setFieldType(e.target.value)}
                      label="-Select field type-"
                    >
                      <MenuItem value="Field/Outdoor">Field/Outdoor</MenuItem>
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
                      id="lightProfile"
                      value={lightProfile}
                      name="lightProfile"
                      onChange={(e) => setLightProfile(e.target.value)}
                      label="-Select light Profile-"
                    >
                      <MenuItem value="Full Sun">Full Sun</MenuItem>
                      <MenuItem value="Full To Partial Sun">
                        Full To Partial Sun
                      </MenuItem>
                      <MenuItem value="Partial Shade">Partial Shade</MenuItem>
                      <MenuItem value="Full Shade">Full Shade</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="status-label">Field Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      value={status}
                      name="status"
                      onChange={(e) => setStatus(e.target.value)}
                      label="-Select Status-"
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Partially Cultivated">
                        Partially Cultivated
                      </MenuItem>
                      <MenuItem value="Fully Cultivated<">
                        Fully Cultivated
                      </MenuItem>
                      <MenuItem value="Full Shade">Full Shade</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    label="Field Size"
                    value={fieldSize}
                    onChange={(e) => setFieldSize(e.target.value)}
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
