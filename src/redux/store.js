import createSagaMiddleware from "@redux-saga/core";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rootSaga from "./sagas/rootSaga";
import { authSlice } from "./slices";

const reducer = combineReducers({
  auth: authSlice,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
