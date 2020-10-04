import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Form.scss";
import { useCreateAccountMutation } from "../../generated/graphql";
import { useAppContext } from "../../context/context";
import { convertError } from "../../utils/convertError";

interface Props {
  signup?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  schema: {};
  initialValues: {
    username: string;
    email?: string;
    password: string;
  };
}



const Form = ({ onSubmit, signup, schema, initialValues }: Props) => {
  const { setIsLoggedIn, setUserDetails } = useAppContext();
  const [, createAccount] = useCreateAccountMutation();

  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: async (values, { setErrors }) => {
        const res = await createAccount({
          email: values.email!,
          password: values.password,
          username: values.username,
        });

        if (res.data?.createAccount.error) {
          setErrors(convertError(res.data?.createAccount.error));
        } else if (res.data?.createAccount.user) {
          setUserDetails({
            username: res.data.createAccount.user.username!,
            bio: res.data.createAccount.user.bio!,
            location: res.data.createAccount.user.location!,
            image: res.data.createAccount.user.image!,
            fullname: res.data.createAccount.user.fullname!,
            email: res.data.createAccount.user.email!,
          });
          setIsLoggedIn(true);
        }
      },
    }
  );

  return (
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
