import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsError = (state) => state.users.isError;
export const selectUsers = (state) => state.users.items;
export const selectFilters = (state) => state.filters;

export const selectVisibleUsers = createSelector(
  [selectUsers, selectFilters],
  (users, filters) => {
    return {
      users: users.filter((user) =>
        user.name.toLowerCase().includes(filters.toLowerCase()),
      ),
      filters,
    };
  },
);
