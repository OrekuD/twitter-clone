import React from "react";
import { useHistory } from "react-router-dom";
import { APP_URL } from "../../constants/constants";
import { grey } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Tweet, useLikeTweetMutation } from "../../generated/graphql";
import {
  FavouriteFilled,
  Favourite,
  ChatBubble,
  Share,
  ChevronDown,
  Retweet,
} from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import { userHasLiked } from "../../utils/userHasLiked";
import RenderTweet from "../RenderTweet/RenderTweet";
import "./TweetCard.scss";

interface Props {
  tweet: Tweet;
  nolink?: boolean;
}

const TweetCard = ({ tweet }: Props) => {
  const {
    _id,
    content,
    createdAt,
    creator: { username, fullname },
    comments,
    likes,
  } = tweet;
  const [, likeTweet] = useLikeTweetMutation();
  const {
    userDetails: { _id: userId },
    setCommentModalState,
    setSelectedTweet,
  } = useAppContext();
  const { push } = useHistory();

  const share = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    let newVariable = window.navigator as any;
    if (newVariable.share) {
      await newVariable.share({
        title: "Twitter-clone",
        text: "Check out this tweet",
        url: `${APP_URL}/${username}/status/${_id}`,
      });
    } else {
      alert("share not supported");
    }
  };

  const commentTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSelectedTweet(tweet);
    setCommentModalState(true);
  };

  return (
    <div
      className="card"
      onClick={() => {
        // event.stopPropagation() doesn't seem to work with the Link component from
        // react router, hence this implementation
        push(`/${username}/status/${_id}`);
      }}
    >
      <div
        className="profile-image"
        onClick={(e) => {
          e.stopPropagation();
          push(`/${username}`);
        }}
      ></div>
      <div className="card-content">
        <div className="card-header">
          <div className="user-details">
            <p className="fullname">{fullname}</p>
            <p className="username">@{username}</p>
            <div className="dot" />
            <p className="username">{timeSince(new Date(createdAt))}</p>
          </div>
          <div className="view-tweet">
            <ChevronDown size={16} color={grey} />
          </div>
        </div>
        <RenderTweet text={content} />
        <div className="tweet-actions">
          <div className="icon-container">
            <button className="icon" onClick={commentTweet}>
              <div className="svg">
                <ChatBubble size={20} />
              </div>
              {comments.length > 0 && (
                <p className="count">{comments.length}</p>
              )}
            </button>
          </div>
          <div className="icon-container">
            <button className="icon">
              <div className="svg">
                <Retweet size={20} />
              </div>
              <p className="count">12</p>
            </button>
          </div>
          <div className="icon-container">
            <button
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                likeTweet({
                  tweetId: _id,
                  isComment: false,
                });
              }}
            >
              <div className="svg">
                <>
                  {userHasLiked(likes, userId) >= 0 ? (
                    <FavouriteFilled size={18} color="#b00020" />
                  ) : (
                    <Favourite size={20} />
                  )}
                </>
              </div>
              {likes.length > 0 && (
                <p
                  className="count"
                  style={{
                    color:
                      userHasLiked(likes, userId) >= 0
                        ? "rgb(197, 36, 88)"
                        : grey,
                  }}
                >
                  {likes.length}
                </p>
              )}
            </button>
          </div>
          <div className="icon-container">
            <button className="icon" onClick={share}>
              <div className="svg">
                <Share size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
