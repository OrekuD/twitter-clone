import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Layout, Spinner, StackHeader, RenderTweet } from "../../components";
import { APP_URL, PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
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
import { userHasLiked } from "../../utils/userHasLiked";
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
          <div className="tweet-actions">
            <div className="icon-container">
              <button className="icon" onClick={commentTweet}>
                <div className="svg">
                  <ChatBubble size={20} />
                </div>
              </button>
            </div>
            <div className="icon-container">
              <button className="icon" onClick={commentTweet}>
                <div className="svg">
                  <Retweet size={20} />
                </div>
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
      )}
    </Layout>
  );
};

export default TweetPage;
