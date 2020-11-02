import React, { useState } from "react";
import { TWEET_IMAGES_BASE_URL } from "../../constants/constants";
import { useAppContext } from "../../context/context";
import { Cancel, ChevronLeft, ChevronRight } from "../../Svgs";
import Modal from "../Modal/Modal";
import TweetActions from "../TweetActions/TweetActions";
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
          <div className="image-container">
            <button
              className="icon-wrapper control-icon icon-left"
              onClick={() => setCurrentModal(null)}
            >
              <Cancel color="#fff" size={22} />
            </button>
            <button
              className="icon-wrapper control-icon icon-right"
              onClick={() => setShowTweet(!showTweet)}
            >
              {showTweet ? (
                <ChevronRight color="#fff" size={22} />
              ) : (
                <ChevronLeft color="#fff" size={22} />
              )}
            </button>
            <img
              src={`${TWEET_IMAGES_BASE_URL + selectedTweet?.image}`}
              alt="tweet"
            />
          </div>
          <div className="bottom-row">
            <TweetActions tweet={selectedTweet!} />
          </div>
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
