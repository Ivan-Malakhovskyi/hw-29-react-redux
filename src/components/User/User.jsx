import css from "./User.module.css";

export const User = ({ id, name, email, avatar, role }) => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>
        Username: <b>{name}</b>
      </p>
      <p className={css.text}>
        User email: <b>{email}</b>
      </p>
      <img src={avatar} alt={name} width={200} height={200} />
      Role <b>{role}</b>
    </div>
  );
};
