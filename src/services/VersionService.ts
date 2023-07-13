import { HistoryDetailPayload } from "@redux/payload_types/UpgradeHistory";
import { PxPagination } from "@interfaces/layout/Pagination";
import { VersionInfo } from "@interfaces/VersionInfo";
import { HttpClientRequest } from "./Request";
const Controller = "Version";

const Versions = async () => {
  return await HttpClientRequest(Controller).getAsync("GetListVersion");
};

const GetDetailVersion = async (version?: string) => {
  return await HttpClientRequest(Controller).getAsync("GetVersionDetails", {
    Version: version,
  });
};

const DeleteVersion = async (version?: string) => {
  return await HttpClientRequest(Controller).postAsync("Deleteversion", {
    version: version,
  });
};

const GetProcessVersion = async (version: string) => {
  return await HttpClientRequest(Controller).getAsync("GetProcessVersion", {
    version,
  });
};

const ProcessVersion = async (version: string, company_info: string[]) => {
  return await HttpClientRequest(Controller).postAsync("ProcessVersion", {
    version: version,
    company_info: company_info,
  });
};

const TriggerUpgradeInBackground = async (
  version: string,
  company_info: string[]
) => {
  return await HttpClientRequest(Controller).postAsync("TriggerBackground", {
    version,
    company_info,
  });
};

const GetVersionHistory = async (pagination: PxPagination) => {
  return await HttpClientRequest(Controller).getAsync(
    "GetVersionHistory",
    pagination
  );
};

const AddNewVersion = async (versionInfo: VersionInfo) => {
  return await HttpClientRequest(Controller).postAsync(
    "AddNewVersion",
    versionInfo
  );
};
const GetVersionHistoryDetails = async (
  historyDetailParam: HistoryDetailPayload
) => {
  return await HttpClientRequest(Controller).getAsync(
    "GetVersionHistoryDetails",
    historyDetailParam
  );
};

const VersionService = {
  DeleteVersion: DeleteVersion,
  AddNewVersion,
  Versions: Versions,
  GetDetailVersion,
  GetProcessVersion,
  ProcessVersion,
  TriggerUpgradeInBackground,
  GetVersionHistory,
  GetVersionHistoryDetails,
};

export { VersionService };
