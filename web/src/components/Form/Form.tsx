import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.scss";
import { useCreateAccountMutation } from "../../generated/graphql";

interface Props {
  signup?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LogInSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(12, "Username is too long")
    .required(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .max(12, "Password is too long")
    .required(),
});

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(12, "Username is too long")
    .required(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .max(12, "Password is too long")
    .required(),
});

const Form = ({ onSubmit, signup }: Props) => {
  // const [] = useCreateAccountMutation({});
  const initialValues = signup
    ? {
        username: "",
        email: "",
        password: "",
      }
    : {
        username: "",
        password: "",
      };
  const schema = signup ? SignUpSchema : LogInSchema;

  const {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      // addUserDetails({
      //   email: values.email,
      //   password: values.password,
      //   email: values.email,
      //   phone: user.phone,
      // });
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="group">
          <label htmlFor="username">Username</label>
          <div className="input">
            <input
              type="text"
              name="username"
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
            />
            {errors.username && touched.username && (
              <p className="error-label">{errors.username}</p>
            )}
          </div>
        </div>
        {signup && (
          <div className="group">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input
                type="text"
                name="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              {errors.email && touched.email && (
                <p className="error-label">{errors.email}</p>
              )}
            </div>
          </div>
        )}
        <div className="group">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input
              type="password"
              name="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {errors.password && touched.password && (
              <p className="error-label">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="bottom-section">
          <button className="ripple">{signup ? "Submit" : "Log in"}</button>
          {signup ? (
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="register">Create one</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
