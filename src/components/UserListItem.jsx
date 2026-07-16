import { useDispatch } from "react-redux";
import { fetchDeleteUser } from "@/redux/users/usersOperations";

export const UserListItem = ({ id, gender, phone, name }) => {
  const dispatch = useDispatch();

  return (
    <li key={id}>
      <h2>{name}</h2>
      <p>{gender}</p>
      <p>{phone}</p>
      <button type="button" onClick={() => dispatch(fetchDeleteUser(id))}>
        Delete user
      </button>
    </li>
  );
};
