import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "@/services/authService";
import axios from "axios";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const fetchSignupUser = createAsyncThunk(
  "auth/fetchSignupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signUp(userData);
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
