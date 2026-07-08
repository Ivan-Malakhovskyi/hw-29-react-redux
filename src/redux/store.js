import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice";
import { localeReducer } from "./localeSlice";
import { userReducer } from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    account: accountReducer,
    locale: localeReducer,
  },
});
