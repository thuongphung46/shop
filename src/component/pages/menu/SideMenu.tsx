import { Colors } from "common/color";
import { MdMenu, MdUpgrade } from "react-icons/md";
import { FaServer } from "react-icons/fa";
import { BiGitBranch } from "react-icons/bi";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { PxUpgradeMenu } from "interfaces/layout/PxUpgradeMenu";

export const SideMenu = () => {
  const menuData: PxUpgradeMenu[] = [
    {
      key: "SERVER_INFO",
      route_path: "/servers",
      display_name: "Server Information",
      display_icon: <FaServer />,
    },
    {
      key: "VERSION",
      route_path: "/versions",
      display_name: "Version Information",
      display_icon: <BiGitBranch />,
    },
    {
      key: "UPGRADE",
      route_path: "/upgrade",
      display_name: "Upgrade System",
      display_icon: <MdUpgrade />,
    },
    {
      key: "VERSION-HISTORY",
      route_path: "/history",
      display_icon: <ManageHistoryIcon />,
      display_name: "Upgrade History",
    },
  ];
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();

  return (
    <Sidebar
      style={{ overflowY: "auto", height: "100%" }}
      backgroundColor={Colors.primary}>
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active ? Colors.primaryDark : undefined,
              "&:hover": {
                backgroundColor: Colors.primaryDark,
              },
            };
          },
          icon: { color: Colors.white, fontSize: 20 },
          label: { fontSize: 17, color: Colors.white, fontWeight: "bold" },
        }}>
        <MenuItem
          icon={<MdMenu></MdMenu>}
          component={
            <div
              onClick={() => {
                collapseSidebar();
              }}></div>
          }>
          Pyxis Upgrade
        </MenuItem>
        {menuData.map((menuItem) => {
          return (
            <MenuItem
              active={location.pathname.includes(menuItem.route_path)}
              icon={menuItem.display_icon}
              component={<Link to={menuItem.route_path} />}
              key={menuItem.key}>
              {`${menuItem.display_name}`}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};
