import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/usersOperations";
import { getIsError } from "@/redux/selectors";
import UsersList from "./UsersList";
import { UsersForm } from "./UsersForm";
import { Filter } from "./Filter";

const User = () => {
  const dispatch = useDispatch();

  const isError = useSelector(getIsError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section>
      <UsersForm />

      <Filter />

      <UsersList />

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};

export default User;
