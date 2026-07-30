import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;
export const selectUsers = (state) => state.contacts.items;
export const selectFilters = (state) => state.filters;

export const selectVisibleUsers = createSelector(
  [selectUsers, selectFilters],
  (contacts, filters) => {
    return {
      contacts: contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filters.toLowerCase()),
      ),
      filters,
    };
  },
);
