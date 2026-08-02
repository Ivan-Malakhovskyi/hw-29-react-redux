import { Navigate } from "react-router";
import { useAuthUser } from "./hooks/useAuthUser";

export const RestrictedRoute = ({ component, navigateTo = "/" }) => {
  const { isLoggedIn } = useAuthUser();

  return isLoggedIn ? <Navigate to={navigateTo} /> : component;
};
