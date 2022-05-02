import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const renderActionsButton = (params) => {
  return (
    <strong>
      <Button
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          params.row.navigateFunc(params.row.id);
          params.row.handleClickOpen();
        }}
      >
        <EditIcon />
      </Button>
      <Button
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={() => {
          params.row.handleDelete(params.row.id);
        }}
      >
        <DeleteIcon></DeleteIcon>
      </Button>
    </strong>
  );
};
export default renderActionsButton;
