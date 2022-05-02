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
import { deleteField, fetchFields } from "../actions/fieldActions";
import AddFieldDialog from "../components/forms/AddFieldDialog";
import { FETCH_FIELD_RESET } from "../constants/fieldConstants";
import MyDataGrid from "../components/MyDataGrid";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  {
    field: "fieldType",
    headerName: "Type",
    flex: 1,
    editable: true,
  },

  {
    field: "lightProfile",
    headerName: "Light Profile",

    flex: 1,
    editable: true,
  },

  {
    field: "fieldSize",
    headerName: "Size",
    type: "number",
    flex: 1,
    editable: true,
  },
  {
    field: "fieldStatus",
    headerName: "Status",

    flex: 1,
    editable: true,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];
const useStyles = makeStyles({
  root: {
    padding: "15px 0",
  },
});
const FieldScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, error, fields } = useSelector((state) => state.fields);
  const {
    loading: loadingFieldDelete,
    error: errorFieldDelete,
    success: successFieldDelete,
  } = useSelector((state) => state.fieldDelete);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    dispatch(fetchFields());
  }, [dispatch, successFieldDelete]);
  React.useEffect(() => {
    if (!open) setId(null);
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formatRowsData = () => {
    let rows = fields?.map((f) => {
      return {
        ...f,
        field: f?.name,
        id: f._id,
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
    dispatch(deleteField(id));
  };
  return (
    <MainLayout>
      <div className="table__unresponsive">
        <div className="page__title">
          <Typography className={classes.root} variant="h5">
            Fields
          </Typography>
        </div>
        <div className="add__btn__container">
          <Button
            onClick={() => {
              //navigate("/fields");
              dispatch({ type: FETCH_FIELD_RESET });
              handleClickOpen();
            }}
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
          >
            Add
          </Button>
        </div>
        {(loading || loadingFieldDelete) && <CircularProgress />}
        {error && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {error}
          </Alert>
        )}
        {errorFieldDelete && (
          <Alert style={{ width: "80%", margin: "0 auto" }} severity="error">
            {errorFieldDelete}
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
                Fields
              </Typography>
              <Typography className={classes.root} variant="div">
                <Button
                  onClick={() => {
                    //navigate("/fields");
                    dispatch({ type: FETCH_FIELD_RESET });
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
            {(loading || loadingFieldDelete) && <CircularProgress />}
            {error && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {error}
              </Alert>
            )}
            {errorFieldDelete && (
              <Alert
                style={{ width: "80%", margin: "0 auto" }}
                severity="error"
              >
                {errorFieldDelete}
              </Alert>
            )}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Light Profile</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell size="small" colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields?.map((field) => (
                  <TableRow key={field?._id}>
                    <TableCell>{field?.name}</TableCell>
                    <TableCell>{field?.fieldType}</TableCell>
                    <TableCell>{field?.lightProfile}</TableCell>
                    <TableCell>{field?.fieldStatus}</TableCell>
                    <TableCell>{field?.fieldSize}</TableCell>
                    <TableCell align="right" size="small">
                      <Button
                        onClick={() => {
                          //navigate(`/fields/${field._id}`);
                          setId(field._id);
                          handleClickOpen();
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                    <TableCell size="small" align="left">
                      <Button
                        onClick={() => {
                          console.log(field._id);
                          dispatch(deleteField(field._id));
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
      <AddFieldDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        id={id}
      ></AddFieldDialog>
    </MainLayout>
  );
};

export default FieldScreen;
