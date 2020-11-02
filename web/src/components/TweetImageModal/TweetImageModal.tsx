import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import Modal from "../Modal/Modal";
import TweetView from "../TweetView/TweetView";
import "./TweetImageModal.scss";

const TweetImageModal = () => {
  const { currentModal, setCurrentModal, selectedTweet } = useAppContext();
  const [showTweet, setShowTweet] = useState(true);
  return (
    <Modal
      isVisible={currentModal === "TWEET_IMAGE"}
      onClose={() => setCurrentModal(null)}
      fullScreenContent
    >
      <div className="tweet-image-modal">
        <div
          className="image-view"
          style={{ width: showTweet ? undefined : "100%" }}
        >
          u
        </div>
        {showTweet && (
          <div className="tweet-view">
            <TweetView tweet={selectedTweet!} noImage />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TweetImageModal;
