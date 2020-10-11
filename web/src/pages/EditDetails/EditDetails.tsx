import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppContext } from "../../context/context";
import { useAddUserDetailsMutation } from "../../generated/graphql";
import { convertError } from "../../utils/convertError";
import { Info } from "../../Svgs";
import "./EditDetails.scss";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username is too short")
    .max(20, "Username is too long")
    .required("Username is required"),
  email: Yup.string().email("Invalid email"),
  bio: Yup.string().max(150, "Bio cannot exceed 150 characters"),
  location: Yup.string().max(20, "Location cannot exceed 20 characters"),
  fullname: Yup.string().max(50, "Fullname cannot exceed 50 characters"),
});

const EditDetails = () => {
  const { userDetails, addUserDetails } = useAppContext();
  const [, editDetails] = useAddUserDetailsMutation();

  const initialValues = {
    username: userDetails.username,
    email: userDetails.email,
    bio: userDetails.bio,
    location: userDetails.location,
    fullname: userDetails.fullname,
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values: { bio, email, fullname, location, username },
  } = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values, { setErrors }) => {
      const res = await editDetails({
        email: values.email,
        bio: values.bio,
        username: values.username,
        fullname: values.fullname,
        location: values.location,
      });

      if (res.data?.addUserDetails.error) {
        setErrors(convertError(res.data?.addUserDetails.error));
      } else if (res.data?.addUserDetails.user) {
        addUserDetails(res.data.addUserDetails.user);
      }
    },
  });

  return (
    <div className="edit-details">
      <div className="form-container">
        <p className="form-title">Edit Details</p>
        <form onSubmit={handleSubmit}>
          <div className="group">
            <label htmlFor="username">Username</label>
            <div className="input">
              <input
                value={username}
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
            <label htmlFor="fullname">Fullname</label>
            <div className="input">
              <input
                value={fullname}
                name="fullname"
                onChange={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
              />
              {errors.fullname && touched.fullname && (
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.fullname}</p>
                </div>
              )}
            </div>
          </div>
          <div className="group">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input
                value={email}
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
            <label htmlFor="location">Location</label>
            <div className="input">
              <input
                value={location}
                name="location"
                onChange={handleChange("location")}
                onBlur={handleBlur("location")}
              />
              {errors.location && touched.location && (
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.location}</p>
                </div>
              )}
            </div>
          </div>
          <div className="group">
            <label htmlFor="bio">Bio</label>
            <div className="input">
              <textarea
                value={bio}
                name="bio"
                onChange={handleChange("bio")}
                onBlur={handleBlur("bio")}
              />
              {errors.bio && touched.bio && (
                <div className="error">
                  <Info size={14} color="red" />
                  <p className="error-label">{errors.bio}</p>
                </div>
              )}
            </div>
          </div>
          <div className="bottom-section">
            <button className="ripple-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetails;
