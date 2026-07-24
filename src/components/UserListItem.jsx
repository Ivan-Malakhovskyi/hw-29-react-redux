import { useDispatch } from "react-redux";
import { fetchDeleteUser, fetchToggleStatus } from "@/redux/operations";

export const UserListItem = ({ user }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(fetchDeleteUser(user.id));
  const handleToggle = () => dispatch(fetchToggleStatus(user));

  return (
    <li key={user.id}>
      <input
        type="checkbox"
        checked={user.status}
        name="status"
        onChange={handleToggle}
      />
      <h2>{user.name}</h2>
      <p>{user.ender}</p>
      <p>{user.phone}</p>
      <button type="button" onClick={handleDelete}>
        Delete user
      </button>
    </li>
  );
};
