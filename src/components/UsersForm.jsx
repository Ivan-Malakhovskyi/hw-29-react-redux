import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { fetchCreateUser } from "@/redux/users/usersOperations";
import styles from "@/components/UsersForm.module.css";
import { selectIsLoading } from "@/redux/users";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Invalid format")
    .required("Phone required"),
});

export const UsersForm = () => {
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
    <>
      <Formik
        initialValues={{
          name: "",
          gender: "",
          phone: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={addUserSchema}
      >
        <Form className={styles.form}>
          <h2 className={styles.title}>Create User</h2>

          <label htmlFor="name" className={styles.label}>
            Name
            <Field className={styles.input} name="name" type="text" />
            <ErrorMessage
              className={styles.error}
              name="name"
              component="div"
            />
          </label>
          <label htmlFor="phone" className={styles.label}>
            Phone
            <Field className={styles.input} name="phone" type="tel" />
            <ErrorMessage
              className={styles.error}
              name="phone"
              component="div"
            />
          </label>

          <label htmlFor="gender" className={styles.label}>
            Gender
            <Field className={styles.input} as="select" name="gender">
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </Field>
          </label>

          <button type="submit" className={styles.button} disabled={isLoading}>
            Create
          </button>
          <Toaster />
        </Form>
      </Formik>
    </>
  );
};
