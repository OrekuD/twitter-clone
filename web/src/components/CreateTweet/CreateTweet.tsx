import React from "react";
import { useAppContext } from "../../context/context";
import "./CreateTweet.scss";
import { useCreateTweetMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";

const schema = Yup.object().shape({
  tweet: Yup.string()
    .min(1, "Tweet must exceed 1 character")
    .max(140, "Tweet cannot exceed 140 characters")
    .required(),
});

const CreateTweet = () => {
  const {
    userDetails: { image },
  } = useAppContext();
  const [, createTweet] = useCreateTweetMutation();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values: { tweet },
  } = useFormik({
    initialValues: { tweet: "" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      await createTweet({
        content: values.tweet,
      });
      resetForm();
    },
  });

  return (
    <div className="create-tweet">
      {image && (
        <img
          src={`${PROFILE_IMAGES_BASE_URL + image}`}
          alt="profile"
          className="profile-image"
        />
      )}
      <form onSubmit={handleSubmit} className="form">
        <textarea
          placeholder="What's happening?"
          className="textarea"
          draggable={false}
          value={tweet}
          onChange={handleChange("tweet")}
          onBlur={handleBlur("tweet")}
          style={{
            color: errors.tweet && touched.tweet ? "#b00020" : "#ffffff",
          }}
        />
        <button
          className="ripple-btn"
          type="submit"
          style={{ opacity: errors.tweet || !touched.tweet ? 0.5 : 1 }}
        >
          Tweet
        </button>
      </form>
    </div>
  );
};

export default CreateTweet;
