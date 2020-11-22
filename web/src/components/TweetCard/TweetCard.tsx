import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  PROFILE_IMAGES_BASE_URL,
  TWEET_IMAGES_BASE_URL,
} from "../../constants/constants";
import { grey, deeppurple } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Tweet } from "../../generated/graphql";
import { FavouriteFilled, Pin, MenuDots } from "../../Svgs";
import ParsedText from "../ParsedText/ParsedText";
import "./TweetCard.scss";
import Popup from "reactjs-popup";
import { usersWhoLiked } from "../../utils/usersWhoLiked";
import OriginalTweetCard from "../OriginalTweetCard/OriginalTweetCard";
import { timeSince } from "../../utils/dateFormatters";
import TweetActions from "../TweetActions/TweetActions";

interface Props {
  tweet: Tweet;
  pinnedTweet?: boolean;
}

const TweetCard = ({ tweet, pinnedTweet }: Props) => {
  const {
    _id,
    content,
    createdAt,
    creator: { username, fullname, profileImage },
    likes,
    parentTweetCreator,
    originalTweet,
    image,
  } = tweet;
  const { userDetails, setSelectedTweet, setCurrentModal } = useAppContext();
  const { push } = useHistory();
  const { params } = useRouteMatch<{ username: string }>();

  return (
    <div
      className="tweet-card-container"
      onClick={() => {
        // event.stopPropagation() doesn't seem to work with the Link component from
        // react router
        push(`/${username}/status/${_id}`);
      }}
    >
      {pinnedTweet && (
        <div className="type">
          <Pin size={12} color={grey} />
          <p>Pinned Tweet</p>
        </div>
      )}
      {usersWhoLiked(userDetails?.following!, likes).length > 0 && (
        <div className="type">
          <FavouriteFilled size={12} color={grey} />
          <p>
            {usersWhoLiked(userDetails?.following!, likes)[0].fullname} liked
          </p>
        </div>
      )}
      <div className="tweet-card">
        <img
          className="profile-image"
          src={`${PROFILE_IMAGES_BASE_URL + profileImage}`}
          alt="profile"
          onClick={(e) => {
            e.stopPropagation();
            if (params.username === username) {
              window.scrollTo({ behavior: "smooth", top: 0 });
              return;
            }
            push(`/${username}`);
          }}
        />
        <div className="tweet-card-content">
          <div className="tweet-card-header">
            <div className="user-details">
              <p className="fullname">{fullname}</p>
              <p className="username">@{username}</p>
              <div className="dot" />
              <p className="username">{timeSince(createdAt)}</p>
            </div>
            <Popup
              trigger={
                <div
                  className="icon-wrapper"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MenuDots size={20} />
                </div>
              }
              position="top center"
              repositionOnResize
              contentStyle={{
                backgroundColor: deeppurple,
              }}
            >
              {() => (
                <div className="popup-menu">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae magni omnis delectus nemo, maxime molestiae dolorem
                  numquam mollitia, voluptate ea, accusamus excepturi deleniti
                  ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
                </div>
              )}
            </Popup>
            {/* <div className="icon-wrapper" onClick={(e) => e.stopPropagation()}>
              <MenuDots size={20} />
            </div> */}
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
          {image && (
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
          <TweetActions tweet={tweet} showLabels />
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
