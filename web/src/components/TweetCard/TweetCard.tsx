import React from "react";
import { useHistory } from "react-router-dom";
import { APP_URL, dummyUserDetails } from "../../constants/constants";
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
import { userLiked } from "../../utils/userLiked";
import RenderTweet from "../RenderTweet/RenderTweet";
import "./TweetCard.scss";

interface Props {
  tweet: any; // TODO: fix this
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
  } = tweet as Tweet;
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
        <div className="icons">
          <div className="icon-container">
            <button className="icon" onClick={commentTweet}>
              <ChatBubble size={18} color={grey} />
              {comments.length > 0 && (
                <p className="count">{comments.length}</p>
              )}
            </button>
          </div>
          <div className="icon-container">
            <button className="icon">
              <Retweet size={18} color={grey} />
            </button>
          </div>
          <div className="icon-container">
            <button
              className="icon"
              onClick={async (e) => {
                e.stopPropagation();
                // Mutate array on client side just for visual feedback
                // if (userLiked(likes, userId) >= 0) {
                //   likes.splice(userLiked(likes, userId), 1);
                // } else {
                //   likes.unshift({
                //     _id: Math.random().toString(),
                //     creatorId: userId,
                //     tweetId: _id,
                //     creator: dummyUserDetails,
                //   });
                // }
                await likeTweet({
                  tweetId: _id,
                  isComment: false,
                });
              }}
            >
              {userLiked(likes, userId) >= 0 ? (
                <FavouriteFilled size={18} color="#b00020" />
              ) : (
                <Favourite size={18} color={grey} />
              )}

              {likes.length > 0 && <p className="count">{likes.length}</p>}
            </button>
          </div>
          <div className="icon-container">
            <button className="icon" onClick={share}>
              <Share size={18} color={grey} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
