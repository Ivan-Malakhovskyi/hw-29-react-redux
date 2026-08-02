import { apiClient } from "@/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "@/services/auth-service";

// Utility to add JWT
const setAuthHeader = (token) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  apiClient.defaults.headers.common.Authorization = "";
};

export const fetchSignupUser = createAsyncThunk(
  "auth/fetchSignupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signUp(userData);
      setAuthHeader(resp.token);
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchSigninUser = createAsyncThunk(
  "auth/fetchSigninUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signIn(userData);
      setAuthHeader(resp.token);
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchSignOutUser = createAsyncThunk(
  "auth/fetchSignOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signOut();
      clearAuthHeader();
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchRefreshUer = createAsyncThunk(
  "auth/fetchRefreshUer",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("Unable fetch user");
      }
      setAuthHeader(token);

      return await authAPI.getCurrent();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
