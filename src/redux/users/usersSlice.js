import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchToggleStatus,
  fetchUsers,
} from "./operations";

import { addGenericMatcher } from "../genericMatcher";
import { selectFilters } from "./selectors";

//! !id => selectId =(state) => state.bookID

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    isLoading: false,
    isError: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload.id);
      })
      .addCase(fetchToggleStatus.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      });
    addGenericMatcher(builder);
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export const selectVisibleAdapterUsers = createSelector(
  [selectAllUsers, selectFilters],
  (users, filters) => {
    return {
      users: users.filter((user) =>
        user.name.toLowerCase().includes(filters.toLowerCase()),
      ),
      filters,
    };
  },
);

const config = {
  key: "users",
  storage,
  whitelist: ["entities", "ids"],
};

export const persistedUsersReducer = persistReducer(config, usersSlice.reducer);
