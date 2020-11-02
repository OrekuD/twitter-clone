import React from "react";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { blue } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import Modal from "../Modal/Modal";
import { useCreateRetweetMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./CreateRetweet.scss";
import OriginalTweetCard from "../OriginalTweetCard/OriginalTweetCard";
import Textarea from "react-textarea-autosize";

const schema = Yup.object().shape({
  comment: Yup.string()
    .min(1, "Comment must exceed 1 character")
    .max(140, "Comment cannot exceed 140 characters")
    .required(),
});

const CreateRetweet = () => {
  const {
    selectedTweet,
    currentModal,
    setCurrentModal,
    userDetails,
  } = useAppContext();
  const [, createRetweet] = useCreateRetweetMutation();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values: { comment },
  } = useFormik({
    initialValues: { comment: "" },
    validationSchema: schema,
    initialErrors: { comment: "Comment must exceed 1 character" },
    onSubmit: async (values, { resetForm }) => {
      await createRetweet({
        content: values.comment,
        tweetId: selectedTweet?._id!,
      });
      resetForm();
      setTimeout(() => {
        setCurrentModal(null);
      }, 200);
    },
  });

  if (!selectedTweet) {
    return null;
  }

  return (
    <Modal
      isVisible={currentModal === "RETWEET"}
      onClose={() => setCurrentModal(null)}
    >
      <div className="create-retweet">
        <div className="modal-header">
          <button
            className="icon-wrapper"
            onClick={() => setCurrentModal(null)}
          >
            <Cancel size={24} color={blue} />
          </button>
        </div>
        <div className="retweet-content">
          <div className="reply">
            <img
              src={`${PROFILE_IMAGES_BASE_URL + userDetails?.profileImage}`}
              alt="profile"
              className="profile-image"
            />
            <form onSubmit={handleSubmit} className="retweet-input">
              <Textarea
                type="text"
                className="create-retweet-textarea"
                placeholder="Add a comment"
                value={comment}
                onChange={handleChange("comment")}
                onBlur={handleBlur("comment")}
                style={{
                  color:
                    errors.comment && touched.comment ? "#b00020" : "#ffffff",
                }}
              />
              <OriginalTweetCard tweet={selectedTweet} />
              <button className="ripple-btn" disabled={!!errors.comment}>
                Retweet
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRetweet;
