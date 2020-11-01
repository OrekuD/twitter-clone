import React from "react";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { blue } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import Modal from "../Modal/Modal";
import ParsedText from "../ParsedText/ParsedText";
import { useCreateCommentMutation } from "../../generated/graphql";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./CreateComment.scss";
import { timeSince } from "../../utils/dateFormatters";
import Textarea from "react-textarea-autosize";

const schema = Yup.object().shape({
  comment: Yup.string()
    .min(1, "Comment must exceed 1 character")
    .max(140, "Comment cannot exceed 140 characters")
    .required(),
});

const CreateComment = () => {
  const {
    selectedTweet,
    currentModal,
    setCurrentModal,
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
        setCurrentModal(null);
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
    creator: { fullname, username, profileImage },
  } = selectedTweet;

  return (
    <Modal
      isVisible={currentModal === "COMMENT"}
      onClose={() => setCurrentModal(null)}
    >
      <div className="create-comment">
        <div className="modal-header">
          <button
            className="icon-wrapper"
            onClick={() => setCurrentModal(null)}
          >
            <Cancel size={24} color={blue} />
          </button>
        </div>
        <div className="comment-content">
          <div className="tweet">
            <img
              src={`${PROFILE_IMAGES_BASE_URL + profileImage}`}
              alt="profile"
              className="profile-image"
            />
            <div className="tweet-details">
              <div className="user-details">
                <p className="fullname">{fullname}</p>
                <p className="username">@{username}</p>
                <div className="dot" />
                <p className="username">{timeSince(createdAt)}</p>
              </div>
              <ParsedText text={content} />
              <p className="replying-to">
                Replying to <span>@{username}</span>
              </p>
            </div>
          </div>
          <div className="reply">
            <img
              src={`${PROFILE_IMAGES_BASE_URL + userDetails?.profileImage}`}
              alt="profile"
              className="profile-image"
            />
            <form onSubmit={handleSubmit} className="comment-input">
              <Textarea
                cols={2}
                type="text"
                className="textarea"
                placeholder="Tweet your reply"
                value={comment}
                onChange={handleChange("comment")}
                onBlur={handleBlur("comment")}
                style={{
                  color:
                    errors.comment && touched.comment ? "#b00020" : "#ffffff",
                }}
              />
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
