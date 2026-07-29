import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/users/operations";
import { selectIsError } from "@/redux/users/selectors";
import { CreateUserForm } from "./CreateUserForm";

export const User = () => {
  const dispatch = useDispatch();

  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section>
      <h1>Users App </h1>

      <CreateUserForm />

      {isError && <h2>ooops 😢</h2>}
    </section>
  );
};
