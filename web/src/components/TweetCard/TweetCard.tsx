import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { APP_URL } from "../../constants/constants";
import { grey } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import {
  Tweet,
  useCreateReTweetMutation,
  useLikeTweetMutation,
} from "../../generated/graphql";
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
import { abbreviateNumber } from "../../utils/abreviateNumber";
import { userHasRetweeted } from "../../utils/userHasRetweeted";

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
    retweets,
    isRetweet,
  } = tweet;
  const [, likeTweet] = useLikeTweetMutation();
  const [, createRetweet] = useCreateReTweetMutation();
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

  useEffect(() => {
    console.log(retweets);
  }, []);

  return (
    <div
      className="card-container"
      onClick={() => {
        // event.stopPropagation() doesn't seem to work with the Link component from
        // react router, hence this implementation
        push(`/${username}/status/${_id}`);
      }}
    >
      {isRetweet && (
        <div className="retweeted">
          <Retweet size={14} color={grey} />
          {userHasRetweeted(retweets, userId) >= 0 && isRetweet ? (
            <p>You Retweeted</p>
          ) : (
            <p>{retweets[0].username} Retweeted</p>
          )}
        </div>
      )}
      <div className="card">
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
          {/* <pre className="ssss">{content}</pre> */}
          <div className="tweet-actions">
            <div className="icon-container">
              <button className="icon" onClick={commentTweet}>
                <div className="svg">
                  <ChatBubble size={20} />
                </div>
                {comments.length > 0 && (
                  <p className="count">{abbreviateNumber(comments.length)}</p>
                )}
              </button>
            </div>
            <div className="icon-container">
              <button
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  createRetweet({
                    tweetId: _id,
                  });
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
