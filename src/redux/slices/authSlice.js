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
      state.message = action.payload.message
    },

    authFail(state, action) {
        state.message = action.payload.message
    },

    showWarningLogout(state, action) {
      state.showWarningLogout = true;
    },

    resetAuthMessage(state) {
      state.message = "";
      state.showWarningLogout = false
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
  
} = authSlice.actions;

export default authSlice.reducer;
