import React from "react";
import { useLoginMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { reshapeError } from "../../utils/reshapeError";
import { Info, Logo } from "../../Svgs";

const LogInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [, login] = useLoginMutation();
  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: LogInSchema,
    isInitialValid: false,
    onSubmit: async (values, { setErrors }) => {
      const res = await login({
        password: values.password,
        username: values.username,
      });

      if (res.data?.login.error) {
        setErrors(reshapeError(res.data?.login.error));
      } else if (res.data?.login.user) {
        history.push("/home");
      }
    },
  });

  // return (
  //   <div style={{ backgroundColor: "white", height: "100vh" }}>
  //     <h1>U</h1>
  //   </div>
  // );

  return (
    <div className="form-container">
      <div className="logo">
        <Logo size={50} color="#fff" />
      </div>
      <p className="form-title">Log in to Twitter</p>
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
          disabled={isSubmitting || !isValid}
        >
          Log in
        </button>
      </form>
      <p className="link">
        <Link to="/register">Sign up for Twitter</Link>
      </p>
    </div>
  );
};

export default Login;
