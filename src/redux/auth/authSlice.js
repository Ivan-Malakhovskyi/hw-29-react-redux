import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
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
  isRefresh: false,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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

const config = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const authPersistedReducer = persistReducer(config, authSlice.reducer);
