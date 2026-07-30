import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "@/services/authService";

export const fetchSignupUser = createAsyncThunk(
  "auth/fetchSignupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signUpUser(userData);
      console.log("🚀 ~ resp:", resp);
      return { name: resp.displayName, email: resp.email };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const fetchSigninUser = createAsyncThunk(
  "auth/fetchSigninUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { displayName, email } = await authAPI.signInUser(userData);
      return { email, name: displayName };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchSignoutUser = createAsyncThunk(
  "auth/fetchSignoutUser",
  async (_, { rejectWithValue }) => {
    try {
      return await authAPI.signOutUser();
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await authAPI.getCurrent();
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   },
// );
