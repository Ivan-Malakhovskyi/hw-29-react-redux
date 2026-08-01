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
