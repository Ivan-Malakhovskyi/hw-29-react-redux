import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/redux/selectors";
import { fetchDeleteUser } from "@/redux/usersOperations";

const UsersList = () => {
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

  const handleDelete = (userId) => {
    dispatch(fetchDeleteUser(userId));
  };

  return (
    users?.length > 0 && (
      <ul>
        {users.map(({ id, name, gender, phone }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>{gender}</p>
            <p>{phone}</p>
            <button type="button" onClick={() => handleDelete(id)}>
              Delete user
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export default UsersList;
