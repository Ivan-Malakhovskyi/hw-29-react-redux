import { Field, Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router";
import * as Yup from "yup";
import { emailRegex } from "@/validationRegex";
import styles from "../styles/Form.module.css";
import sectionStyles from "../styles/Section.module.css";
import { useDispatch } from "react-redux";
import { fetchSignupUser } from "@/redux/auth/authOperations";

const signupUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too short")
    .max(40, "Too long")
    .required("Required"),
  email: Yup.string().matches(emailRegex, "Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").max(20, "Too long").required(),
});

export const SignUpUser = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(fetchSignupUser(values));
    // resetForm()
  };

  return (
    <section className={sectionStyles.section}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={signupUserSchema}
      >
        <Form autoComplete="false" className={styles.form}>
          <label htmlFor="name" className={styles.label}>
            Name
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage name="name" component="p" className={styles.error} />
          </label>
          <label htmlFor="email" className={styles.label}>
            Email
            <Field name="email" type="email" className={styles.input} />
            <ErrorMessage name="email" component="p" className={styles.error} />
          </label>
          <label htmlFor="password" className={styles.label}>
            Password
            <Field name="password" className={styles.input} type="password" />
            <ErrorMessage
              name="password"
              component="p"
              className={styles.error}
            />
          </label>
          <button type="submit" className={styles.button}>
            SignUp
          </button>
        </Form>
      </Formik>
      <Link to="/signin">Already have an account ?</Link>
    </section>
  );
};
