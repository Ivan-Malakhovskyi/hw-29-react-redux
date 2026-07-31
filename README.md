1. Показати на дошці Excalidraw про те, що різним користувачам, потірбні різні дані з бд. Для цього дати аналогію з пропускоим на роботу, тобто унікальний id(номер). Було б не вірно, щоб користувач сам створював собі id і відправляв на сервер - незпечно, бо фронтенд не захищений. Джерелом правди завжди має бути бекенд. Тому потрібен механізм, який посилає дані на сервер в захищеному вигляді - один з них JWT. JWT - генерує бекенд

2. https://www.jwt.io/

3. https://randomkeygen.com/

FLOW

Register => backend checks validity => create jwt and add userinfo and response it jwt on frontend
=> get it key and add to every next request in headers => backend get token and decode this token (decode can only backend, because backend know secret_key, that used while creating jwt), because if has secret can decode jwt with decode algorithm
=> if token valid backend response data it is user - backend stateless - only req - res

4. Розібрати проєкт + форму стану auth

КОЛИ БУДЕ ПРАКТИКА РОЗКАЗАТИ ПРО Swagger

ВИДАЛИТИ ОБРОБНИКИ ВСІ DISPATCH

5. SignUp

```js

const setToken = (token) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const unsetToken = () => {
  apiClient.defaults.headers.common.Authorization = "";
};


export const fetchSignupUser = createAsyncThunk(
  "auth/fetchSignupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signUp(userData);
      setToken(resp.token);
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


      .addCase(fetchSignupUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.user = data.user;
        state.isLoggedIn = true;
        state.token = data.token;
      })

const handleSubmit = (values, { resetForm }) => {
  console.log(values);
  dispatch(fetchSignupUser(values));
  // navigate("/signin");
  // resetForm();
};
```

6. SignIn

```js
export const fetchSigninUser = createAsyncThunk(
  "auth/fetchSigninUser",
  async (userData, { rejectWithValue }) => {
    try {
      const resp = await authAPI.signIn(userData);
      console.log(resp);
      setToken(resp.token);
      return resp;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

      .addCase(fetchSigninUser.fulfilled, (state, action) => {
        const data = action.payload;
        state.user = data.user;
        state.token = data.token;
        state.isLoggedIn = true;
      })

const handleSubmit = (values, { resetForm }) => {
  console.log(values);
  dispatch(fetchSigninUser(values));
  // navigate('/contacts')
  // resetForm();
};
```

7. Signout

```js
export const fetchSignOutUser = createAsyncThunk(
  "auth/fetchSignOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.signOut();

    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

      .addCase(fetchSignOutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.token = null;
      })

показати unsetToken(); після показу, що все працює
```

8. Залогінитись і перейти на contacts - показати bearer

9. Після створення декількох тасок, розлогінитись і показати, що в кожного своя колекція

10. Refresh

Коли перезавантаження, користувач має зберегтися

Refresh в App

```js
const { isRefresh } = useAuthUser();

const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchCurrentUser());
}, [dispatch]);

{
  isRefresh ? (
    <Spinner />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="contacts:id" element={<ContactDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

2 випадки

1. Залогінились і перезавантажуємо, тобто токен є, і запишеться в стейт з LocaleStorage

2. Коли не залогінені і перезавантажуємо, токена нема, отже треба перевірити чи є в нас токен в стані редакс

```js
<nav className={styles.nav}>
  {isLoading && !isError ? (
    <Spinner width={20} height={20} />
  ) : (
    <div className={styles.wrapper}>
      <NavLink to="/">Home</NavLink>
      {!isLoggedIn ? <AuthNav /> : <AppBar />}
    </div>
  )}
</nav>
```

В createAsyncThunk можна отримати достпу до стану

```js
const { token } = getState().auth;
console.log(token);
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      console.log(token);

      if (!token) {
        return rejectWithValue("Invalid token");
      }
      setToken(token);
      return await authAPI.getCurrent();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      });
```

Коли токен є, то робимо запит

Редірект

Private && Restricted routes

Тобто редіректи після дій

Private - повинен спрацьовувати, коли ми не залогінені
Restricted - маршрути, де залогіненому користувачу нема шо робити

Як буде використовуватись?

```js
export const RestrictedRoute = ({ element: Component, navigateTo = "/" }) => {
  const { isLoggedIn } = useAuthUser();
  //   const navigate = useNavigate();

  return isLoggedIn ? <Navigate to={navigateTo} /> : <Component />;
};
<RestrictedRoute element={<Singin>} to="/contacts"/>


в App.jsx


  <Route
              path="signin"
              element={
                <RestrictedRoute
                  element={<SignInPage />}
                  navigateTo="/contacts"
                />
              }
            />

            <Route
              path="signup"
              element={
                <RestrictedRoute
                  element={<SignUpPage />}
                  navigateTo="/contacts"
                />
              }
            />
```

```js

Перенеправляти, коли

-не залогінений
-рефреш закінчився, користувача немає

Наприклад

Користувач на /conacts
Refresh
Під час reload page він ще не залогінений і його викине з /contacts, тому потрібно впевнитися, що рефреш пройшов і там нема користувача і він не залогінений

1. Юзер на /contacts, тисне F5
2. Redux store перестворюється з нуля → isLoggedIn: false
3. App.jsx монтується, диспатчить refreshUser() (запит іде на бекенд)
4. PrivateRoute рендериться ОДРАЗУ, поки запит ще в польоті
5. isLoggedIn === false → редірект на /login 🔴
6. Через 200мс приходить відповідь refreshUser → isLoggedIn: true
7. Юзер вже на /login, хоча насправді був залогінений

import { Navigate } from "react-router";
import { useAuthUser } from "./hooks/useAuthUser";

export const PrivateRoute = ({ element, navigateTo = "/" }) => {
  const { isLoggedIn, isRefresh } = useAuthUser();

  const shouldRedirectUser = !isRefresh && !isLoggedIn;

  return shouldRedirectUser ? <Navigate to={navigateTo} /> : element;
};

<Route
  path="contacts"
  element={<PrivateRoute element={<Contacts />} navigateTo="/signin" />}
/>;
```

оптимізація

lazy

```js
const HomePage = lazy(() => import("./components/pages/HomePage"));
```

```js


Але спочатку ({ isActive }) => (isActive ? "active" : null);

export const setActive = ({ isActive }) => (isActive ? "active" : null);

import { setActive } from "@/utils/setActive";

const routes = [
  {
    id: 1,
    href: "signin",
    text: "SignIn",
  },
  {
    id: 2,
    href: "signup",
    text: "SignUp",
  },
];

export const AuthNav = () => {
  return routes.map(({ id, href, text }) => (
    <NavLink key={id} to={href} className={setActive}>
      {text}
    </NavLink>
  ));
};
```
