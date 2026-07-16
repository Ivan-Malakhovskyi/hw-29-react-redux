// import { useDispatch, useSelector } from "react-redux";

import { useSelector } from "react-redux";

const UsersList = () => {
  const users = useSelector((state) => state.users.items);
  // const dispatch = useDispatch();

  return (
    users?.length > 0 && (
      <ul>
        {users.map(({ id, name, gender, phone }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>{gender}</p>
            <p>{phone}</p>
            <button type="button" onClick={() => {}}>
              Delete user
            </button>
          </li>
        ))}
      </ul>
    )
  );
};

export default UsersList;
