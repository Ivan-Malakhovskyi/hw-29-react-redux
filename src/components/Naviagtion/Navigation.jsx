import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignOutUser } from "@/redux/auth/authOperations";
import { selectIsError, selectIsLoading } from "@/redux/auth/authSelectors";
import { useAuthUser } from "../hooks/useAuthUser";
import { Spinner } from "../shared/Spinner";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const { isLoggedIn, user } = useAuthUser();

  return (
    <nav className={styles.nav}>
      {isLoading && !isError && <Spinner width={16} height={16} />}
      {!isLoggedIn && !isLoading ? (
        <>
          <NavLink to="/signin">SignIn</NavLink>
          <NavLink to="/signup">SignUp</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
        </>
      ) : (
        !isLoading && (
          <>
            <p>Welcome {user.name || "user"} </p>
            <button type="button" onClick={() => dispatch(fetchSignOutUser())}>
              SignOut
            </button>
          </>
        )
      )}
    </nav>
  );
};
