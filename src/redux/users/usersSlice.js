import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import {
  fetchCreateUser,
  fetchDeleteUser,
  fetchToggleStatus,
  fetchUserById,
  fetchUsers,
} from "./operations";

import { addGenericMatcher } from "../genericMatcher";

export const usersAdapter = createEntityAdapter({
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
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        console.log(action.payload);
        usersAdapter.setOne(state, action.payload);
      });
    addGenericMatcher(builder);
  },
});

const config = {
  key: "users",
  storage,
  whitelist: ["entities", "ids"],
};

export const persistedUsersReducer = persistReducer(config, usersSlice.reducer);
