import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { selectIsLoading } from "@/redux/contacts/contactsSelectors";
import { fetchCreateContact } from "@/redux/contacts/contactsOperations";
import baseFormStyles from "../styles/Form.module.css";

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(phoneRegex, "Invalid format")
    .required("Phone required"),
});

export const CreateContactForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, { resetForm }) => {
    if (!values) {
      toast.error("Введіть дані");
      return;
    }

    dispatch(fetchCreateContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
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
        <label htmlFor="number" className={baseFormStyles.label}>
          Number
          <Field name="number" type="tel" className={baseFormStyles.input} />
          <ErrorMessage
            className={baseFormStyles.error}
            name="number"
            component="div"
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
