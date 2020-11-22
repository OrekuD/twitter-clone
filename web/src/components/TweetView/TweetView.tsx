import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ParsedText, OriginalTweetCard } from "../../components";
import {
  PROFILE_IMAGES_BASE_URL,
  TWEET_IMAGES_BASE_URL,
} from "../../constants/constants";
import { Tweet } from "../../generated/graphql";
import { MenuDots } from "../../Svgs";
import { formatDate, formatTime } from "../../utils/dateFormatters";
import "./TweetView.scss";
import { abbreviateNumber } from "../../utils/abreviateNumber";
import TweetActions from "../TweetActions/TweetActions";

interface Props {
  tweet: Tweet;
  noImage?: boolean;
}

const TweetView = ({ tweet, noImage }: Props) => {
  const { push } = useHistory();

  const {
    _id,
    content,
    createdAt,
    likes,
    creator,
    retweets,
    parentTweetCreator,
    originalTweet,
    image,
  } = tweet;
  const { profileImage, fullname, username } = creator;

  return (
    <div className="tweet-page">
      <div className="profile">
        <div className="left-content">
          <Link to={`/${username}`}>
            <img
              src={`${PROFILE_IMAGES_BASE_URL + profileImage}`}
              alt="profile"
              className="profile-image"
            />
          </Link>
          <div className="profile-details">
            <p className="fullname">{fullname}</p>
            <p className="username">@{username}</p>
          </div>
        </div>
        <div className="icon-wrapper">
          <MenuDots size={22} />
        </div>
      </div>
      {parentTweetCreator && (
        <p className="replying-to">
          Replying to{" "}
          <span
            onClick={(e) => {
              e.stopPropagation();
              push(`/${username}`);
            }}
          >
            @{parentTweetCreator}
          </span>
        </p>
      )}
      <ParsedText text={content} />
      {image && !noImage && (
        <img
          className="tweet-image"
          src={`${TWEET_IMAGES_BASE_URL + image}`}
          alt="tweet"
          onClick={(e) => {
            e.stopPropagation();
            push(`/${username}/status/${_id}/photo`);
          }}
        />
      )}
      {originalTweet && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            push(
              `/${originalTweet?.creator.username}/status/${originalTweet?._id}`
            );
          }}
        >
          <OriginalTweetCard tweet={originalTweet} />
        </div>
      )}
      <div className="tweet-page-details">
        <p>{formatTime(createdAt)}</p>
        <div className="dot" />
        <p>{formatDate(createdAt)}</p>
        <div className="dot" />
        <p>Twitter Web App</p>
      </div>
      <div className="tweet-stats">
        <p>
          <span>{abbreviateNumber(retweets.length)}</span> Retweets
        </p>
        <p>
          <span>{abbreviateNumber(likes.length)}</span> Likes
        </p>
      </div>
      <TweetActions tweet={tweet} showLabels={noImage} />
    </div>
  );
};

export default TweetView;
