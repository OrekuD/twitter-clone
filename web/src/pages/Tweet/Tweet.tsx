import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Layout, Spinner, StackHeader, RenderTweet } from "../../components";
import {
  APP_URL,
  dummyUserDetails,
  PROFILE_IMAGES_BASE_URL,
} from "../../constants/constants";
import { grey } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import {
  Tweet,
  useGetTweetQuery,
  useLikeTweetMutation,
} from "../../generated/graphql";
import {
  ChatBubble,
  ChevronDown,
  Favourite,
  FavouriteFilled,
  Retweet,
  Share,
} from "../../Svgs";
import { formatDate } from "../../utils/dateFormatters";
import { userLiked } from "../../utils/userLiked";
import "./Tweet.scss";

const TweetPage = () => {
  const {
    setSelectedTweet,
    setCommentModalState,
    userDetails: { _id: userId },
  } = useAppContext();
  const { params } = useRouteMatch<{ username: string; tweetId: string }>();
  const [{ data }, getTweet] = useGetTweetQuery({
    variables: { id: params.tweetId },
  });
  const [, likeTweet] = useLikeTweetMutation();

  useEffect(() => {
    getTweet();
    if (data?.getTweet.tweet) {
      console.log("--------", data.getTweet.tweet.likes);
    }
  }, [getTweet, params]);

  if (!data) {
    return null;
  }

  const { _id, content, createdAt, likes, comments, creator } = data?.getTweet
    .tweet as Tweet;
  const { image, fullname, username, _id: creatorId } = creator;

  const commentTweet = () => {
    setSelectedTweet(data.getTweet.tweet as Tweet);
    setCommentModalState(true);
  };

  const share = async () => {
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

  return (
    <Layout>
      <StackHeader label="Tweet" />
      {!data ? (
        <div className="loading-screen">
          <Spinner />
        </div>
      ) : (
        <div className="tweet-page">
          <div className="profile">
            <div className="left-content">
              <Link to={`/${username}`}>
                <img
                  src={`${PROFILE_IMAGES_BASE_URL + image}`}
                  alt="profile"
                  className="profile-image"
                />
              </Link>
              <div className="profile-details">
                <p className="fullname">{fullname}</p>
                <p className="username">@{username}</p>
              </div>
            </div>
            <ChevronDown size={20} color={grey} />
          </div>
          <RenderTweet text={content} />
          <div className="tweet-page-details">
            <p>{new Date(createdAt).getDate()}</p>
            <div className="dot" />
            <p>{formatDate(createdAt)}</p>
            <div className="dot" />
            <p>Twitter Web App</p>
          </div>
          <div className="tweet-stats">
            <p>
              <span>100</span> Retweets
            </p>
            <p>
              <span>{likes.length}</span> Likes
            </p>
          </div>
          <div className="buttons">
            <button className="icon" onClick={commentTweet}>
              <ChatBubble size={20} color={grey} />
            </button>
            <button className="icon">
              <Retweet size={20} color={grey} />
            </button>
            <button
              className="icon"
              onClick={async () => {
                await likeTweet({
                  tweetId: _id,
                  isComment: false,
                });
              }}
            >
              {userLiked(likes, userId) >= 0 ? (
                <FavouriteFilled size={20} color="#b00020" />
              ) : (
                <Favourite size={20} color={grey} />
              )}
            </button>
            <button className="icon" onClick={share}>
              <Share size={20} color={grey} />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TweetPage;
