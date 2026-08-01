import { useDispatch } from "react-redux";
import { clearAuthHeader } from "@/redux/auth/authOperations";
import { logOut } from "@/redux/auth/authSlice";
import { useAuth } from "@/hooks";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = () => {
    dispatch(logOut());
    clearAuthHeader();
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user?.name}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
