import React from "react";
import { useLoginMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { convertError } from "../../utils/convertError";
import { useAppContext } from "../../context/context";

const LogInSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { setIsLoggedIn, setUserDetails, userDetails } = useAppContext();
  const [, login] = useLoginMutation();
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

        if (res.data?.login.error) {
          setErrors(convertError(res.data?.login.error));
        } else if (res.data?.login.user) {
          setUserDetails({
            username: res.data.login.user.username!,
            bio: res.data.login.user.bio!,
            location: res.data.login.user.location!,
            image: res.data.login.user.image!,
            fullname: res.data.login.user.fullname!,
            email: res.data.login.user.email!,
          });
          setIsLoggedIn(true);
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
                <p className="error-label">{errors.username}</p>
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
                <p className="error-label">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="bottom-section">
            <button className="ripple" type="button">
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
