import React from "react";
import { useLoginMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { convertError } from "../../utils/convertError";
import { useAppContext } from "../../context/context";
import { Info } from "../../Svgs";

const LogInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { setIsLoggedIn, setUserDetails } = useAppContext();
  const [, login] = useLoginMutation();
  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  };

  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues,
      validationSchema: LogInSchema,
      onSubmit: async (values, { setErrors }) => {
        const res = await login({
          password: values.password,
          username: values.username,
        });
        console.log(res);

        if (res.data?.login.error) {
          setErrors(convertError(res.data?.login.error));
        } else if (res.data?.login.user) {
          const {
            username,
            bio,
            location,
            image,
            fullname,
            email,
          } = res.data?.login.user;
          setUserDetails({
            username,
            bio,
            location,
            image,
            fullname,
            email,
          });
          setIsLoggedIn(true);
          history.push("/");
        }
      },
    }
  );

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.username}</p>
                </div>
              )}
            </div>
          </div>
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
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.password}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bottom-section">
            <button className="ripple" type="submit">
              Log in
            </button>
            <p>
              Don't have an account? <Link to="register">Create one</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
