import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { useAuthUser } from "../hooks/useAuthUser";
import styles from "./AppBar.module.css";
import { fetchSignOutUser } from "@/redux/auth/authOperations";

export const AppBar = () => {
  const dispatch = useDispatch();
  const { user } = useAuthUser();

  const handleSignOut = () => {
    dispatch(fetchSignOutUser());
  };

  return (
    <>
      <NavLink to="/contacts">Contacts</NavLink>
      <p>
        Welcome <b>{user.name || "user"}</b>{" "}
      </p>
      <button type="button" onClick={handleSignOut} className={styles.button}>
        SignOut
      </button>
    </>
  );
};
