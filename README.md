```js
const addTodo = (text) => {
return {
type: "addTodo",
payload: text,
}
} - результат createAction()
```

В reducer у нас попаде в параметр action

```js
{
type: "addTodo",
payload: text,
}
```

і все ок

```js
const reducer = (state, action) => {
  return state;
};
```

А що робити, коли http request

```js
const addAsyncTodo = (text) => {
  return {
    type: "addTodo",
    payload: fetch("/todos"),
  };
};
```

значення payload Promise, а екшени доходять в reducer синхронно, що робити

Для роботи з асинхронними операціями(прлмісами) в Redux є спеціальна обгортка (middleware) redux-thunk. Він вже є вбудованим в @reduxjs-toolkit

Коли ми хочемо зробити щось асинхронне, що нам потрібно

```js
const addTodoOperation = (text) => {

return (dispatch) => {

}

} - асинхронний екшен creator
```

```js
const addTodoOperation = (text) => {
return (dispatch) => {
const todo = fetch("/todos");
dispatch(addTodo(todo));
};
};

const addTodoOperation = (text) => (dispatch) => {
const todo = fetch("/todos");
dispatch(addTodo(todo));
};

addTodoOperation("ff") - результатом буде (dispatch) => {
const todo = fetch("/todos");
dispatch(addTodo(todo));
}
```

, яка під капотом отримає dispatch;

ЯК ПРАЦЮЄ REDUX-THUNK

Приймає action і дивиться

- тип екшену об'єкт?

1. Так, ігноруєм його, пропускає далі
2. Ні, це функція, то екшен викликається action(dispatch)

Показати явно

```js
dispatch({ type: "dd", payload: "fff" });
dispatch(addTodoOperation("ff"));
```

Тобто redux-thunk ловить функції і викликає їх

```js
const usersSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    isLoading: false,
    isError: null,
  },
  reducers: {},
});

export const userReducer = usersSlice.reducer;
```

Що таке операції?

Асинхронний екшен-creator()

```js
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const users = await usersApi.getAllUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};
```

Це СИНХРОННІ ЕКЩЕНИ, які дійдуть до редюсера

```js
// Pending
export const fetchUsersRequest = createAction("users/fetchUsersRequest");

//Fulfilled
export const fetchUsersSuccess = createAction("users/fetchUsersSuccess");

//Rejected
export const fetchUsersError = createAction("users/fetchUsersError");
```

Це ОПЕРАЦІЯ, вона в собі використовує синхронні екшени по результату http request

```js
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const users = await usersApi.getAllUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersError(error));
  }
};

const usersSlice = createSlice({
  name: "users",

  initialState: {
    items: [],
    isLoading: false,
    isError: null,
  },

  reducers: {
    fetchInProgress(state) {
      state.isLoading = true;
    },

    fetchInSuccess(state, action) {
      state.isLoading = false;
      state.items = action.payload;
      state.isError = null;
    },

    fetchInError(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);
```

ABSOLUTE PATHS VITE

```js
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

jsconfig.json

```js
{
"compilerOptions": {
"paths": {
"@/*": ["./src/*"]
}
}
}
```

@/API

Index PATHS

```js
createAsyncThunk(typeAction, payloadCreator);
```

ПЕРЕПИСУЄМО

fetchUsers()

Доки

usersOperations

Те що вернем з createAsyncThunk - буде payload при success

{ rejectWithValue } - обробка помиллок

```js
export const fetchUsers = createAsyncThunk(
"users/getAllUsers",
async (\_, { rejectWithValue }) => {
try {
const resp = await usersApi.getAllUsers();
return resp;
} catch (error) {
rejectWithValue(error);
}
},
);

export const addUser = createAsyncThunk(
"users/addUser",
async (data, { rejectWithValue }) => {
try {
const resp = await usersApi.createUser(data);
return resp;
} catch (error) {
rejectWithValue(error);
}
},
);

export const deleteUser = createAsyncThunk(
"users/deleteUser",
async (id, { rejectWithValue }) => {
try {
const resp = await usersApi.deleteUserById(id);
console.log("🚀 ~ data:", resp);
return resp;
} catch (error) {
rejectWithValue(error);
}
},
);
```
