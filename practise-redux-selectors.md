1. Створити компонент фільтра

2. Створити редюсер filter

3. Оновити UserList

4. Створити складний селектор

5. Додати UX

```js
import { useDispatch, useSelector } from "react-redux";
import { getFIlter } from "@/redux/selectors";
import { changeValueFilter } from "@/redux/filtersSlice";
import styles from "./Form.module.css";
import filter from "./Filter.module.css";

export const Filter = () => {
  const filterValue = useSelector(getFIlter);
  const dispatch = useDispatch();
  const handleChange = (e) => dispatch(changeValueFilter(e.target.value));
  const handleRest = () => dispatch(changeValueFilter(""));

  return (
    <div>
      <h2 className={styles.title}>Filter</h2>

      <form className={filter.form}>
        <input
          className={styles.input}
          value={filterValue}
          onChange={handleChange}
          type="text"
          name="filter"
        />
        <button
          type="button"
          onClick={handleRest}
          className={filter.btnReset}
          disabled={!filterValue}
        >
          Reset filters
        </button>
      </form>
    </div>
  );
};
```

```js
   changeValueFilter(state, action) {
      return action.payload;
    },
```

```js
import { useSelector } from "react-redux";
import {
  getIsLoading,
  getIsError,
  getUsers,
  getFIlter,
} from "@/redux/selectors";
import styles from "./UserList.module.css";
import { UserListItem } from "./UserListItem";
import { Spinner } from "./Spinner";

const UsersList = () => {
  const users = useSelector(getUsers);
  const filter = useSelector(getFIlter);
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <ul className={styles.user_list}>
        {filteredUsers.map((user) => (
          <UserListItem key={user.id} {...user} />
        ))}
      </ul>

      {users.length === 0 && !isLoading && <p>No one contact detected</p>}

      {filteredUsers.length === 0 && (
        <p>
          Contact with name <b>{filter}</b> was not found
        </p>
      )}

      {isLoading && !isError && <Spinner />}
    </>
  );
};

export default UsersList;
```

```js
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { getIsLoading } from "@/redux/selectors";
import { fetchCreateUser } from "@/redux/operations";
import baseFormStyles from "@/components/Form.module.css";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid format")
    .required("Phone required"),
});

export const UsersForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const handleSubmit = (values, { resetForm }) => {
    if (!values) {
      toast.error("Введіть дані");
      return;
    }

    dispatch(fetchCreateUser(values));
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          gender: "",
          phone: "man",
        }}
        onSubmit={handleSubmit}
        validationSchema={addUserSchema}
      >
        <Form className={baseFormStyles.form}>
          <h2 className={baseFormStyles.title}>Create User</h2>

          <label htmlFor="name" className={baseFormStyles.label}>
            Name
            <Field className={baseFormStyles.input} name="name" type="text" />
            <ErrorMessage
              className={baseFormStyles.error}
              name="name"
              component="div"
            />
          </label>
          <label htmlFor="phone" className={baseFormStyles.label}>
            Phone
            <Field className={baseFormStyles.input} name="phone" type="tel" />
            <ErrorMessage
              className={baseFormStyles.error}
              name="phone"
              component="div"
            />
          </label>

          <label htmlFor="gender" className={baseFormStyles.label}>
            Gender
            <Field className={baseFormStyles.input} as="select" name="gender">
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </Field>
          </label>

          <button
            type="submit"
            className={baseFormStyles.button}
            disabled={isLoading}
          >
            Create
          </button>
          <Toaster />
        </Form>
      </Formik>
    </>
  );
};
```
