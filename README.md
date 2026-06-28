1. Init store store.js

const rootReducer = (state, action) => {
return state
}

export const store = createStore(rootReducer)

2. Redux vanilla для співбесіди

3. Redux devtools => state = undefined

const initialState = {
account: {
balance: 0,
},

locale: {
lang: "uk",
},
}

4. Проектуємо UI Account.jsx

5. useSelector()

6. Actions => action creators

export const deposit = (value) => {
return {
type: "account/deposit",
payload: value,
};
};

export const withdraw = (value) => {
return {
type: "account/withdraw",
payload: value,
};
};

7. Показуємо UI і action в Redux

8. Root reducer // console.log("🚀 ~ rootReducer ~ action:", action); type @Init

Switch => не можна стан мутувати

switch (action.type) {
// case "account/deposit":
// return {
// account: {
// balance: state.account.balance + action.payload,
// },

    case "account/withdraw":
      return {
      // account: {

// balance: state.account.balance - action.payload,
// }
};

// };

case default console.log("🚀 ~ rootReducer ~ action:", action); type @Init

default:
// return state;

Питання?

// const intiState = {
// a: 5,
// account: {
// b: 10,
// balance: 0,
// },

// };

     ...state,
         ...state.account,

9. // locale: {
   // lang: "uk",
   // },

10. Створюємо декілька редюсерів

const accountReducer = (state = { balance: 0 }, action) => {
switch (action.type) {

    case "account/deposit":
    return {...state, balance: state.balance + action.payload}

    case "account/withdraw":
    return {
        ...state,
        balance: state.balance - action.payload
    }

default:
return state;
}
};

const localeReducer = (state = {lang: "uk"}, action) => {
switch(action.type) {
default:
return state
}
}

delete root reducer

const rootReducer = combineReducers({
account: accountReducer,
lang: localeReducer
})

code spliting

accountSlice.js
localeSlice.js

LangSwitcher.jsx

   <div>
      <select value={lang}
      
      >
        <option value="en">EN</option>
        <option value="uk">UK</option>
        <option value="pl">PL</option>
      </select>
    </div>

useSelector() для default

ПРи onChange відправии подію

export const changeLang = (newLang) => {
return {
type: "locale/changeLang",
payload: newLang,
};
};

 <div>
      LangSwitcher
      <select
        value={lang}
        onChange={(e) => dispatch(changeLang(e.target.value))}
      >
        <option value="en">EN</option>
        <option value="uk">UK</option>
        <option value="pl">PL</option>
      </select>
    </div>

export const localeReducer = (state = { lang: "uk" }, action) => {

switch (action.type) {
case "locale/changeLang":
return {
...state,
lang: action.payload,
};

    default:
      return state;

}
};

Next логуємо всі редюсери (Actions)

console.log("🚀 ~ accountReducer ~ action:", action);
console.log("🚀 ~ localeReducer ~ action:", action);

В App.jsx

const lang = useSelector((state) => state.locale.lang);

       <b>Current lang {lang}</b>

11. Local vs global state

в App.jsx

<input
type="number"
value={value}
onChange={(e) => setValue(Number(e.target.value))}
/>

() => dispatch(deposit(value))

Окремо компонент Balance

import { useSelector } from "react-redux";

export const Balance = () => {
const balance = useSelector((state) => state.account.balance);

return <div>Balance {balance}</div>;
};
