import React from "react";
import { CreateTweet } from ".";
import { blue } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Cancel } from "../../Svgs";
import Modal from "../Modal/Modal";

const CreateTweetModal = () => {
  const { currentModal, setCurrentModal } = useAppContext();
  return (
    <Modal
      isVisible={currentModal === "TWEET"}
      onClose={() => setCurrentModal(null)}
    >
      <div className="modal-header">
        <button className="icon-wrapper" onClick={() => setCurrentModal(null)}>
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
