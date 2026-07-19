import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { fetchCreateUser } from "@/redux/usersOperations";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Name is required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid format")
    .required("Phone is required"),
});

export const UsersForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    if (!values) {
      toast.error("Введіть дані про контакт");
      return;
    }

    dispatch(fetchCreateUser(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        gender: "Man",
        phone: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={addUserSchema}
    >
      <Form>
        <h2>Create User</h2>

        <label htmlFor="name">
          Name
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />
        </label>

        <label htmlFor="phone">
          Phone
          <Field name="phone" type="tel" />
          <ErrorMessage name="phone" component="div" />
        </label>

        <label htmlFor="gender">
          Gender
          <Field as="select" name="gender">
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </Field>
        </label>

        <button type="submit">Create</button>
      </Form>
    </Formik>
  );
};
