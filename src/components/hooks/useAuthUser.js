import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefresh,
  selectUser,
} from "@/redux/auth/authSelectors";

export const useAuthUser = () => {
  const isRefresh = useSelector(selectIsRefresh);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return {
    isRefresh,
    isLoggedIn,
    user,
  };
};
