import React from "react";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { Tweet } from "../../generated/graphql";
import { timeSince } from "../../utils/dateFormatters";
import ParsedText from "../ParsedText/ParsedText";
import "./OriginalTweetCard.scss";

interface Props {
  tweet: Tweet;
}

const OriginalTweetCard = ({ tweet }: Props) => {
  const {
    content,
    createdAt,
    creator: { fullname, username, profileImage },
  } = tweet;
  return (
    <div className="original-tweet-card">
      <div className="profile-details">
        <img
          className="profile-image"
          src={`${PROFILE_IMAGES_BASE_URL + profileImage}`}
          alt="profile"
        />
        <p className="fullname">{fullname}</p>
        <p className="username">@{username}</p>
        <div className="dot" />
        <p className="created-at">{timeSince(createdAt)}</p>
      </div>
      <ParsedText text={content} />
    </div>
  );
};

export default OriginalTweetCard;
