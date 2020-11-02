import React from "react";
import { useAppContext } from "../../context/context";
import Modal from "../Modal/Modal";
import "./TweetImageModal.scss";

const TweetImageModal = () => {
  const { currentModal, setCurrentModal } = useAppContext();
  return (
    <Modal
      isVisible={currentModal === "TWEET_IMAGE"}
      onClose={() => setCurrentModal(null)}
      fullScreenContent
    >
      <div className="tweet-image-modal">Okay</div>
    </Modal>
  );
};

export default TweetImageModal;
