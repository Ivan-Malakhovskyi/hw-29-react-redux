import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { UsersList } from "@/components/UsersList/UsersList";
import { fetchAllUsers } from "@/redux/users/usersOperations";
import { selectLoading } from "@/redux/users/usersSelectors";

export default function Users() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div>{isLoading && "Request in progress..."}</div>
      <UsersList />
    </>
  );
}
