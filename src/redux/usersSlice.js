import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchUsers,
} from "./usersOperations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

//! Immer - дозволяє мутувати стан

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    isError: null,
    items: [],
  },
  extraReducers: (builder) => {
    builder

      // FetchAll
      .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.isError = null;
      })
      .addCase(fetchUsers.rejected, handleRejected)

      // Create

      .addCase(fetchCreateUser.pending, handlePending)
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.isError = null;
      })
      .addCase(fetchCreateUser.rejected, handleRejected)

      //Delete

      .addCase(fetchDeleteUser.pending, handlePending)
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        state.isError = null;
      });
  },
});

export const usersReducer = usersSlice.reducer;
