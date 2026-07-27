import { useSelector } from "react-redux";
import { selectIsLoading, selectIsError } from "@/redux/selectors";
import { selectVisibleAdapterUsers } from "@/redux/usersSlice";
import styles from "./UserList.module.css";
import { UserListItem } from "./UserListItem";
import { Spinner } from "./Spinner";

export const UsersList = () => {
  const { users, filters } = useSelector(selectVisibleAdapterUsers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const isUsersEmpty = users.length === 0;

  return (
    <>
      <ul className={styles.user_list}>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>

      {isUsersEmpty && !isLoading && !filters && <p>No one contact detected</p>}

      {isUsersEmpty && filters.length > 0 && (
        <p>
          Contact with name <b>{filters}</b> was not found
        </p>
      )}

      {isLoading && !isError && <Spinner />}
    </>
  );
};
