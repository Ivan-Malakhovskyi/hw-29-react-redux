import { useAuthUser } from "./hooks/useAuthUser";
import { Navigate } from "react-router";

export const PrivateRoute = ({ component, navigateTo = "/" }) => {
  const { isRefresh, isLoggedIn } = useAuthUser();

  const shouldUserRedirect = !isLoggedIn && !isRefresh;

  return shouldUserRedirect ? <Navigate to={navigateTo} /> : component;
};
