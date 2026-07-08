import { createSlice } from "@reduxjs/toolkit";

const localeSlice = createSlice({
  name: "locale",
  initialState: { lang: "uk", a: 1, b: 2, c: 3 },
  reducers: {
    changeLang: {
      reducer(state, action) {
        state.lang = action.payload;
      },
      prepare(payload) {
        return {
          payload,
          meta: {
            ga: true,
          },
        };
      },
    },
  },
});

export const { changeLang } = localeSlice.actions;

export const localeReducer = localeSlice.reducer;
