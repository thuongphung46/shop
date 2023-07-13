import { all } from "redux-saga/effects";
import { versionWatcher } from "./slices/versionSlice";
import { upgradeHistoryWatcher } from "./slices/upgradeHistorySlice";
import { fileUploadWatcher } from "./slices/uploadSlice";

export default function* rootSaga() {
  yield all([versionWatcher(), fileUploadWatcher(), upgradeHistoryWatcher()]);
}
