import { styled, tableCellClasses, TableCell } from "@mui/material";
import { Colors } from "common/color";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#fff",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.grey,
    borderColor: "#F5F5F5",
  },
}));

export default CustomTableCell;
