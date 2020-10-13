import React from "react";
import { useAppContext } from "../../context/context";
import Modal from "../Modal/Modal";
import "./CreateComment.scss";

const CreateComment = () => {
  const {
    selectedPost,
    setCommentModalState,
    showCommentModal,
  } = useAppContext();

  if (!selectedPost) {
    return null;
  }
  const { content, createdAt, creator } = selectedPost;
  return (
    <Modal
      isVisible={showCommentModal}
      onClose={() => setCommentModalState(false)}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default CreateComment;
