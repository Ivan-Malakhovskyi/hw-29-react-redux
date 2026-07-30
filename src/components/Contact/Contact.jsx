import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "@/redux/contacts/contactsOperations";
import { selectIsError } from "@/redux/contacts/contactsSelectors";
import { CreateContactForm } from "./CreateContactForm";

export const Contact = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <section>
      <h1>Users App </h1>

      <CreateContactForm />

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};
