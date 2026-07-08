MIDDLEWARE - для співбесіди

1. Actions => Reducers => Store

2. Але між actions та reducer є middleware (проміжне пз) - Function

3. В Redux вони викликаються після dispatch але перед потраплянням до редюсера екшенів

4. Тут знаходиться стек middlewares

5. В стек middlewares Action потрапляє ПОСЛІДОВНО

6. Приклади в додатку

-зв'язок стора з devtools - middleware
-redux-thunk - middleware

7. Як і коли їх ствоювати

export const store = configureStore({
reducer: {
account: accountReducer,
locale: localeReducer,
},

middleware: (getDefaultMiddleware) => {
const result = getDefaultMiddleware();
console.log(result);
return result;
},
});

middleware: (getDefaultMiddleware) => {
const result = getDefaultMiddleware();
console.log(result);
return result;
}, - те що відбувається по замовчуванню

function middleware1(store) {
return function (next) {
return function (action) {
console.log("🚀 ~ middleware1 ~ action:", action);
};
};
}

Весь код middleware - пишеться в 3й функції

return [...result, middleware1];

Чому так 3 функції

Тому що при створенні Redux, використовували патерни функціонального програмування (carryng), тому такий синтаксис, під капотом вони її 3 рази розпаковують => викликають

Відправляємо action в changeLang

function middleware2(store) {
return function (next) {
return function (action) {
console.log("🚀 ~ middleware2 ~ action:", action);
};
};
}

return [...result, middleware1, middleware2];

Результат - викликається тільки middleware1, чому

Потрібно використовувати next - параметр 2 функції, який використовується для того щоб, відправити action далі по ланцюгу md

Якщо потрібно далі відправити екшен, викликаємо next(action), тоді він доходить в іншу функцію, яка стоїть за нею

Показати в інтерфейсі

🚀 ~ middleware1 ~ action: {type: 'locale/changeLang', payload: 'pl'}payload: "pl"type: "locale/changeLang"[[Prototype]]: Object
store.js:17 🚀 ~ middleware2 ~ action: {type: 'locale/changeLang', payload: 'pl'}

ЗМІНЮЄМО Balance => інтерфейс не змінюється, бо md2 чекає,

Тому треба next(action)

Store - це об'єкт стора

Middleware - потужна штука в програмуванні

Для чого воно ці middleware?

наприклад, вам потрібно відправити дані в google analytics при якомусь екшені ?

onChange={(e) => {

    const action = deposit(value)
    GA.send(action)
    dispatch(action)

}}

і таке треба буде скрізь поставити, або написати middleware Ю яке зловить екшен і відпрвить їх в GA

const gaMiddleware = (store) => {
return (next) => {
return (action) => {
next(action);
};
};
};

АБО

const gaMiddleware = (store) => (next) => (action) => {
console.log("🚀 ~ gaMiddleware :");
next(action);
};

const gaMiddleware = (store) => (next) => (action) => {
console.log("🚀 ~ gaMiddleware :");
// GA.send(action);
next(action);
};

Тоді видаляємо GA.send(action) скрізь

in gaMiddleware
console.log(`🚀 ~ send action ${action} to  GA`);

НАступне => Якщо нам не потрібно відпавляти всі екшени

Як би ви зробили ?

РІШЕННЯ = РОЗШИРИТИ ЕКШЕН

Додати мітку

const a = {
type: "a",
payload: 1,
meta: {
ga: true,
},
};

const b = {
type: "b",
payload: 2,
};

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

Якщо буде 600 екшенів, то на кожен екшен руками ставити прапорці? Насправді ні, пишуться утилітні функції, які автматично будуть вам ствити праорці, set(nameFlag)

Як працює redux-thunk, оскільки ми при dispatch(fetchTasks) відправляємо асинхронну функцію, а не об'єкт, чому все працює,

ВІДПОВІДЬ - тому що є redux-thunk - middleware

const fetchTasks = () => async (dispatch) => {
try {
const response = await axios.get("/tasks");
} catch (e) {}
};

dispatch(fetchTasks());

disptch({});

const reduxThunkMd = (state) => (next) => (action) => {
if (typeof action === "function") {
action(store.dispatch);
return;
}

next(action);
};

Тобто якщо об'єкт => пропускає
Якщо Func => Я тебе викликаю

І до редюсерів функція не доходить

Це робяться для того, щоб не писати весь код функції в ефекті

useEffect(() => {
dispatch(fetchTasks());
}, [dispatch]);

а не

useEffect(() => {
try {
// Індикатор завантаження
dispatch(fetchingInProgress());
// HTTP-запит
const response = await axios.get("/tasks");
// Обробка даних
dispatch(fetchingSuccess(response.data));
} catch (e) {
// Обробка помилки
dispatch(fetchingError(e.message));

};
}, []);
