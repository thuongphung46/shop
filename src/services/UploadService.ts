import { upgradeApiInstance, HttpClientRequest } from "./Request";
import { SQL_FILE_TYPE } from "interfaces/enums/UploadFile";
import { UploadInfo } from "interfaces/UploadInfo";

const controller = "File";
export const UploadService = {
  UploadInfo: async (version?: string) => {
    return await HttpClientRequest(controller).getAsync("GetFilesByVersion", {
      Version: version,
    });
  },
  DeleteFile: async ({
    version,
    file_name,
    file_type_id,
    upload_id,
  }: UploadInfo) => {
    return await HttpClientRequest(controller).postAsync(
      `DeleteFile/Versions/${version}/Type/${file_type_id}/Code/${upload_id}/Name/${file_name}`
    );
  },
  UploadFile: (
    version: string,
    file: File,
    type_file: SQL_FILE_TYPE,
    onUploadProgress: (progressEvent: any) => void // <-- change the type here
  ): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);

    return upgradeApiInstance.post(
      `/File/UploadFile/Versions/${version}/Type/${type_file}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
  },

  GetFileStatusByCompany: async (version: string, CompanyName: string) => {
    return await HttpClientRequest(controller).getAsync(
      "GetFileStatusByCompany",
      {
        Version: version,
        CompanyName: CompanyName,
      }
    );
  },
};
