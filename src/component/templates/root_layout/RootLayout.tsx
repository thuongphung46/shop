import { Box } from "@mui/material";
import { SideMenu } from "../../pages/menu/SideMenu";
import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const auth = true;
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
        }}
      >
        <SideMenu></SideMenu>
        <Box
          id={"main-view"}
          sx={{ height: "100%", flex: 1, overflow: "auto" }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default RootLayout;
