import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { selectIsLoading } from "@/redux/users/selectors";
import { fetchCreateUser } from "@/redux/users/operations";
import baseFormStyles from "../styles/Form.module.css";

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid format")
    .required("Phone required"),
});

export const CreateUserForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { resetForm }) => {
    if (!values) {
      toast.error("Введіть дані");
      return;
    }

    dispatch(fetchCreateUser(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        gender: "man",
        status: false,
      }}
      onSubmit={handleSubmit}
      validationSchema={addUserSchema}
    >
      <Form className={baseFormStyles.form}>
        <h2 className={baseFormStyles.title}>Create User</h2>

        <label htmlFor="name" className={baseFormStyles.label}>
          Name
          <Field name="name" type="text" className={baseFormStyles.input} />
          <ErrorMessage
            className={baseFormStyles.error}
            name="name"
            component="div"
          />
        </label>
        <label htmlFor="phone" className={baseFormStyles.label}>
          Phone
          <Field name="phone" type="tel" className={baseFormStyles.input} />
          <ErrorMessage
            className={baseFormStyles.error}
            name="phone"
            component="div"
          />
        </label>

        <label htmlFor="gender" className={baseFormStyles.label}>
          Gender
          <Field as="select" name="gender" className={baseFormStyles.input}>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </Field>
        </label>

        <label htmlFor="status" className={baseFormStyles.label}>
          Status
          <input
            type="checkbox"
            name="status"
            className={baseFormStyles.input}
          />
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className={baseFormStyles.button}
        >
          Create
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
};
