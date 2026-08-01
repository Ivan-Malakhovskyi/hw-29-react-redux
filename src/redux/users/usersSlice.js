import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./usersOperations";
import { addGenericMatcher } from "../genericMatcher";

const usersSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.items = action.payload;
    });

    addGenericMatcher(builder);
  },
});

export const usersReducer = usersSlice.reducer;
