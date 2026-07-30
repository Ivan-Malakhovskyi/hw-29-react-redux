import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
} from "@/redux/auth/authSelectors";

export const useAuthUser = () => {
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return {
    isLoading,
    isLoggedIn,
    user,
  };
};
