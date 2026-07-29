import { Filter } from "../Filter";
import { UsersList } from "../UsersList";
import styles from "./UsersSection.module.css";

export const UsersSection = () => {
  return (
    <section className={styles.users_section}>
      <Filter />
      <UsersList />
    </section>
  );
};
