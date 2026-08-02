import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

import {
  fetchContacts,
  fetchCreateContact,
  fetchDeleteContact,
} from "./contactsOperations";

import { addGenericMatcher } from "../genericMatcher";
import { selectFilters } from "./contactsSelectors";

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const usersSlice = createSlice({
  name: "contacts",
  initialState: usersAdapter.getInitialState({
    isLoading: false,
    isError: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCreateContact.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      })
      .addCase(fetchDeleteContact.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload.id);
      });

    addGenericMatcher(builder);
  },
});

export const { selectAll: selectAllContacts, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.contacts);

export const selectVisibleAdapterUsers = createSelector(
  [selectAllContacts, selectFilters],
  (contacts, filters) => {
    return {
      contacts: contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filters.toLowerCase()),
      ),
      filters,
    };
  },
);

const config = {
  key: "contacts",
  storage,
  whitelist: ["entities", "ids"],
};

export const persistedUsersReducer = persistReducer(config, usersSlice.reducer);
