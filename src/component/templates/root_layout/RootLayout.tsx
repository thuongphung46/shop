import { Box } from "@mui/material";
import { SideMenu } from "../../pages/menu/SideMenu";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "component/templates/nav";
import Header from "component/templates/header";
import { useState } from "react";

const RootLayout = () => {
  const auth = true;
  const [open, setOpen] = useState(true);
  if (auth) {
    return (
      <Box
        component="div"
        className={"main-app"}
        sx={{
          flexDirection: "row",
          display: "flex",
          flex: 1,
          height: "100vh",
        }}>
        <Header onOpenNav={() => setOpen(true)} />
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        {/* <SideMenu></SideMenu> */}
        <Box
          id={"main-view"}
          sx={{ height: "100%", flex: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootLayout;
