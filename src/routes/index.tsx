import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "component/pages/error";
// import { VersionManagement } from "@component/pages/version_management/VersionListPage";
// import { VersionList } from "@component/molecules/version_info/VersionList";
import RootLayout from "component/templates/root_layout/RootLayout";
// import ServerInfoPage from "@component/pages/server_info/ServerListPage";
// import ServerDetailPage from "@component/pages/server_info/ServerDetailPage";
// import UpgradeSystemPage from "@component/pages/upgrade_system/UpgradeSystemPage";
// import JobRunningPage from "@component/pages/upgrade_system/JobRunningPage";

// import TaskMonitorContainer from "@component/organisms/system_upgrade/TaskMonitorContainer";
// import UpgradeHistoryPage from "@component/pages/upgrade_system/UpgradeHistoryPage";
import { FORM_STATE } from "interfaces/enums/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/versions",
      //   element: <VersionManagement />,
      //   children: [
      //     { path: "/versions", element: <VersionList />, index: true },
      //     {
      //       path: "/versions/addnew",
      //       element: <VersionDetailPage form_state={FORM_STATE.ADD} />,
      //     },
      //     {
      //       path: "/versions/:version",
      //       element: <VersionDetailPage form_state={FORM_STATE.EDIT} />,
      //     },
      //   ],
      // },
    ],
  },
]);

export { router };
