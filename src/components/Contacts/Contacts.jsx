import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "@/redux/contacts/contactsOperations";
import { selectIsError } from "@/redux/contacts/contactsSelectors";
import { CreateContactForm } from "./CreateContactForm";
import styles from "./Contacts.module.css";
import { Filter } from "../Filter";
import { ContactsList } from "../ContactsList";

export const Contacts = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <section className={styles.user_section}>
      <h1>Users App </h1>

      <CreateContactForm />

      <Filter />

      <ContactsList />

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};
