import { Filter } from "../Filter";
import { ContactsList } from "../ContactsList";
import styles from "./ContactSection.module.css";

export const ContactSection = () => {
  return (
    <section className={styles.users_section}>
      <Filter />
      <ContactsList />
    </section>
  );
};
