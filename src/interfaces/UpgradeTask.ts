import { ProcessStatusType } from "./enums/UpgradeTask";

export interface HistoryFile {
  file_id: number;
  file_name: string;
  file_version: string;
  file_date: Date;
  file_order: number;
  file_desc: string;
  file_status: string;
}

export interface UpgradeHistoryRecord {
  log_id: number;
  run_id: string;
  company_db: string;
  from_version: string;
  to_version: string;
  timestamp?: string;
  start_date?: string;
  end_date?: string;
  status?: ProcessStatusType;
}

export interface ProcessVersion {
  prepare_id: number;
  version: string;
  company_db: string;
  last_updated?: string;
  status?: string;
}

// TODO: should change it to enums?
export const PROCESS_VERSION_STATUS = {
  R: "Running",
  C: "Completed",
  F: "Failed",
} as const;

export interface UpgradeableDatabase {
  database: string;
  name: string;
  server: string;
  version: string;
}
