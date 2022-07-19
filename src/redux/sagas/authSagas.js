/* eslint-disable require-yield */
import { takeLatest, call, put } from "redux-saga/effects";
import { apis, keyActionLogins, keys } from "../../constants";
import { common_post } from "../../helpers";
import { authFail, authSuccess, doLogin, doLogout } from "../slices/authSlice";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doLogout.type, handleLogout);
}

// eslint-disable-next-line require-yield
function* handleLogin(action) {
  let dataRequest = action.payload
  try {
    const response = yield common_post(apis.login, dataRequest)
    console.log("loginfff ", response)
    if (response) {
      if (response.status === "OK") {
        // 
        let {refresh_token, token} = response.result
        localStorage.setItem(keys.access_token, token)
        localStorage.setItem(keys.refresh_token, refresh_token)
        yield put(authSuccess({message: keyActionLogins.LOGIN_SUCCESS}))
      }
      if (response.status === "KO" && response.message.includes("not match")) {
        yield put(authFail({ message: keyActionLogins.USERNAME_PASSWORD_ERROR }))
      }
    } else {
      yield put(authFail({ message: keyActionLogins.LOGIN_FAIL }))
    }

  } catch (error) {
    yield put(authFail({ message: keyActionLogins.LOGIN_FAIL }))
  }


}

function* handleLogout() {
  localStorage.removeItem(keys.access_token)
  localStorage.removeItem(keys.refresh_token)
  window.location.reload();
}

export const localSet = (key, val) => {
  return localStorage.setItem(key, JSON.stringify(val));
};
