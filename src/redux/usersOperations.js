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

export const fetchCreateUser = createAsyncThunk(
  "users/fetchCreateUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await usersAPI.createUser(userData);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDeleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await usersAPI.deleteUserById(id);
      return resp;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
