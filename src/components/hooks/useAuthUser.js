import {
  selectIsLoggedIn,
  selectIsRefresh,
  selectUser,
} from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";

export const useAuthUser = () => {
  const isUserLoggedIn = useSelector(selectIsLoggedIn);
  const isUserRefresh = useSelector(selectIsRefresh);
  const user = useSelector(selectUser);

  return {
    isUserLoggedIn,
    isUserRefresh,
    user,
  };
};
