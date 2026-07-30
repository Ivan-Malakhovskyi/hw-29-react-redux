import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateUser } from "../users/operations";
import { fetchSigninUser, fetchSignoutUser } from "./authOperations";
import { addGenericMatcher } from "../genericMatcher";

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
  reducers: {
    getCurrentUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchSigninUser.fulfilled, (state, action) => {
        console.log(action.payload);
        const user = action.payload;

        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchSignoutUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
      });
    // .addCase(fetchCurrentUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    // });
    addGenericMatcher(builder);
  },
});

export const { getCurrentUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
