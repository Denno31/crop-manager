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
import { deleteItem, fetchItem, fetchItems } from "../actions/itemActions";
// import AddItemDialog from "../components/forms/AddItemDialog";
import { FETCH_ITEM_RESET } from "../constants/itemConstants";
import MyDataGrid from "../components/MyDataGrid";
import AddItemDialog from "../components/forms/AddItemDialog";

const columns = [
  { field: "itemDesc", headerName: "Name", width: 150 },
  {
    field: "quantity",
    headerName: "Quantity in Stock",
    flex: 1,
    editable: true,
  },

  {
    field: "units",
    headerName: "Units",
    type: "number",
    flex: 1,
    editable: true,
  },

  {
    field: "brand",
    headerName: "Brand",
    type: "number",
    flex: 1,
    editable: true,
  },
];

const useStyles = makeStyles({
  root: {
    padding: "15px 0",
  },
});
const InventoryScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, items } = useSelector((state) => state.items);
  const {
    loading: loadingItemDelete,
    error: errorItemDelete,
    success: successItemDelete,
  } = useSelector((state) => state.itemDelete);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch, successItemDelete]);

  React.useEffect(() => {
    if (id) {
      dispatch(fetchItem(id));
    } else {
      dispatch({ type: FETCH_ITEM_RESET });
    }
  }, [dispatch, id]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (!open) setId(null);
  }, [open]);
  const handleClose = () => {
    setOpen(false);
  };
  const formatRowsData = () => {
    let rows = items?.map((c) => {
      return {
        ...c,

        id: c._id,
        handleClickOpen,

        navigateFunc,
        handleDelete,
      };
    });
    if (!rows) return [];
    return rows;
  };
  const navigateFunc = (id) => {
    setId(id);
  };
  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };
  return (
    <MainLayout>
      <div className="table__unresponsive">
        <div className="page__title">
          <Typography className={classes.root} variant="h5">
            Items
          </Typography>
        </div>
        <div className="add__btn__container">
          <Button
            onClick={() => {
              //navigate("/items");
              dispatch({ type: FETCH_ITEM_RESET });
              handleClickOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </div>
        {(loading || loadingItemDelete) && <CircularProgress />}
        {error && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {error}
          </Alert>
        )}
        {errorItemDelete && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {errorItemDelete}
          </Alert>
        )}
        <MyDataGrid
          cols={columns}
          rows={formatRowsData()}
          handleClickOpen={handleClickOpen}
        />
      </div>
      <div className="table__responsive">
        <Typography variant="div">
          <TableContainer component={Paper}>
            <Typography variant="div">
              <Typography className={classes.root} variant="h5">
                Items
              </Typography>
              <Typography className={classes.root} variant="div">
                <Button
                  onClick={() => {
                    //navigate("/items");
                    dispatch({ type: FETCH_ITEM_RESET });
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
            {(loading || loadingItemDelete) && <CircularProgress />}
            {error && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
            {errorItemDelete && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {errorItemDelete}
              </Alert>
            )}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell>Harvest Unit </TableCell>
                  <TableCell>Plantings</TableCell>
                  <TableCell>Varieties</TableCell>
                  <TableCell size="small" colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell align="left">{item?.itemName}</TableCell>
                    <TableCell>{item?.harvestUnit}</TableCell>
                    <TableCell>{item?.plantings}</TableCell>
                    <TableCell>{item?.varieties}</TableCell>

                    <TableCell size="small" align="right">
                      <Button
                        onClick={() => {
                          //navigate(`/items/${item._id}`);
                          setId(item?._id);
                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          console.log(item._id);
                          dispatch(deleteItem(item._id));
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
        </Typography>
      </div>
      <AddItemDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        id={id}
      ></AddItemDialog>
    </MainLayout>
  );
};

export default InventoryScreen;
