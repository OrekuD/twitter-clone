import React from "react";
import { Link } from "react-router-dom";
import { dummyUserDetails } from "../../constants";
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

  const url = "https://twitter-clone.netlify.app";

  const share = async () => {
    let newVariable = window.navigator as any;
    if (newVariable.share) {
      await newVariable.share({
        title: "Twitter-clone",
        text: "Check out this tweet",
        url: `${url}/tweet/${_id}`,
      });
    } else {
      alert("share not supported");
    }
  };

  const commentTweet = () => {
    setSelectedTweet(tweet);
    setCommentModalState(true);
  };

  return (
    <div className="card">
      <Link to={`/${username}`}>
        <div className="profile-image"></div>
      </Link>
      <div className="card-content">
        <div className="card-header">
          <div className="user-details">
            <p className="fullname">{fullname}</p>
            <p className="username">@{username}</p>
            <div className="dot" />
            <p className="username">{timeSince(new Date(createdAt))}</p>
          </div>
          <div className="view-tweet">
            <Link to={`/tweet/${_id}`}>
              <ChevronDown size={16} color={grey} />
            </Link>
          </div>
        </div>
        <p className="content">
          <RenderTweet text={content} />
        </p>
        <div className="icons">
          <button className="icon" onClick={commentTweet}>
            <ChatBubble size={18} color={grey} />
            {comments.length > 0 && <p className="count">{comments.length}</p>}
          </button>
          <button className="icon">
            <Retweet size={18} color={grey} />
          </button>
          <button
            className="icon"
            onClick={async () => {
              // Mutate array on client side just for visual feedback
              if (userLiked(likes, userId) >= 0) {
                likes.splice(userLiked(likes, userId), 1);
              } else {
                likes.unshift({
                  _id: Math.random().toString(),
                  creatorId: userId,
                  tweetId: _id,
                  creator: dummyUserDetails,
                });
              }
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
          <button className="icon" onClick={share}>
            <Share size={18} color={grey} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
