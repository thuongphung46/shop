import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
// import logger from "redux-logger";
import { versionSlice } from "./slices/versionSlice";
import { uploadSlice } from "./slices/uploadSlice";
import { upgradeHistorySlice } from "./slices/upgradeHistorySlice";

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: {},
});

export const store = configureStore({
  reducer: {
    version: versionSlice.reducer,
    upload: uploadSlice.reducer,
    upgradeHistory: upgradeHistorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(sagaMiddleware);
    if (process.env.NODE_ENV === "development") {
      // middlewares.push(logger);
    }

    return middlewares;
  },
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
