import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import styles from "../styles/Form.module.css";
import sectionStyles from "../styles/Section.module.css";
import * as Yup from "yup";
import { emailRegex } from "@/validationRegex";
import { fetchSigninUser } from "@/redux/auth/authOperations";

const signinUserSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, "Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").max(20, "Too long").required(),
});

export const SignInUser = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(fetchSigninUser(values));
    resetForm();
  };

  return (
    <section className={sectionStyles.section}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={signinUserSchema}
      >
        <Form autoComplete="false" className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            <Field name="email" type="email" className={styles.input} />
            <ErrorMessage name="email" component="p" className={styles.error} />
          </label>
          <label htmlFor="password" className={styles.label}>
            <Field name="password" type="password" className={styles.input} />
            <ErrorMessage
              name="password"
              component="p"
              className={styles.error}
            />
          </label>
          <button type="submit" className={styles.button}>
            SignIn
          </button>
        </Form>
      </Formik>

      <Link to="/signup">Do not have an account yet?</Link>
    </section>
  );
};
