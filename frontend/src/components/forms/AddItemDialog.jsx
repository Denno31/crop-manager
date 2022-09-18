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
import { fetchItems, fetchItem, updateItem } from "../../actions/itemActions";

import { CardContent, TextField } from "@mui/material";
import { addField } from "../../actions/fieldActions";
import {
  ADD_ITEM_RESET,
  FETCH_ITEM_RESET,
  UPDATE_ITEM_RESET,
} from "../../constants/itemConstants";
import { useParams } from "react-router-dom";
import { addItem } from "../../actions/itemActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function AddItemDialog({ handleClose, open, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { error, loading, success } = useSelector((state) => state.itemCreate);
  const {
    error: errorItem,
    loading: loadingItem,
    item,
  } = useSelector((state) => state.item);
  const {
    error: errorItemUpdate,
    loading: loadingItemUpdate,
    success: successUpdate,
    item: itemUpdate,
  } = useSelector((state) => state.itemUpdate);
  const [itemDesc, setItemDesc] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [supplier, setSupplier] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  React.useEffect(() => {
    if (success || successUpdate) {
      dispatch(fetchItems());
      dispatch({ type: ADD_ITEM_RESET });
      dispatch({ type: UPDATE_ITEM_RESET });
      handleClose();
    }
    if (item) {
      //console.log(item);
      setIsUpdate(true);
      setItemDesc(item?.itemDesc);
      setUnit(item?.units);
      setComment(item?.comment);
      setCategory(item?.category);
      setSupplier(item?.supplierName);
      setComment(item?.comment);
    } else {
      setIsUpdate(false);
    }
  }, [success, handleClose, dispatch, id, item, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Item = {};
    Item.itemDesc = itemDesc;
    Item.units = unit;
    Item.comment = comment;
    Item.supplier = supplier;
    Item.category = category;
    if (!isUpdate) {
      dispatch(addItem(Item));
    } else {
      Item._id = id;
      dispatch(updateItem(Item));
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
          {!id ? "Add New Item" : "Update Item"}
        </DialogTitle>
        <DialogContent>
          {(loading || loadingItemUpdate) && (
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
                    label="Name of Item"
                    name="Item"
                    margin="normal"
                    required
                    fullWidth
                    value={itemDesc}
                    onChange={(e) => setItemDesc(e.target.value)}
                  />
                  <TextField
                    label="Supplier"
                    name="Item"
                    margin="normal"
                    required
                    fullWidth
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                  />
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                      labelId="category"
                      id="category"
                      value={category}
                      name="category"
                      onChange={(e) => setCategory(e.target.value)}
                      label="-Select category-"
                    >
                      <MenuItem value="Fertilizer">Fertilizer</MenuItem>
                      <MenuItem value="Insecticide">Insecticide</MenuItem>
                      <MenuItem value="Herbicide">Herbicide</MenuItem>
                      <MenuItem value="Fungicide">Fungicide</MenuItem>
                      <MenuItem value="Nutrient">Nutrient</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 2, mb: 1 }} fullWidth>
                    <InputLabel id="item-unit">Item Unit</InputLabel>
                    <Select
                      labelId="item-unit"
                      id="itemUnit"
                      value={unit}
                      name="itemUnit"
                      onChange={(e) => setUnit(e.target.value)}
                      label="-Select unit-"
                    >
                      <MenuItem value="Bottles">Bottles</MenuItem>
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
