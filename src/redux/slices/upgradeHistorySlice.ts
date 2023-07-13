import { HistoryFile, UpgradeHistoryRecord } from "interfaces/UpgradeTask";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toastMessage } from "component/molecules/toast";
import { all, put, takeLatest } from "redux-saga/effects";
import { VersionService } from "services/VersionService";
import { API_MESSAGE_CODE } from "interfaces/enums/ApiMessageCode";
import { PxPagination } from "interfaces/layout/Pagination";
import { HistoryDetailPayload } from "redux/payload_types/UpgradeHistory";

type HistoryState = {
  loading: boolean;
  records: UpgradeHistoryRecord[];
  pagination: PxPagination;
  detailRecord: UpgradeHistoryRecord;
  recordFiles: HistoryFile[];
  run_id: string;
  company_db: string;
};

const initialState: HistoryState = {
  loading: false,
  records: [],
  run_id: "",
  company_db: "",
  pagination: {
    page: 0,
    page_size: 10,
    total_pages: 0,
    total_rows: 0,
  },

  detailRecord: {
    company_db: "",
    log_id: -1,
    run_id: "",
    from_version: "",
    to_version: "",
  },
  recordFiles: [],
};
export const upgradeHistorySlice = createSlice({
  name: "upgradeHistory",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    loadHistory: (state, action: PayloadAction<PxPagination>) => {
      state.records = [];
      if (action.payload.page || action.payload.page_size) {
        state.pagination = action.payload;
      }
    },

    loadHistorySuccess: (
      state,
      action: PayloadAction<{
        history: UpgradeHistoryRecord[];
        pagination: PxPagination;
      }>
    ) => {
      state.records = action.payload.history;
      state.pagination = action.payload.pagination;
    },

    loadHistoryDetail: (state, action: PayloadAction<HistoryDetailPayload>) => {
      state.run_id = action.payload.run_id;
      state.company_db = action.payload.company_db;
      // state.detailRecord = initialState.detailRecord;
      state.recordFiles = [];
    },

    loadHistoryDetailSuccess: (
      state,
      action: PayloadAction<{
        detailRecord: UpgradeHistoryRecord;
        recordFiles: HistoryFile[];
      }>
    ) => {
      // state.detailRecord = action.payload.detailRecord;
      state.recordFiles = action.payload.recordFiles;
    },

    setDetailInput: (state, action: PayloadAction<UpgradeHistoryRecord>) => {
      state.detailRecord = action.payload;
    },

    endLoad: (state) => {
      state.loading = false;
    },
  },
});

function* fetchHistory({ payload }: PayloadAction<PxPagination>) {
  try {
    yield put(setLoading());

    const { msg_code, content, message } =
      yield VersionService.GetVersionHistory(payload);
    if (msg_code !== API_MESSAGE_CODE.SUCCESS) {
      toastMessage(message, "error");
      return;
    }
    if (content) {
      yield put(
        loadHistorySuccess({
          history: content.object_data,
          pagination: content.pagination[0],
        })
      );
    }
  } finally {
    yield put(endLoad());
  }
}

function* fetchDetails(action: PayloadAction<HistoryDetailPayload>) {
  try {
    yield put(setLoading());

    const { msg_code, content, message } =
      yield VersionService.GetVersionHistoryDetails(action.payload);

    if (msg_code !== API_MESSAGE_CODE.SUCCESS) {
      toastMessage(message, "error");
      return;
    }

    if (!content || !content.object_data) {
      toastMessage("No Data", "error");
      return;
    }

    yield put(
      loadHistoryDetailSuccess({
        recordFiles: content.object_data,
        detailRecord: initialState.detailRecord,
      })
    );
  } finally {
    yield put(endLoad());
  }
}

export function* upgradeHistoryWatcher() {
  yield all([
    takeLatest(loadHistory, fetchHistory),
    takeLatest(loadHistoryDetail, fetchDetails),
  ]);
}
const { setLoading, endLoad, loadHistorySuccess, loadHistoryDetailSuccess } =
  upgradeHistorySlice.actions;
export const { loadHistory, loadHistoryDetail, setDetailInput } =
  upgradeHistorySlice.actions;
