import { ProcessStatusType } from "./enums/UpgradeTask";

export type ServerInfo = {
  version_info: string;
  name: string;
  type: string;
  server: string;
  user: string;
  password: string;
  database: string;
  schema_name: string;
  port: number;
};

export interface DatabaseInfo {
  database: string;
  name: string;
  server: string;
  user: string;
  password: string;
  port: string;
  schema: string;
  version: string;
  last_updated?: string;
  last_updated_version?: string;
  status?: ProcessStatusType;
}
export type DatabaseProvider =
  | "POSTGRES"
  | "SAP_HANA"
  | "MONGO_DB"
  | "SQL_SERVER";
