1. npm i redux-persist

import {
persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER,
} from 'redux-persist'

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { accountReducer } from "./accountSlice";
import { localeReducer } from "./localeSlice";
import storage from "redux-persist/es/storage";

middleware - функція(проміжний обробник) яка стоїть, між відправкою екшена і доставкою його в редюсер

const persistConfig = {
key: "root",
storage,
};

const persistedLocaleReducer = persistReducer(persistConfig, localeReducer);

export const store = configureStore({
reducer: {
account: accountReducer,
locale: persistedLocaleReducer,
},
});

export const persistor = persistStore(store);

main.jsx

import { PersistGate } from "redux-persist/integration/react";

<PersistGate loading={<div>Loading ...</div>} persistor={persistor}>
<App />
</PersistGate>

REdux-persist починає слідкувати за стейтом за який відповідає редюсер

persistedLocaleReducer() - воно знає, що там є стейт початквий і бере даний стейт і зберігає в localStorage
Якщо початкове в localStorage було 10 воно візьме прочитає з localStorage І буде 10, при перезавантаженні сторінки

BLACKLIST & WHITELIST

1. зберегти все крім чогось blacklist: ["c"] - все крім c

{
a:5,
b: 10,
c: 15
}

2. тільки щось з переліку whitelist: ["c"] -тільки це

initialState: { lang: "uk", a: 1, b: 2, c: 3 },

whitelist: ["lang"],

blacklist: ["lang"],

При цьому інші властивості зберігаються

blacklist: ["lang", "a"],

REFACTOR

Переносимо все з store в slice

const persistConfig = {
key: "locale",
storage,
whitelist: ["lang", "a"],
};

export const persistedLocaleReducer = persistReducer(
persistConfig,
slice.reducer,
);

REHYDRATE

    Тут "гідрація" означає: прочитати збережений стейт зі storage (localStorage/AsyncStorage/etc.) і влити його назад у Redux store перед першим рендером UI. Ніякого DOM тут немає, це чиста робота зі стейтом.

PersistGate вирішує саме це: він підписується на persistor і не рендерить children, доки bootstrapped !== true

Офіційна документація описує два режими: loading prop показує заданий компонент, поки персистенс не завершено, а після завершення рендерить children; альтернативно можна передати children як функцію, яка отримує аргумент bootstrapped — це зручно для transition-анімацій замість жорсткого перемикання.

Take a look at the logic that dispatched this action: {type: 'persist/PERSIST', register: ƒ, rehydrate: ƒ}

У redux-persistв в action записується декілька функцій

Не дуже добре, але це нічого не ламає і це необхідно, щоб бібліотека працювала, тому необхідно декілька типів екшенів ігнорувати, щоб Redux на них не реагував

Для цього необхідно

https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data

import {

FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER,
} from 'redux-persist'

Якщо приходить якийсь тип екшенів з тих, які ми передали => ігнорую => йду далі

ПОмилка вискакує тоді, коли до ред'юсера доходять екшени в якому є функції fn()

Action - серіалізована сутність (на якій можна застосувати JSON.sringify())
