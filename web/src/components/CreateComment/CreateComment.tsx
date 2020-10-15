import React from "react";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { blue } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import Modal from "../Modal/Modal";
import RenderTweet from "../RenderTweet/RenderTweet";
import { useCreateCommentMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./CreateComment.scss";

const schema = Yup.object().shape({
  comment: Yup.string()
    .min(1, "Comment must exceed 1 character")
    .max(140, "Comment cannot exceed 140 characters")
    .required(),
});

const CreateComment = () => {
  const {
    selectedTweet,
    setCommentModalState,
    showCommentModal,
    userDetails,
  } = useAppContext();
  const [, createComment] = useCreateCommentMutation();

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
    onSubmit: async (values, { resetForm, setFieldError }) => {
      if (values.comment.split("").length === 0) {
        setFieldError("comment", "Comment must exceed 1 character");
        return;
      }
      await createComment({
        content: values.comment,
        tweetId: _id,
      });
      resetForm();
      setTimeout(() => {
        setCommentModalState(false);
      }, 500);
    },
  });

  if (!selectedTweet) {
    return null;
  }
  const {
    _id,
    content,
    createdAt,
    creator: { fullname, username, image },
  } = selectedTweet;

  return (
    <Modal
      isVisible={showCommentModal}
      onClose={() => setCommentModalState(false)}
    >
      <div className="create-comment">
        <div className="top-section">
          <button onClick={() => setCommentModalState(false)}>
            <Cancel size={24} color={blue} />
          </button>
        </div>
        <div className="comment-content">
          <div className="tweet">
            <img
              src={`${PROFILE_IMAGES_BASE_URL + image}`}
              alt="profile"
              className="profile-image"
            />
            <div className="tweet-details">
              <div className="user-details">
                <p className="fullname">{fullname}</p>
                <p className="username">@{username}</p>
                <div className="dot" />
                <p className="username">{timeSince(new Date(createdAt))}</p>
              </div>
              <RenderTweet text={content} />
              <p className="replying-to">
                Replying to <span>@{username}</span>
              </p>
            </div>
          </div>
          <div className="reply">
            <img
              src={`${PROFILE_IMAGES_BASE_URL + userDetails.image}`}
              alt="profile"
              className="profile-image"
            />
            <form onSubmit={handleSubmit} className="comment-input">
              <textarea
                className="textarea"
                placeholder="Tweet your reply"
                value={comment}
                onChange={handleChange("comment")}
                onBlur={handleBlur("comment")}
              ></textarea>
              <button
                className="ripple-btn"
                style={{
                  opacity: errors.comment || !touched.comment ? 0.5 : 1,
                }}
              >
                Reply
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateComment;
