import { styled, tableRowClasses, TableRowProps } from "@mui/material";
import TableRow from "@mui/material/TableRow";

const StyledComponent = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    backgroundColor: "#F9F9F9",
  },
  ["&:nth-of-type(even)"]: {
    backgroundColor: "#F3F8FF",
  },
  ["&:last-child td, &:last-child th"]: {
    border: 0,
  },
}));

const CustomTableRow = ({ children }: TableRowProps) => {
  return <StyledComponent>{children}</StyledComponent>;
};

export default CustomTableRow;
