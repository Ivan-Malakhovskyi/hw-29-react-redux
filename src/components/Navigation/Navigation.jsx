import { NavLink } from "react-router";
import { useAuth } from "@/hooks";
import css from "./Navigation.module.css";

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.link} to="/users">
          Users
        </NavLink>
      )}
    </nav>
  );
};
