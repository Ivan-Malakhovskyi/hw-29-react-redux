import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchToggleStatus,
  fetchUsers,
} from "./operations";
import { addGenericMatcher } from "./genericMatcher";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    isError: null,
    items: [],
  },
  extraReducers: (builder) => {
    builder
      //Get All
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      //Create
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        console.log(state.items);
      })
      .addCase(fetchToggleStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (user) => user.id === action.payload.id,
        );
        state.items.splice(idx, 1, action.payload);
      });
    addGenericMatcher(builder);
  },
});

export const usersReducer = usersSlice.reducer;
