import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchUsers,
} from "./usersOperations";
import { addGenericMatcher } from "../utils/reducerMatcher";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleError = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

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
      // .addCase(fetchUsers.pending, handlePending)
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // .addCase(fetchUsers.rejected, handleError)
      //Create
      // .addCase(fetchCreateUser.pending, handlePending)
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // .addCase(fetchCreateUser.rejected, handleError)
      // Delete
      // .addCase(fetchDeleteUser.pending, handlePending)
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      });
    // .addMatcher(
    //   isPending(fetchUsers, fetchCreateUser, fetchDeleteUser),
    //   (state) => {
    //     state.isLoading = true;
    //   },
    // )

    addGenericMatcher(builder);
    // .addMatcher(
    //   isRejected(fetchCreateUser, fetchDeleteUser, fetchUsers),
    //   (state, action) => {
    //     state.isLoading = false;
    //     state.isError = action.payload;
    //   },
    // )
    // .addMatcher(
    //   isFulfilled(fetchCreateUser, fetchUsers, fetchDeleteUser),
    //   (state) => {
    //     state.isLoading = false;
    //     state.isError = null;
    //   },
    // )
    // .addCase(fetchDeleteUser.rejected, handleError);
  },
});

export const usersReducer = usersSlice.reducer;
