import React from "react";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { blue } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import Modal from "../Modal/Modal";
import ParseText from "../ParseText/ParseText";
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
    setShowCommentModal,
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
    initialErrors: { comment: "Comment must exceed 1 character" },
    onSubmit: async (values, { resetForm }) => {
      await createComment({
        content: values.comment,
        tweetId: _id,
      });
      resetForm();
      setTimeout(() => {
        setShowCommentModal(false);
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
      onClose={() => setShowCommentModal(false)}
    >
      <div className="create-comment">
        <div className="modal-header">
          <button
            className="close-btn"
            onClick={() => setShowCommentModal(false)}
          >
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
              <ParseText text={content} />
              <p className="replying-to">
                Replying to <span>@{username}</span>
              </p>
            </div>
          </div>
          <div className="reply">
            <img
              src={`${PROFILE_IMAGES_BASE_URL + userDetails?.image}`}
              alt="profile"
              className="profile-image"
            />
            <form onSubmit={handleSubmit} className="comment-input">
              <textarea
                className="textarea"
                placeholder="Tweet your reply"
                draggable={false}
                value={comment}
                onChange={handleChange("comment")}
                onBlur={handleBlur("comment")}
                style={{
                  color:
                    errors.comment && touched.comment ? "#b00020" : "#ffffff",
                }}
              ></textarea>
              <button className="ripple-btn" disabled={!!errors.comment}>
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
