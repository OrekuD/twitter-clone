import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  Layout,
  Spinner,
  StackHeader,
  Tweets,
  TweetView,
} from "../../components";
import {
  Tweet,
  useGetTweetCommentsQuery,
  useGetTweetQuery,
} from "../../generated/graphql";
import "./Tweet.scss";

const TweetPage = () => {
  const { params } = useRouteMatch<{ username: string; tweetId: string }>();
  const [{ data, fetching }, getTweet] = useGetTweetQuery({
    variables: { id: params.tweetId },
  });
  const [{ data: commentsData }, getComments] = useGetTweetCommentsQuery({
    variables: { tweetId: params.tweetId },
  });

  useEffect(() => {
    getTweet();
    getComments();
  }, [getTweet, params]);

  if (fetching) {
    return (
      <Layout>
        <StackHeader label="Tweet" />
        <div className="loading-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  const { _id, content, creator } = data?.getTweet.tweet as Tweet;
  const { fullname, username } = creator;

  return (
    <Layout title={`${fullname} on Twitter: "${content.slice(0, 15)}"`}>
      <StackHeader label="Tweet" />
      {/* <div className="tweet-page">
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
        {image && (
          <img
            className="tweet-image"
            src={`${TWEET_IMAGES_BASE_URL + image}`}
            alt="tweet"
            onClick={(e) => {
              // e.stopPropagation();
              // if (params.username === username) {
              //   window.scrollTo({ behavior: "smooth", top: 0 });
              //   return;
              // }
              // push(`/${username}`);
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
      </div> */}
      <TweetView tweet={data?.getTweet.tweet as Tweet} />
      <Tweets tweets={commentsData?.getTweetComments as Tweet[]} />
    </Layout>
  );
};

export default TweetPage;
