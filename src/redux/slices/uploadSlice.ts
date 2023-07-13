import { all, put, takeLatest } from "@redux-saga/core/effects";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_MESSAGE_CODE } from "interfaces/enums/ApiMessageCode";
import { UploadInfo } from "interfaces/UploadInfo";
import { UploadService } from "../../services";
import { toastMessage } from "../../component/molecules/toast";

type UploadState = {
  files: UploadInfo[];
  version: string;
  loading: boolean;
};

const initialState: UploadState = {
  loading: false,
  version: "",
  files: [],
};
export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    getFileFromVersion: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
      state.files = [];
    },

    clearFiles: (state) => {
      state.files = [];
    },

    setFiles: (state, action: PayloadAction<UploadInfo[]>) => {
      state.files = action.payload;
    },

    endLoading: (state) => {
      state.loading = false;
    },
  },
});

function* fetchVersionFiles({ payload }: PayloadAction<string>) {
  yield put(setLoading());
  const { content, msg_code, message } = yield UploadService.UploadInfo(
    payload
  );
  if (msg_code !== API_MESSAGE_CODE.SUCCESS) {
    yield toastMessage(message, "error");
    return;
  }
  if (content.object_data) {
    yield put(setFiles(content.object_data));
  }
  yield put(endLoading());
}

export const {
  setLoading,
  endLoading,
  getFileFromVersion,
  setFiles,
  clearFiles,
} = uploadSlice.actions;

export function* fileUploadWatcher() {
  yield all([takeLatest(getFileFromVersion, fetchVersionFiles)]);
}
