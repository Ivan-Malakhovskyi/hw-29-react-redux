import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import { fetchUserById } from "@/redux/contacts/contactsOperations";
import { selectIsError } from "@/redux/contacts/contactsSelectors";
import { Spinner } from "../shared/Spinner";

export const ContactDetails = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => selectUserById(state, userId));
  const isLoading = useSelector(selectIsError);
  const isError = useSelector(selectIsError);

  // useEffect(() => {
  //   dispatch(fetchUserById(userId));
  // }, [userId, dispatch]);

  return (
    <section>
      <h1>UserDetails </h1>

      {isLoading && !isError && <Spinner />}

      {/* {!isLoading && currentUser && !isError ? (
        <div>
          <p>{currentUser.name}</p>
          <p>{currentUser.phone}</p>
          <p>{currentUser.status ? "Active" : "Blocked"}</p>
          <p>{currentUser.Gender}</p>
        </div>
      ) : (
        "Contact with not found"
      )} */}
    </section>
  );
};
