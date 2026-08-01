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

//! register

//! login

//! refresh
