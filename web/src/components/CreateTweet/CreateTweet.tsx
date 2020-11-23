import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import "./CreateTweet.scss";
import { useCreateTweetMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import Textarea from "react-textarea-autosize";
import { Cancel, ImageIcon } from "../../Svgs";
import { blue } from "../../constants/colors";

const schema = Yup.object().shape({
  tweet: Yup.string()
    .min(1, "Tweet must exceed 1 character")
    .max(140, "Tweet cannot exceed 280 characters")
    .required(),
});

const CreateTweet = () => {
  const { userDetails, setCurrentModal } = useAppContext();
  const [, createTweet] = useCreateTweetMutation();
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    initialErrors: { tweet: "Tweet must exceed 1 character" },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      await createTweet({
        content: values.tweet,
        image,
      });
      setIsSubmitting(false);
      resetForm();
      setImage(null);
      setTimeout(() => {
        setCurrentModal(null);
      }, 200);
    },
  });

  return (
    <div className="create-tweet">
      {userDetails?.profileImage && (
        <img
          src={`${PROFILE_IMAGES_BASE_URL + userDetails?.profileImage}`}
          alt="profile"
          className="profile-image"
        />
      )}
      <form onSubmit={handleSubmit} className="form">
        <Textarea
          placeholder="What's happening?"
          className="create-tweet-textarea"
          type="text"
          value={tweet}
          onChange={handleChange("tweet")}
          onBlur={handleBlur("tweet")}
          style={{
            color: errors.tweet && touched.tweet ? "#b00020" : "#ffffff",
          }}
        />
        {image && (
          <div className="upload-image">
            {!isSubmitting && (
              <button
                onClick={() => setImage(null)}
                className="icon-wrapper delete-image"
              >
                <Cancel size={22} color="white" />
              </button>
            )}
            <img
              src={URL.createObjectURL(image)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: isSubmitting ? 0.5 : 1,
              }}
              alt="tweet-image"
            />
          </div>
        )}
        {isSubmitting ? (
          <div style={{ height: 20 }} />
        ) : (
          <div className="options">
            <div className="icon-wrapper upload-image-icon">
              <label htmlFor="tweet-image">
                <ImageIcon size={24} color={blue} />
              </label>
              <input
                accept="image/*"
                type="file"
                id="tweet-image"
                onChange={async (e) => {
                  setImage(e.target.files![0] as any);
                }}
              />
            </div>
            <button
              className="ripple-btn"
              type="submit"
              disabled={!!errors.tweet}
            >
              Tweet
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTweet;
