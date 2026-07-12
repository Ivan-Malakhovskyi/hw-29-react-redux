import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice";
import { localeReducer } from "./localeSlice";
import { usersReducer } from "./users/usersSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/es/storage";

// const persistConfig = {
//   key: "users",
//   storage,
//   whitelist: ["users"]
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    account: accountReducer,
    locale: localeReducer,
    users: usersReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});
