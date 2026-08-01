import { createSlice } from "@reduxjs/toolkit";
import { addGenericMatcher } from "../genericMatcher";

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
    builder;

    addGenericMatcher(builder);
  },
});

export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
