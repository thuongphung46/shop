import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toastMessage } from "component/molecules/toast";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { RootState } from "redux/store";
import { VersionService } from "services/VersionService";
import { API_MESSAGE_CODE } from "interfaces/enums/ApiMessageCode";
import { FORM_STATE } from "interfaces/enums/Form";
import { VersionInfo } from "interfaces/VersionInfo";

type VersionListState = {
  loading: boolean;
  version: string;
  versionList: VersionInfo[];
  form_state: FORM_STATE;
  versionData: VersionInfo;
};

const initialState: VersionListState = {
  loading: false,
  versionList: [],
  version: "",
  form_state: FORM_STATE.ADD,
  versionData: {
    version: "",
    app_version: "",
    build_version: "",
    previous_version: "",
  },
};

export const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

    loadVersions: (state) => {
      state.versionList = [];
    },
    loadSuccess: (state, action: PayloadAction<VersionInfo[]>) => {
      state.versionList = action.payload;
    },

    formAddNew: (state) => {
      state.form_state = FORM_STATE.ADD;
      state.versionData = initialState.versionData;
    },

    formDetail: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
      state.form_state = FORM_STATE.EDIT;
      state.versionData = initialState.versionData;
    },

    setVersion: (state, action: PayloadAction<VersionInfo>) => {
      state.versionData = action.payload;
    },
    setDelete: (state, action: PayloadAction<string>) => {
      state.version = action.payload;
    },

    endLoad: (state) => {
      state.loading = false;
    },
  },
});

//#region Sagas ------------------------------------------------------

function* fetchVersions() {
  try {
    yield put(setLoading());
    const { content, message, msg_code } = yield call(VersionService.Versions);
    if (msg_code !== API_MESSAGE_CODE.SUCCESS) {
      yield toastMessage(message, "error");
      return;
    }
    if (!content.object_data) {
      yield toastMessage(message, "error");
      return;
    }

    yield put(loadSuccess(content.object_data));
  } catch (err) {
    if (err instanceof Error) {
      yield toastMessage(err.message, "error");
      return;
    }
  } finally {
    yield put(endLoad());
  }
}

function* detailVersion(action: PayloadAction<string>) {
  yield put(setLoading());
  try {
    const { content, message, msg_code } =
      yield VersionService.GetDetailVersion(action.payload);
    if (msg_code !== API_MESSAGE_CODE.SUCCESS) {
      yield toastMessage(message, "error");
      return;
    }
    if (
      Array.isArray(content.object_data) &&
      content.object_data.length === 0
    ) {
      yield toastMessage("Version not found", "error");
      return;
    }
    yield put(setVersion(content.object_data[0]));
  } finally {
    yield put(endLoad());
  }
}

function* deleteVersion({ payload }: PayloadAction<string>) {
  try {
    const { message, msg_code } = yield VersionService.DeleteVersion(payload);
    if (msg_code !== API_MESSAGE_CODE.SUCCESS) {
      toastMessage(message, "error");
      return;
    }
    toastMessage("Success", "success");
  } finally {
    yield put(loadVersions());
  }
}

//#endregion

export const {
  setVersion,
  loadSuccess,
  loadVersions,
  setLoading,
  endLoad,
  setDelete,
  formDetail,
  formAddNew,
} = versionSlice.actions;

export const selectListVersion = (state: RootState) =>
  state.version.versionList;
export const selectVersionDetail = (state: RootState) =>
  state.version.versionData;

export function* versionWatcher() {
  yield all([
    takeEvery(loadVersions, fetchVersions),
    takeLatest(setDelete, deleteVersion),
    takeLatest(formDetail, detailVersion),
  ]);
}
