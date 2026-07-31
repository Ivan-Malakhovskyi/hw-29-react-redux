import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { selectIsError, selectIsLoading } from "@/redux/auth/authSelectors";
import { useAuthUser } from "../hooks/useAuthUser";
import { Spinner } from "../shared/Spinner";
import { AppBar } from "../AppBar";
import { AuthNav } from "../AuthNav";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const { isLoggedIn } = useAuthUser();

  return (
    <nav className={styles.nav}>
      {isLoading && !isError ? (
        <Spinner width={20} height={20} />
      ) : (
        <div className={styles.wrapper}>
          <NavLink to="/">Home</NavLink>
          {!isLoggedIn ? <AuthNav /> : <AppBar />}
        </div>
      )}
    </nav>
  );
};
