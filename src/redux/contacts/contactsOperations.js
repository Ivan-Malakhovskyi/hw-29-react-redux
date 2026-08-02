import { createAsyncThunk } from "@reduxjs/toolkit";
import * as contactsAPI from "@/services/contactsService";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await contactsAPI.getAllContacts();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchCreateContact = createAsyncThunk(
  "contacts/fetchCreateContact",
  async (data, { rejectWithValue }) => {
    try {
      return await contactsAPI.createContact(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchDeleteContact = createAsyncThunk(
  "contacts/fetchDeleteContact",
  async (id, { rejectWithValue }) => {
    try {
      return await contactsAPI.deleteContactById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
