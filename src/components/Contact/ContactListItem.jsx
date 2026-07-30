import { useDispatch } from "react-redux";
import {
  fetchDeleteContact,
  fetchToggleStatus,
} from "@/redux/contacts/contactsOperations";
import baseFormStyles from "../styles/Form.module.css";

export const ContactListItem = ({ user }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(fetchDeleteContact(user.id));
  const handleToggle = () => dispatch(fetchToggleStatus(user));

  return (
    <li key={user.id}>
      <input
        type="checkbox"
        checked={user.status}
        name="status"
        onChange={handleToggle}
        className={baseFormStyles.input}
      />
      <h2>{user.name}</h2>
      <p>{user.ender}</p>
      <p>{user.phone}</p>
      <button
        type="button"
        onClick={handleDelete}
        className={baseFormStyles.button}
      >
        Delete user
      </button>
    </li>
  );
};
