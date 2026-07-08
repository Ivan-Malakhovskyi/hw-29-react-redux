import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersOperations";

const usersSlice = createSlice({
  name: "users",

  initialState: {
    items: [],
    isLoading: false,
    isError: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = true;
        state.items = action.payload;
        state.isError = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const userReducer = usersSlice.reducer;
