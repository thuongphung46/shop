import { styled, TableHeadProps } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const StyledComponent = styled(TableHead)({ backgroundColor: "#D9D9D9" });
const CustomTableHead = (props: TableHeadProps) => {
  return <StyledComponent {...props} />;
};
export default CustomTableHead;
