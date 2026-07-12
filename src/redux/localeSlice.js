import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const localeSlice = createSlice({
  name: "locale",
  initialState: { lang: "uk", a: 5, b: 10, c: 20 },
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload;
    },
  },
});

const persistConfig = {
  key: "locale",
  storage,
  whitelist: ["lang"],
};

export const { changeLang } = localeSlice.actions;

export const localePersistedReducer = persistReducer(
  persistConfig,
  localeSlice.reducer,
);
