import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { APP_URL, PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { grey, deeppurple } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Tweet, useLikeTweetMutation } from "../../generated/graphql";
import {
  FavouriteFilled,
  Favourite,
  ChatBubble,
  Share,
  ChevronDown,
  Retweet,
  Pin,
  MenuDots,
} from "../../Svgs";
import { userHasLiked } from "../../utils/userHasLiked";
import ParsedText from "../ParsedText/ParsedText";
import "./TweetCard.scss";
import { abbreviateNumber } from "../../utils/abreviateNumber";
import { userHasRetweeted } from "../../utils/userHasRetweeted";
import { isFollowing } from "../../utils/isFollowing";
import Popup from "reactjs-popup";
import { usersWhoLiked } from "../../utils/usersWhoLiked";
import OriginalTweetCard from "../OriginalTweetCard/OriginalTweetCard";
import { timeSince } from "../../utils/dateFormatters";

interface Props {
  tweet: Tweet;
  pinnedTweet?: boolean;
}

const TweetCard = ({ tweet, pinnedTweet }: Props) => {
  const {
    _id,
    content,
    createdAt,
    creator: { username, fullname, image },
    commentsCount,
    likes,
    retweets,
    parentTweetCreator,
    originalTweet,
  } = tweet;
  const [, like] = useLikeTweetMutation();
  const {
    userDetails,
    setShowCommentModal,
    setSelectedTweet,
    setShowRetweetModal,
  } = useAppContext();
  const userId = userDetails?._id!;
  const { push } = useHistory();
  const { params } = useRouteMatch<{ username: string }>();

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
    setShowCommentModal(true);
  };

  const likeTweet = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    // Mutate likes array on client side just to show user an immediate visual feedback
    if (userHasLiked(likes, userId) >= 0) {
      likes.splice(userHasLiked(likes, userId), 1);
    } else {
      likes.unshift({
        creatorId: userId,
      } as any);
    }

    // Call like mutation
    await like({
      tweetId: _id,
    });
  };

  return (
    <div
      className="tweet-card-container"
      onClick={() => {
        // event.stopPropagation() doesn't seem to work with the Link component from
        // react router, hence this implementation
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
          src={`${PROFILE_IMAGES_BASE_URL + image}`}
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
              {(close: () => void) => (
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
          <div className="tweet-actions">
            <div className="icon-container">
              <button className="icon" onClick={commentTweet}>
                <div className="svg">
                  <ChatBubble size={20} />
                </div>
                {commentsCount > 0 && (
                  <p className="count">{abbreviateNumber(commentsCount)}</p>
                )}
              </button>
            </div>
            <div className="icon-container">
              <button
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTweet(tweet);
                  setShowRetweetModal(true);
                }}
              >
                <div className="svg">
                  <Retweet
                    size={20}
                    color={
                      userHasRetweeted(retweets, userId) >= 0
                        ? "rgb(22, 186, 97)"
                        : undefined
                    }
                  />
                </div>
                {retweets.length > 0 && (
                  <p
                    className="count"
                    style={{
                      color:
                        userHasRetweeted(retweets, userId) >= 0
                          ? "rgb(22, 186, 97)"
                          : undefined,
                    }}
                  >
                    {abbreviateNumber(retweets.length)}
                  </p>
                )}
              </button>
            </div>
            <div className="icon-container">
              <button className="icon" onClick={likeTweet}>
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
                          : undefined,
                    }}
                  >
                    {abbreviateNumber(likes.length)}
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
    </div>
  );
};

export default TweetCard;
