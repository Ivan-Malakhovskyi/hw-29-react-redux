import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "@redux-devtools/extension";
import { accountReducer } from "./accountReducer";
import { localeReducer } from "./localeReducer";

const enhancer = devToolsEnhancer();

const rootReducer = combineReducers({
  account: accountReducer,
  locale: localeReducer,
});

export const store = createStore(rootReducer, enhancer);
