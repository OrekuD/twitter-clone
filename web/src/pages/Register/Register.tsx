import React from "react";
import { useCreateAccountMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { convertError } from "../../utils/convertError";
import { useAppContext } from "../../context/context";
import { Info, Logo } from "../../Svgs";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(20, "Username is too long")
    .required("Username is required"),
  fullname: Yup.string()
    .min(3, "Fullname is too short")
    .max(50, "Fullname is too long")
    .required("Fullname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .max(20, "Password is too long")
    .required("Password is required"),
});

const Register = () => {
  const { setIsLoggedIn } = useAppContext();
  const [, createAccount] = useCreateAccountMutation();
  const history = useHistory();
  const initialValues = {
    username: "",
    fullname: "",
    email: "",
    password: "",
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema: schema,
    isInitialValid: false,
    onSubmit: async (values, { setErrors }) => {
      const res = await createAccount({
        email: values.email!,
        password: values.password,
        username: values.username,
        fullname: values.fullname,
      });

      if (res.data?.createAccount.error) {
        setErrors(convertError(res.data?.createAccount.error));
      } else if (res.data?.createAccount.user) {
        setIsLoggedIn(true);
        history.push("/home");
      }
    },
  });

  return (
    <div className="form-container">
      <div className="logo">
        <Logo size={50} color="#fff" />
      </div>
      <p className="form-title">Sign up for Twitter</p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange("username")}
              onBlur={handleBlur("username")}
            />
          </div>
          {errors.username && touched.username && (
            <div className="error">
              <Info size={14} color="red" />
              <p className="error-label">{errors.username}</p>
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              name="fullname"
              onChange={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
            />
          </div>
          {errors.fullname && touched.fullname && (
            <div className="error">
              <Info size={14} color="red" />
              <p className="error-label">{errors.fullname}</p>
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
            />
          </div>
          {errors.email && touched.email && (
            <div className="error">
              <Info size={14} color="red" />
              <p className="error-label">{errors.email}</p>
            </div>
          )}
        </div>
        <div className="form-group">
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
            />
          </div>
          {errors.password && touched.password && (
            <div className="error">
              <Info size={14} color="red" />
              <p className="error-label">{errors.password}</p>
            </div>
          )}
        </div>
        <button
          className="ripple-btn"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Submit
        </button>
      </form>
      <p className="link">
        <Link to="/login">Log in to Twitter</Link>
      </p>
    </div>
  );
};

export default Register;
