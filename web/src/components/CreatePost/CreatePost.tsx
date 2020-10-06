import React from "react";
// import { useAppContext } from "../../context/context";
import "./CreatePost.scss";
import Image from "../../assets/images/dummy.jpg";
import { useCreatePostMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Info } from "../../Svgs";

const schema = Yup.object().shape({
  twoot: Yup.string()
    .max(140, "Twoot cannot exceed 140 characters")
    .required(""),
});

const CreatePost = () => {
  // const {} = useAppContext();
  const [, createPost] = useCreatePostMutation();

  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues: { twoot: "" },
      validationSchema: schema,
      onSubmit: async (values, { setFieldError }) => {
        const res = await createPost({
          content: values.twoot,
        });
        if (res.data?.createPost.error) {
          setFieldError("touched", res.data.createPost.error.message);
        }
      },
    }
  );

  return (
    <div className="create-post">
      <img src={Image} alt="profile" className="profile-image" />
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Say something..."
          className="text-input"
          onChange={handleChange("twoot")}
          onBlur={handleBlur("twoot")}
          style={{ color: errors.twoot && touched.twoot ? "red" : "black" }}
        />
        {errors.twoot && touched.twoot && (
          <div className="error">
            <Info size={14} color="red" />
            <p className="error-label">{errors.twoot}</p>
          </div>
        )}
        <button
          className="ripple-btn"
          type="submit"
          style={{ opacity: errors.twoot ? "0.5" : "1" }}
          disabled={!!errors.twoot}
        >
          Twoot
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
