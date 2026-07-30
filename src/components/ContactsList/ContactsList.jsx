import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsError,
} from "@/redux/contacts/contactsSelectors";
import { selectVisibleAdapterUsers } from "@/redux/contacts/contactsSlice";
import { ContactListItem } from "../Contact";
import { Spinner } from "../shared/Spinner";
import styles from "./ContactList.module.css";

export const ContactsList = () => {
  const { contacts, filters } = useSelector(selectVisibleAdapterUsers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const isContactsEmpty = contacts?.length === 0;

  return (
    <>
      {isLoading && !isError ? (
        <Spinner />
      ) : (
        !isContactsEmpty && (
          <ul className={styles.users_list}>
            {contacts.map((user) => (
              <ContactListItem key={user.id} user={user} />
            ))}
          </ul>
        )
      )}

      {isContactsEmpty && !isLoading && <h3>Contacts empty</h3>}

      {isContactsEmpty && !isLoading && !filters && (
        <p>No one contact detected</p>
      )}

      {isContactsEmpty && filters.length > 0 && (
        <p>
          Contact with name <b>{filters}</b> was not found
        </p>
      )}
    </>
  );
};
