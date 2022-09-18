import Button from "@mui/material/Button";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
const RenderStockButton = (params) => {
  const navigate = useNavigate();
  return (
    <strong>
      <Button
        onClick={() => {
          console.log(params);
          // console.log(item._id);
          // dispatch(deleteItem(item._id));
          console.log(params);
          //   params.handleSetAdditionType("addition");
          navigate(`/inventory/${params.row.itemDesc}_${params.id}/addition`);
          params.row.handleClickOpenStock();
        }}
      >
        <AddCircleIcon></AddCircleIcon>
      </Button>
      <Button
        onClick={() => {
          // console.log(item._id);
          // dispatch(deleteItem(item._id));
          //   params.handleSetAdditionType("deduction");
          navigate(`/inventory/${params.row.itemDesc}_${params.id}/deduction`);
          params.row.handleClickOpenStock();
        }}
      >
        <RemoveCircleIcon></RemoveCircleIcon>
      </Button>
    </strong>
  );
};
export default RenderStockButton;
