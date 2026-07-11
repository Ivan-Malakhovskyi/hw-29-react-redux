import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const defaultAvatar =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

export const UsersForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name, gender, avatar = defaultAvatar } = values;

    // dispatch(addUser({ name, gender, avatar }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        gender: "",
        avatar: defaultAvatar,
      }}
      onSubmit={handleSubmit}
      validationSchema={addUserSchema}
    >
      <Form>
        <h2>Create User</h2>

        <Field name="name" type="text" />
        <ErrorMessage name="name" component="div" />
        {/* <Field name="avatar" />
        <ErrorMessage name="avatar" component="div" /> */}

        <Field as="select" name="gender">
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </Field>

        <button type="submit">Create</button>
      </Form>
    </Formik>
  );
};
