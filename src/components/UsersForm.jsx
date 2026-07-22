import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { selectIsLoading } from "@/redux/selectors";
import { fetchCreateUser } from "@/redux/operations";
import baseFormStyles from "@/components/Form.module.css";

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
          phone: "",
          gender: "man",
        }}
        onSubmit={handleSubmit}
        validationSchema={addUserSchema}
      >
        <Form className={baseFormStyles.form}>
          <h2 className={baseFormStyles.title}>Create User</h2>

          <label htmlFor="name" className={baseFormStyles.label}>
            Name
            <Field className={baseFormStyles.input} name="name" type="text" />
            <ErrorMessage
              className={baseFormStyles.error}
              name="name"
              component="div"
            />
          </label>
          <label htmlFor="phone" className={baseFormStyles.label}>
            Phone
            <Field className={baseFormStyles.input} name="phone" type="tel" />
            <ErrorMessage
              className={baseFormStyles.error}
              name="phone"
              component="div"
            />
          </label>

          <label htmlFor="gender" className={baseFormStyles.label}>
            Gender
            <Field className={baseFormStyles.input} as="select" name="gender">
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </Field>
          </label>

          <button
            type="submit"
            className={baseFormStyles.button}
            disabled={isLoading}
          >
            Create
          </button>
          <Toaster />
        </Form>
      </Formik>
    </>
  );
};
