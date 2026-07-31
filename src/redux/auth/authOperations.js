import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "@/services/authService";
import { apiClient } from "@/services/apiClient";

const setToken = (token) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const unsetToken = () => {
  apiClient.defaults.headers.common.Authorization = "";
};

export const fetchSignupUser = createAsyncThunk(
  "auth/fetchSignupUser",
  async (userData, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
