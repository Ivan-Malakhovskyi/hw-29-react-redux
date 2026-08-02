    ОСНОВНІ ЗАВДАННЯ УРОКУ:

    1. Познайомитись з створенням облікових записів.

    2. Розглянути як додавати права доступу.

    3. Дізнатись що таке JSON Web Token.

1. Показати на дошці Excalidraw про те, що різним користувачам, потірбні різні дані з бд. Для цього дати аналогію з пропускоим на роботу, тобто унікальний id(номер). Було б не вірно, щоб користувач сам створював собі id і відправляв на сервер - незпечно, бо фронтенд не захищений. Джерелом правди завжди має бути бекенд. Тому потрібен механізм, який посилає дані на сервер в захищеному вигляді - один з них JWT. JWT - генерує бекенд

-create div#portal-root

2. createPortal(jsx, rootPortal)

3. createPortal рендерить модалку в окремий DOM-вузол поза деревом #root. Це рятує від проблем з z-index та overflow: hidden на батьківських контейнерах — класична біда, коли модалка "ріжеться" якимось overflow: hidden на three levels up.

```js
import styles from "./components/Modal/Modal.module.css";

  const handleToggleWith = () => {
    setWithPortal(!withPortal);
  };

  const handleToggleWithout = () => {
    setWithoutPortal(!withoutPortal);
  };
      <div className={styles["kill-container"]}>
        {" "}
        <button type="button" onClick={handleToggleWithout}>
          Open without
        </button>
        <WithoutPortal
          isOpen={withoutPortal}
          handleToggle={handleToggleWithout}
        />
      </div>

      <div className={styles["kill-container"]}>
        <button type="button" onClick={handleToggleWith}>
          Open with
        </button>

        <WithPortal isOpen={withPortal} handleToggle={handleToggleWith} />
      </div>
```

https://api.escuelajs.co/docs#/

https://fakeapi.platzi.com/en/rest/users/

```js
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authAPI.signUp(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

    .addCase(register.fulfilled, (state, action) => {
        const { name, email } = action.payload;
        state.user = { email, name };
      })

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await authAPI.signIn(credentials);
      setAuthHeader(res.access_token);
      const user = await authAPI.getCurrent();

      return { ...res, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

      .addCase(logIn.fulfilled, (state, action) => {
        const { name, email } = action.payload.user;

        state.user = { name, email };
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
      })

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      return await authAPI.getCurrent();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

      .addCase(refreshUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      });


```

```js
const dispatch = useDispatch();
const { isRefreshing } = useAuth();

useEffect(() => {
  dispatch(refreshUser());
}, [dispatch]);
```

```js
const HomePage = lazy(() => import("./pages/Home"));
const RegisterPage = lazy(() => import("./pages/Register"));
const LoginPage = lazy(() => import("./pages/Login"));
const UsersPage = lazy(() => import("./pages/Users"));
```
