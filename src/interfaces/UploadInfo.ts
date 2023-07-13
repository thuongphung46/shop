import { SQL_FILE_TYPE } from "./enums/UploadFile";

export type UploadInfo = {
  upload_id: number;
  file_name: string;
  version: string;
  file_type_id: SQL_FILE_TYPE;
  upload_time?: string;
};
