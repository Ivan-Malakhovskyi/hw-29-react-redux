import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import { addGenericMatcher } from "../genericMatcher";
import { fetchSignupUser } from "./authOperations";

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
    builder.addCase(fetchSignupUser.fulfilled, (state, action) => {
      const data = action.payload;
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
