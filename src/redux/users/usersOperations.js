import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersAPI from "@/services/usersService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const resp = await usersAPI.getAllUsers();
      return resp;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  },
);
