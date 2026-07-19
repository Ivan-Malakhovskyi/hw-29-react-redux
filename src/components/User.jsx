import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/usersOperations";
import UsersList from "./UsersList";
import { UsersForm } from "./UsersForm";
import { getIsError, getIsLoading } from "@/redux/selectors";

const User = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section>
      <UsersForm />

      <h2>User Data</h2>

      {isLoading ? <div>Loading data...</div> : <UsersList />}

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};

export default User;
