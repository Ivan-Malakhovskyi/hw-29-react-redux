import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersOperations";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    isError: null,
    items: [],
  },
  //   reducers: {
  //     fetchUsersRequest(state) {
  //       state.isLoading = true;
  //     },

  //     fetchUsersSuccess(state, action) {
  //       state.isLoading = false;
  //       state.items = action.payload;
  //       state.isError = null;
  //     },

  //     fetchUsersError(state, action) {
  //       state.isLoading = false;
  //       state.isError = action.payload;
  //     },
  //   },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.isError = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
// export const { fetchUsersError, fetchUsersSuccess, fetchUsersRequest } =
//   usersSlice.actions;
