import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/users/operations";
import { selectIsError } from "@/redux/users/selectors";
import { CreateUserForm } from "./CreateUserForm";
import styles from "./User.module.css";
import { Filter } from "../Filter";
import { UsersList } from "../UsersList";

export const User = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section className={styles.user_section}>
      <h1>Users App </h1>

      <CreateUserForm />

      <Filter />

      <UsersList />

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};
