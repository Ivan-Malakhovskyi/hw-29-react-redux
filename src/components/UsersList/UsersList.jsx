import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  selectIsLoading,
  selectIsError,
  selectVisibleAdapterUsers,
} from "@/redux/users/selectors";
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
            <Link key={user.id} to={`/users/${user.id}`}>
              <UserListItem key={user.id} user={user} />
            </Link>
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
