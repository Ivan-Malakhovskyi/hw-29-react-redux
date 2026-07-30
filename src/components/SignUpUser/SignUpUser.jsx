import { fetchSignupUser } from "@/redux/auth/authOperations";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router";
import styles from "../styles/Form.module.css";
import sectionStyles from "../styles/Section.module.css";

export const SignUpUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    dispatch(fetchSignupUser(values));
    // navigate("/signin");
    resetForm();
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
            <Field name="password" className={styles.input} />
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
