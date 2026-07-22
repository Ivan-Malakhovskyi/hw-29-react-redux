Для отримання шматків стану в redux використовується useSelector(), який приймає cb де в першому параметрі буде стан. Тому ми можемо винести ці функції в окремі файли і викликати в селекторах, де це потрібно, щоб наш компонент не знав про форму стану. Один секлектор може використовуватись в багатьох компонентах. А якщо цих функцій не має, тоді потрібно правити всі файли, де є useSelector(),а не одне місце

export const selectUser = (state) => state.user.user; - простий селектор

Є також складені селектори, які беруть декілька селекторів і повертають інший стан за який відповідають дані селектори, наприклад обчислення якісь

1.TaskList

В селекторах обчислюється лише redux стан

Пропси, стан - це не робота селектора. Це робота компонента

TaskCounter

Оптимізація

Є проблема

Як працюють селектори? Коли змінюється стан => викликається селектор
наші складні селектори залежать від певних кусків стану, але в нас є й інші властивості стану, і коли буде змінюватись інший кусок стану над яким не працює селектор, то він буде всеодно викликатися

console.log() в selectVisibleTasks

1.4 selectVisibleTasks викликався при монтуванні

2 рази ок, бо спочатку був пустий масив, а потім прийшли дані, і компонент перемалювався, але звідки ще 2
redux devtools

У нас стан виглядає так

tasks: { items(pin): isLoading(pin):true error(pin):null }

Що відьувається при http request

isLoading = true = pending

isLoading = false = fullfilled item = [todos]

isError - null

Викликається selectVisibleTasks, тому що useSelector не знає, що конкретно змінилось

Змінюємо статус - скільки раз викликається

selectTaskCount

console.log("selectTaskCount". Date.now())

Від чого залежить taskCount - від кількості tasks, але викликається навіть при зміні фільтрів

Тому що всі селектори викликаються, коли змінюється redux стан

Коли викликаються прості селектори - не проблема, вони нічого не обчислюють, вони повертають посилання на ті ж самі об'єкти і реакт нічого не перерендрює, а складні селектори, роблять map, filter, reduce, повертають нові об'єкти, масиви

Оптимізація(мемоізація) селекторів

Як працює мемоізація

func(a, b) { return a + b
}

func.cache = {}

func(1,2)
Що відбувається при виклику, перед тим як виконувати тіло, воно іде в кеш і дивиться чи вже був виклик з такими аргументами

Ні - виконує тіло, і в кеш кладе
Так, тіло функції не виконується, береться результат з кешу і повертає старий кеш
{"1,2": 3} - кеш

func(2, 5)
{"2, 5": 7}

func(2, 5) => 7

{"2, 5": 7}

func(tasks, filters) {
return a + b }

тільки коли змінюється tasks або filters - викликайся

Для мемоізації використовується вбудована функція createSelector

Масив залежностей
Функція, яка буде мемозована
Принцип роботи як в useMemo

https://alexkondov.com/tao-of-react/

```js

    .addMatcher(
      isPending(fetchUsers, fetchCreateUser, fetchDeleteUser),
      (state) => {
        state.isLoading = true;
      },
)
```

```js
    .addMatcher(
      isRejected(fetchCreateUser, fetchDeleteUser, fetchUsers),
      (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      },
    )
    .addMatcher(
      isFulfilled(fetchCreateUser, fetchUsers, fetchDeleteUser),
      (state) => {
        state.isLoading = false;
        state.isError = null;
      },
    )
```

```js
export const isPendingAction = (action) => action.type.endsWith("/pending");
export const isFulfilledAction = (action) => action.type.endsWith("/fulfilled");
export const isRejectedAction = (action) => action.type.endsWith("/rejected");

export const addGenericMatcher = (builder) => {
  builder
    .addMatcher(isPendingAction, (state) => {
      state.isLoading = true;
      state.isError = null;
    })
    .addMatcher(isFulfilledAction, (state) => {
      state.isLoading = false;
      state.isError = null;
    })
    .addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
};

addGenericMatcher(builder);
```
