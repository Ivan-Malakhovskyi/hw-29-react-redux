import { useSelector } from "react-redux";
import { User } from "../User/User";
import { selectAllUsers } from "@/redux/users/usersSelectors";
import css from "./UsersList.module.css";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);

  return (
    <ul className={css.list}>
      {users.map((user) => (
        <li key={user.id}>
          <User id={user.id} {...user} />
        </li>
      ))}
    </ul>
  );
};
