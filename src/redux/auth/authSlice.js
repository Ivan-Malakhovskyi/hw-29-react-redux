import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts } from "../contacts/contactsOperations";
import { addGenericMatcher } from "../genericMatcher";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefresh: false,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    });
    addGenericMatcher(builder);
  },
});

export const authReducer = authSlice.reducer;
