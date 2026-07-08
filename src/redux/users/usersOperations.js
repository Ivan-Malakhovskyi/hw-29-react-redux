import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersApi from "@/services/usersService";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const resp = await usersApi.getAllUsers();
      return resp;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);
