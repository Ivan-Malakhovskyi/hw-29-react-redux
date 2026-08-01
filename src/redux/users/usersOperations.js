import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersAPI from "@/services/user-service";

// GET @ /users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      return await usersAPI.getAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
