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
      const resp = await authAPI.signUp(userData);
      setToken(resp.token);
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
      setToken(resp.token);
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
      unsetToken();
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
      setToken(token);

      return await authAPI.getCurrent();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
