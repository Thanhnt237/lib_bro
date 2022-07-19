import { createSlice } from "@reduxjs/toolkit";

const initState = {
  showWarningLogout: false,
  message: "",
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    doLogin() {},
    doLogout() {},

    authSuccess(state, action) {
      state.message = action.payload.message;
      state.user = action.payload.user;
    },

    authFail(state, action) {
      state.message = action.payload.message;
    },

    showWarningLogout(state, action) {
      state.showWarningLogout = true;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    resetAuthMessage(state) {
      state.message = "";
      state.showWarningLogout = false;
    },
  },
});

export const {
  doLogin,
  doLogout,
  authSuccess,
  authFail,
  resetAuthMessage,
  showWarningLogout,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;
