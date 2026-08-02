import { useDispatch } from "react-redux";
import { fetchDeleteContact } from "@/redux/contacts/contactsOperations";
import baseFormStyles from "../styles/Form.module.css";

export const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(fetchDeleteContact(contact.id));

  return (
    <li key={contact.id}>
      <h2>{contact.name}</h2>
      <p>{contact.number}</p>

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
