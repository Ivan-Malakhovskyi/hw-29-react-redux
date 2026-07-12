import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersAPI from "@/services/usersService";
// import {
//   fetchUsersError,
//   fetchUsersRequest,
//   fetchUsersSuccess,
// } from "./usersSlice";

// export const fetchUsers = () => async (dispatch) => {
//   dispatch(fetchUsersRequest());
//   try {
//     const resp = await usersAPI.getAllUsers();
//     dispatch(fetchUsersSuccess(resp));
//   } catch (error) {
//     dispatch(fetchUsersError(error));
//   }
// };

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
