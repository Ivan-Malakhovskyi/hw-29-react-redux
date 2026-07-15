import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/users";
import UsersList from "./UsersList";
import { UsersForm } from "./UsersForm";

const User = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.users.isLoading);
  const isError = useSelector((state) => state.users.isError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>User Data</h2>

      <UsersForm />

      {isLoading ? <div>Loading data...</div> : <UsersList />}

      {isError && <h2>ooops 😢</h2>}
    </div>
  );
};

export default User;
