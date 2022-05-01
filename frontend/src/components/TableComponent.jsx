import React from "react";
import MainLayout from "./MainLayout";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
const useStyles = makeStyles({
  root: {
    padding: "15px 15px",
  },
});
const TableComponent = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Typography className={classes.root} variant="h5">
        Fields
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
