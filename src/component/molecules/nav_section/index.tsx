// @mui
import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
// import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------
interface Props {
  item: any;
  data: any;
}

export default function NavSection({ data = [], ...other }: any) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item: any) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem(item: any) {
  const { title, path, icon, info } = item;

  const StyledNavItem = styled((props: any) => (
    <ListItemButton disableGutters {...props} />
  ))(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: "relative",
    textTransform: "capitalize",
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  }));
  const StyledNavItemIcon = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}>
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
