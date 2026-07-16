import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const localeSlice = createSlice({
  name: "locale",
  initialState: { lang: "uk" },
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

const config = {
  key: "locale",
  storage,
  whitelist: ["locale"],
};

export const localePersistedReducer = persistReducer(
  config,
  localeSlice.reducer,
);
