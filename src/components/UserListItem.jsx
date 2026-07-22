import { fetchDeleteUser } from "@/redux/operations";
import { useDispatch } from "react-redux";

export const UserListItem = ({ id, gender, phone, name }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(fetchDeleteUser(id));

  return (
    <li key={id}>
      <h2>{name}</h2>
      <p>{gender}</p>
      <p>{phone}</p>
      <button type="button" onClick={handleDelete}>
        Delete user
      </button>
    </li>
  );
};
