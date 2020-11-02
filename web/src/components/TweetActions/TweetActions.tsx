import React from "react";
import { APP_URL } from "../../constants/constants";
import { useAppContext } from "../../context/context";
import { Tweet, useLikeTweetMutation } from "../../generated/graphql";
import {
  ChatBubble,
  Retweet,
  FavouriteFilled,
  Favourite,
  Share,
} from "../../Svgs";
import { abbreviateNumber } from "../../utils/abreviateNumber";
import { userHasLiked } from "../../utils/userHasLiked";
import { userHasRetweeted } from "../../utils/userHasRetweeted";
import "./TweetActions.scss";

interface Props {
  tweet: Tweet;
  showLabels?: boolean;
}

const TweetActions = ({ tweet, showLabels }: Props) => {
  const {
    _id,
    creator: { username },
    commentsCount,
    likes,
    retweets,
  } = tweet;
  const [, like] = useLikeTweetMutation();
  const { userDetails, setSelectedTweet, setCurrentModal } = useAppContext();
  const userId = userDetails?._id!;
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
    setCurrentModal("COMMENT");
  };

  const likeTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    like({
      tweetId: _id,
    });
  };
  return (
    <div className="tweet-actions">
      <div className="icon-container">
        <button className="icon" onClick={commentTweet}>
          <div className="svg">
            <ChatBubble size={20} />
          </div>
          {showLabels && commentsCount > 0 && (
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
            setCurrentModal("RETWEET");
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
          {showLabels && retweets.length > 0 && (
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
          {showLabels && likes.length > 0 && (
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
  );
};

export default TweetActions;
