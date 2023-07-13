import { Typography } from "@mui/material";
import { toastMessage } from "component/molecules/toast";
// import TaskMonitor from "@component/molecules/upgrade_job/TaskMonitor";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UploadService } from "services/UploadService";
import { HistoryFile } from "interfaces/UpgradeTask";
import { API_MESSAGE_CODE } from "interfaces/enums/ApiMessageCode";

const TaskMonitorContainer = () => {
  const { version, database } = useParams();
  const [upgradeTaskActions, setUpgradeTaskActions] = useState<HistoryFile[]>(
    []
  );

  useEffect(() => {
    if (version && database) {
      UploadService.GetFileStatusByCompany(version, database).then(
        (apiResponse) => {
          if (apiResponse.msg_code !== API_MESSAGE_CODE.SUCCESS) {
            toastMessage(apiResponse.message ?? apiResponse.content, "error");
            return;
          }
          setUpgradeTaskActions(apiResponse.content?.object_data);
        }
      );
    }
  }, [version, database]);

  if (typeof database === "undefined") {
    return <div>No Data</div>;
  }

  return (
    <>
      <Typography variant="h6" color={"primary"}>
        Action Job
      </Typography>
      {/* <TaskMonitor tasks={upgradeTaskActions} /> */}
    </>
  );
};

export default TaskMonitorContainer;
