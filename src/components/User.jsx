import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectIsError } from "@/redux/users";
import UsersList from "./UsersList";
import { UsersForm } from "./UsersForm";

const User = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section>
      <UsersForm />

      <h2>User Data</h2>

      <UsersList />

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};

export default User;
