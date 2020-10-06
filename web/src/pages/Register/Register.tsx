import React from "react";
import { useCreateAccountMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { convertError } from "../../utils/convertError";
import { useAppContext } from "../../context/context";
import { Info } from "../../Svgs";

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(20, "Username is too long")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .max(20, "Password is too long")
    .required("Password is required"),
});

const Register = () => {
  const { setIsLoggedIn, setUserDetails } = useAppContext();
  const [, createAccount] = useCreateAccountMutation();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (values, { setErrors }) => {
        const res = await createAccount({
          email: values.email!,
          password: values.password,
          username: values.username,
        });

        if (res.data?.createAccount.error) {
          setErrors(convertError(res.data?.createAccount.error));
        } else if (res.data?.createAccount.user) {
          const {
            username,
            bio,
            location,
            image,
            fullname,
            email,
          } = res.data?.createAccount.user;
          setUserDetails({
            username,
            bio,
            location,
            image,
            fullname,
            email,
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
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.username}</p>
                </div>
              )}
            </div>
          </div>

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
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.email}</p>
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
            <button className="ripple-btn" type="submit">
              Submit
            </button>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
