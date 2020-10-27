import React, { useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  Layout,
  Spinner,
  StackHeader,
  ParsedText,
  Tweets,
  OriginalTweetCard,
} from "../../components";
import { APP_URL, PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { grey } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import {
  Tweet,
  useGetTweetCommentsQuery,
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
import { formatDate, formatTime } from "../../utils/dateFormatters";
import { userHasLiked } from "../../utils/userHasLiked";
import "./Tweet.scss";
import { abbreviateNumber } from "../../utils/abreviateNumber";
import { userHasRetweeted } from "../../utils/userHasRetweeted";

const TweetPage = () => {
  const {
    setSelectedTweet,
    setShowCommentModal,
    userDetails,
    setShowRetweetModal,
  } = useAppContext();
  const userId = userDetails?._id!;
  const { params } = useRouteMatch<{ username: string; tweetId: string }>();
  const [{ data }, getTweet] = useGetTweetQuery({
    variables: { id: params.tweetId },
  });
  const [{ data: commentsData }, getComments] = useGetTweetCommentsQuery({
    variables: { tweetId: params.tweetId },
  });
  const { push } = useHistory();
  const [, likeTweet] = useLikeTweetMutation();

  useEffect(() => {
    getTweet();
    getComments();
  }, [getTweet, params]);

  if (!data) {
    return (
      <Layout>
        <StackHeader label="Tweet" />
        <div className="loading-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  const {
    _id,
    content,
    createdAt,
    likes,
    creator,
    retweets,
    parentTweetCreator,
    originalTweet,
  } = data?.getTweet.tweet as Tweet;
  const { image, fullname, username } = creator;

  const commentTweet = () => {
    setSelectedTweet(data?.getTweet.tweet as Tweet);
    setShowCommentModal(true);
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
        <div className="tweet-actions">
          <div className="icon-container">
            <button className="icon" onClick={commentTweet}>
              <div className="svg">
                <ChatBubble size={20} />
              </div>
            </button>
          </div>
          <div className="icon-container">
            <button
              className="icon"
              onClick={() => {
                setSelectedTweet(data?.getTweet.tweet as Tweet);
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
            </button>
          </div>
          <div className="icon-container">
            <button
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                likeTweet({
                  tweetId: _id,
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
      <Tweets tweets={commentsData?.getTweetComments as Tweet[]} />
    </Layout>
  );
};

export default TweetPage;
