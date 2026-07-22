import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsError,
  selectVisibleUsers,
} from "@/redux/selectors";
import styles from "./UserList.module.css";
import { UserListItem } from "./UserListItem";
import { Spinner } from "./Spinner";

export const UsersList = () => {
  const { users, filters } = useSelector(selectVisibleUsers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  return (
    <>
      <ul className={styles.user_list}>
        {users.map((user) => (
          <UserListItem key={user.id} {...user} />
        ))}
      </ul>

      {users.length === 0 && !isLoading && <p>No one contact detected</p>}

      {users.length === 0 && (
        <p>
          Contact with name <b>{filters}</b> was not found
        </p>
      )}

      {isLoading && !isError && <Spinner />}
    </>
  );
};
