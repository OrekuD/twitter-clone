import React from "react";
import { useAppContext } from "../../context/context";
import "./CreatePost.scss";
import { useCreatePostMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Info } from "../../Svgs";
import { PROFILE_IMAGES_BASE_URL } from "../../constants";

const schema = Yup.object().shape({
  twoot: Yup.string()
    .min(2, "Twoot must exceed 2 characters")
    .max(140, "Twoot cannot exceed 140 characters")
    .required(""),
});

const CreatePost = () => {
  const {
    userDetails: { image },
  } = useAppContext();
  const [, createPost] = useCreatePostMutation();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values: { twoot },
  } = useFormik({
    initialValues: { twoot: "88" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      if (values.twoot.split("").length === 0) {
        setFieldError("twoot", "Twoot must exceed 2 characters");
        return;
      }
      await createPost({
        content: values.twoot,
      });
      resetForm();
    },
  });

  return (
    <div className="create-post">
      {image && (
        <img
          src={`${PROFILE_IMAGES_BASE_URL + image}`}
          alt="profile"
          className="profile-image"
        />
      )}
      <form onSubmit={handleSubmit} className="form">
        <textarea
          placeholder="Say something..."
          className="text-input"
          draggable={false}
          value={twoot}
          onChange={handleChange("twoot")}
          onBlur={handleBlur("twoot")}
          style={{ color: errors.twoot && touched.twoot ? "#b00020" : "black" }}
        />
        {errors.twoot && touched.twoot && (
          <div className="error">
            <Info size={14} color="red" />
            <p className="error-label">{errors.twoot}</p>
          </div>
        )}
        <button className="ripple-btn" type="submit">
          Twoot
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
