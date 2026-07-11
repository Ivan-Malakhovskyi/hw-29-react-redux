// import { useDispatch, useSelector } from "react-redux";

const UsersList = () => {
  // const users = useSelector((state) => state.users.items);
  // const dispatch = useDispatch();

  return (
    []?.length > 0 && (
      <ul>
        {[].map(({ id, name, gender, avatar }) => (
          <li key={id}>
            <h2>{name}</h2>
            <p>{gender}</p>
            <img src={avatar} alt="user_img" width={300} height={300} />
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
