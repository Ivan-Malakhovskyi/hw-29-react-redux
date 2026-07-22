export const UserListItem = ({ id, gender, phone, name }) => {
  const handleDelete = () => {};

  return (
    <li key={id}>
      <h2>{name}</h2>
      <p>{gender}</p>
      <p>{phone}</p>
      <button type="button" onClick={handleDelete}>
        Delete user
      </button>
    </li>
  );
};
