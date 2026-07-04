import { createSlice } from "@reduxjs/toolkit";

const localeSlice = createSlice({
  name: "locale",
  initialState: { lang: "uk", a: 1, b: 2, c: 3 },
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload;
    },
  },
});

export const { changeLang } = localeSlice.actions;

export const localeReducer = localeSlice.reducer;
