import { createSlice } from "@reduxjs/toolkit";
import { addGenericMatcher } from "../genericMatcher";
import {
  fetchRefreshUer,
  fetchSigninUser,
  fetchSignOutUser,
  fetchSignupUser,
} from "./authOperations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.isLoggedIn = false;
      state.user = { name: null, email: null };
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignupUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.user = data.user;
        state.isLoggedIn = true;
        state.token = data.token;
      })
      .addCase(fetchSigninUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.user = data.user;
        state.token = data.token;
        state.isLoggedIn = true;
      })
      .addCase(fetchSignOutUser.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(fetchRefreshUer.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      });

    addGenericMatcher(builder);
  },
});

export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
