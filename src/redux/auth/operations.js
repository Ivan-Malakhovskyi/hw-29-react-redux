import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "@/services/authService";

export const fetchSignupUser = createAsyncThunk(
  "auth/fetchSignupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signUpUser(userData);
      return resp;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
