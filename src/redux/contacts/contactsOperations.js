import { createAsyncThunk } from "@reduxjs/toolkit";
import * as contacts from "@/services/contactsService";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await contacts.getAllContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchCreateContact = createAsyncThunk(
  "contacts/fetchCreateContact",
  async (data, { rejectWithValue }) => {
    try {
      return await contacts.createContact(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchDeleteContact = createAsyncThunk(
  "contacts/fetchDeleteContact",
  async (id, { rejectWithValue }) => {
    try {
      return await contacts.deleteUserById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchToggleStatus = createAsyncThunk(
  "contacts/fetchToggleStatus",
  async (user, { rejectWithValue }) => {
    try {
      return await contacts.toggleStatus(user.id, user);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
