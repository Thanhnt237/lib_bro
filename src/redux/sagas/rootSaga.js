import { all, fork } from "@redux-saga/core/effects";
import { watchDoAuth } from "./authSagas";

export default function* rootSaga() {
  yield all([fork(watchDoAuth)]);
}
