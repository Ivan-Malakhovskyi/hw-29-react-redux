Нормалізація стану — це підхід до організації Redux store, коли дані зберігаються у вигляді плоских структур (за принципом реляційної бази даних), а не у вигляді вкладених/дублікованих об'єктів. Ідея запозичена прямо з баз даних: замість вкладених JSON-дерев — таблиці з ключами та referencing по id.

Проблеми тут:

Дублювання даних — Alex зберігається в кількох місцях. Оновив ім'я в одному — забув в іншому, і в тебе користувач "Alex" в одному пості і "Alexander" в іншому. Шизофренія на рівні стейту.
Складні оновлення — щоб змінити коментар, треба знайти пост, знайти коментар всередині масиву, замапити все заново.
Дорогі ре-рендери — компонент, підписаний на posts, ре-рендериться навіть якщо змінився лише коментар в одному пості.

Коли нормалізація виправдана
Дані з бекенду мають вкладену/реляційну природу (пости→автори→коментарі)
Одна й та сама сутність з'являється в різних частинах UI
Потрібні часті point-оновлення окремих елементів (лайк на коментарі, редагування юзера)

```js
// Ненормалізований стан — типова помилка новачків
const state = {
  posts: [
    {
      id: 1,
      title: "Redux is fun",
      author: { id: 1, name: "Alex" },
      comments: [
        { id: 1, text: "Nice!", author: { id: 2, name: "Kate" } },
        { id: 2, text: "Agree", author: { id: 1, name: "Alex" } },
      ],
    },
    {
      id: 2,
      title: "State management",
      author: { id: 1, name: "Alex" }, // дублікат Alex
      comments: [],
    },
  ],
};
```

Пояснюємо на аналогії з таблицями SQL: замість вкладеності — id як зовнішній ключ.

Показати аналогію в Dbeaver

// ✅ Нормалізований стан

```js
const state = {
  posts: {
    byId: {
      1: { id: 1, title: "Redux is fun", author: 1, comments: [1, 2] },
      2: { id: 2, title: "State management", author: 1, comments: [] },
    },
    allIds: [1, 2],
  },
  users: {
    byId: {
      1: { id: 1, name: "Alex" },
      2: { id: 2, name: "Kate" },
    },
    allIds: [1, 2],
  },
  comments: {
    byId: {
      1: { id: 1, text: "Nice!", author: 2 },
      2: { id: 2, text: "Agree", author: 1 },
    },
    allIds: [1, 2],
  },
};
```

Ми зберігаємо кожну сутність рівно один раз, а посилаємось на неї по id — так само, як таблиця posts посилається на users через author_id

Плюси такого підходу

- оновлення O(1) — знайшов по ключу, а не пройшовся циклом по масиву;
- немає розсинхрону даних;
- ре-рендериться тільки те, що дійсно змінилось.

```js
// Ручна нормалізація через createSlice — робочий, але багатослівний варіант
  initialState: {
    isLoading: false,
    isError: null,
    byId: {},
    allIds: [],
    items: [],
  },
```

```js
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.byId = {};
        state.allIds = [];
        action.payload.forEach((user) => {
          state.byId[user.id] = user;
          state.allIds.push(user.id);
        });
      })
      .addCase(fetchToggleStatus.fulfilled, (state, action) => {
        const user = action.payload;

        if (!state.byId[user.id]) {
          state.allIds.push(user.id);
        }
        state.byId[user.id] = user;
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.byId[user.id] = user;
        state.allIds.push(user.id);
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        const userId = action.payload.id;
        delete state.byId[userId];
        state.allIds = state.allIds.filter((id) => id !== userId);
      });

export const selectAllIdsUsers = (state) =>
  state.users.allIds.map((id) => state.users.byId[id]);

export const selectUsersById = (state, id) => state.users.byId[id];
```

```js
use if diff then id

  selectId: (user) => {
    console.log(user);
    return user.userId;
  },
```

```js
const usersAdapter = createEntityAdapter({
  // selectId: (user) => {
  //   console.log(user);
  //   return user.id;
  // },
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});
```

```js
initialState: usersAdapter.getInitialState({
  isLoading: false,
  isError: null,
  items: [],
});
```

```js
  .addCase(fetchUsers.fulfilled, (state, action) => {
  usersAdapter.setAll(state, action.payload);
  })

```

```js
   .addCase(fetchCreateUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      });
```

```js
 .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        usersAdapter.removeOne(state, action.payload.id);
      })
```

```js
      .addCase(fetchToggleStatus.fulfilled, (state, action) => {
        console.log(action.payload);
        usersAdapter.upsertOne(state, action.payload);
      });


      export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
```

```js
export const selectAdapterVisibleItems = createSelector(
  [selectAllUsers, selectFilters],
  (users, filters) => {
    return {
      users: users.filter((user) =>
        user.name.toLowerCase().includes(filters.toLowerCase()),
      ),
      filters,
    };
  },
);
```

upsert() => put

updateOne() => patch

updateOne очікує { id, changes } — тобто частковий об'єкт змін, і вимагає, щоб запис з таким id вже існував у store. Якщо його там нема — RTK тихо нічого не зробить (no-op), без помилки, без попередження. Знайти таку помилку потім — той ще квест.

upsertOne очікує повний об'єкт сутності (весь user, а не тільки { completed }) і сам вирішує:

якщо запис з таким id вже є в store → update (як updateOne, але замінює/мерджить весь об'єкт);
якщо запису нема → insert (додає новий).

Тут action.payload — це те, що реально повернув бекенд (response.data), а не той шматок, який ти сам вигадав на клієнті. Сервер може повернути більше, ніж просто completed — наприклад, він міг оновити updatedAt, перерахувати якісь похідні поля, застосувати серверну валідацію тощо. upsertOne бере цей повний об'єкт як джерело правди і кладе його в store як є.

Якби тут стояв updateOne, довелось би вручну обгортати:

```js
usersAdapter.updateOne(state, {
  id: action.payload.id,
  changes: action.payload,
});
```

що технічно теж працює, але зайвий boilerplate, коли upsertOne робить це за тебе одним викликом.
