1. Delete old => install new packages

2. export const store = configureStore({
   reducer: rootReducer,
   });

//! Автоматично викличе combineReducers() всередині
export const store = configureStore({
reducer: {
account: accountReducer,
locale: localeReducer,
},
});

RENAME FILES

FROM accountReducer => accountSlice

3. Actions
   export const deposit = createAction("account/deposit")
   console.dir(deposit) - Function
   console.log(deposit(10)) - return object;

4. Reducers

const accountReducer1 = createReducer({ balance: 0 }, {});

Сказати, що краще використовувати функцію, а не об'єкт

{
[addTask]: (state, action) => {
return [...state, action.payload];
},
} - бо це deprecated

А функцію

builder - object, який сам викличеться

addCase() - додати випадок

(builder) => builder.addCase()

const accountReducer1 = createReducer({ balance: 0 }, (builder) =>
builder
.addCase(deposit, (state, action) => {})
.addCase(withdraw, (state, action) => {}),
);

Чому .addCase(deposit, (state, action) => {})

а Не .addCase('account/deposit', (state, action) => {})

- ФУНКЦІЯ - об'єкт , у об'єкта є метод toString(), коли об'єкт приводиться до рядка => викликається метод toString() - тобто для account, withdraw

export const deposit = createAction("account/deposit")

- CreateAction для даних функцій, перевизначає метод toString() так, щоб він вертав такий рядок "account/deposit"

const accountReducer1 = createReducer({ balance: 0 }, (builder) =>
builder
.addCase(deposit, (state, action) => {
return {
...state,
balance: state.balance + action.payload,
};
})
.addCase(withdraw, (state, action) => {
return {
...state,
balance: state.balance - action.payload,
};
}),
);

        =>>

ЧИ ПРАЦЮЄ?

const accountReducer1 = createReducer({ balance: 0 }, (builder) =>
builder
.addCase(deposit, (state, action) => {
state.balance += action.payload;

      // return {
      //   ...state,
      //   balance: state.balance + action.payload,
      // };
    })
    .addCase(withdraw, (state, action) => {
      state.balance -= action.payload;
      // return {
      //   ...state,
      //   balance: state.balance - action.payload,
      // };
    }),

);

ВСЕ ПРАЦЮЄ

В createReducer під капотом працює бібліотека Immer

в State передає копію

(parameter) state: WritableNonArrayDraft<{
balance: number;
}>

Порівнює зміни і додає їх імутабельно

5. Про Бібліотеку Immer

6. Немає default case, він визначається за замовчуванням

є addDefaultCase(() => {})

7. Slice

import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
name: "account",
initialState: { balance: 0 },
reducers: {
deposit(state, action) {
state.balance += action.payload;
},
widthDraw(state, action) {
state.balance -= action.payload;
},
},
});
console.log(slice);

console.log(slice.actions.deposit);

console.dir(slice.actions.deposit);
console.dir(slice.actions.deposit(5));

export const { deposit, widthDraw } = slice.actions;
export const accountReducer = slice.reducer; //! Root reducer

8. localeSlice.js

export const slice = createSlice({
name: "locale",
initialState: { lang: "uk" },
reducers: {
changeLang(state, action) {
state.lang = action.payload;
},
},
});

initialState: {
lang: "uk",

    a: {
      b: {
        c: 51,
      },
    },

},

!COPY
qwerty(state, action) {
state.a.b.c = action.payload;
},

9. PREPARE

Окрім полів форми, нам ще треба id
де ми відпавляємо дані ? => в формі
Для чого формі знати про який id, це не її
ЇЇ задача, зібрати дані і відпавити їх

ID створюються всередині redux логіки

Для цього використовується prepare, функція підготвки payload

deposit(5)
console.log(deposit(5))
Якщо треба додати до цих двох властивостей ще якесь

    deposit: {
      reducer(state, action) {
        state.balance += action.payload;
      },
      prepare(value) {
         return {
          payload: {
            value,
            id: Date.now(),
          },
        };
      }
    },

console.log(deposit(6));
