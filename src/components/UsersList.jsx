import { useSelector } from "react-redux";
import { selectUsers } from "@/redux/users/selectors";
import styles from "./UserList.module.css";
import { UserListItem } from "./UserListItem";

const UsersList = () => {
  const users = useSelector(selectUsers);

  return (
    <>
      {users?.length > 0 ? (
        <ul className={styles.user_list}>
          {users.map((user) => (
            <UserListItem key={user.id} {...user} />
          ))}
        </ul>
      ) : (
        <p>No one contact detected</p>
      )}
    </>
  );
};

export default UsersList;
