import { useSelector } from "react-redux";
import { selectIsLoading, selectIsError } from "@/redux/users/selectors";
import { selectVisibleAdapterUsers } from "@/redux/users/usersSlice";
import { UserListItem } from "../User";
import { Spinner } from "../shared/Spinner";
import styles from "./UserList.module.css";

export const UsersList = () => {
  const { users, filters } = useSelector(selectVisibleAdapterUsers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const isUsersEmpty = users.length === 0;

  return (
    <>
      {isLoading && !isError ? (
        <Spinner />
      ) : (
        <ul className={styles.users_list}>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}

      {isUsersEmpty && !isLoading && !filters && <p>No one contact detected</p>}

      {isUsersEmpty && filters.length > 0 && (
        <p>
          Contact with name <b>{filters}</b> was not found
        </p>
      )}
    </>
  );
};
