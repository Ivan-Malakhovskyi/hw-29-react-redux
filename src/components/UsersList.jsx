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
