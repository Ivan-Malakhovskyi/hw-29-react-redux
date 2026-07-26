import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersAPI from "@/services/usersService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await usersAPI.getAllUsers();
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchCreateUser = createAsyncThunk(
  "users/fetchCreateUser",
  async (data, { rejectWithValue }) => {
    try {
      return await usersAPI.createUser(data);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDeleteUser",
  async (id, { rejectWithValue }) => {
    try {
      return await usersAPI.deleteUserById(id);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
