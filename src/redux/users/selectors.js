import { createSelector } from "@reduxjs/toolkit";
import { usersAdapter } from "./usersSlice";

export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsError = (state) => state.users.isError;
export const selectUsers = (state) => state.users.items;
export const selectFilters = (state) => state.filters;

export const { selectAll: selectAllUsers, selectById } =
  usersAdapter.getSelectors((state) => state.users);

export const selectUserById = (state, id) => selectById(state, id);

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
