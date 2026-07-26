import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import baseFormStyles from "@/components/Form.module.css";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const addUserSchema = Yup.object().shape({});

export const UsersForm = () => {
  const handleSubmit = (values, { resetForm }) => {};

  return <></>;
};
