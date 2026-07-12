import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice";
import { localeReducer } from "./localeSlice";

const myMiddleware1 = (store) => (next) => (action) => {
  console.log("🚀 ~ myMiddleware1 ~ action:", action);

  if (action?.meta?.ga) {
    console.log("GA SEND TO ANALYTICS");
  }
  next(action);
};

export const store = configureStore({
  reducer: {
    account: accountReducer,
    locale: localeReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const result = getDefaultMiddleware();

    console.log(result);

    return [...result, myMiddleware1];
  },
});
