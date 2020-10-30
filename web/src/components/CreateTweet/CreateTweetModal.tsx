import React from "react";
import { CreateTweet } from ".";
import { blue } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import Modal from "../Modal/Modal";

const CreateTweetModal = () => {
  const { showTweetModal, setShowTweetModal } = useAppContext();
  return (
    <Modal isVisible={showTweetModal} onClose={() => setShowTweetModal(false)}>
      <div className="modal-header">
        <button
          className="icon-wrapper"
          onClick={() => setShowTweetModal(false)}
        >
          <Cancel size={24} color={blue} />
        </button>
      </div>
      <div className="create-tweet-modal">
        <CreateTweet />
      </div>
    </Modal>
  );
};

export default CreateTweetModal;
