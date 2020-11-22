import React, { useEffect, useState } from "react";
import { TWEET_IMAGES_BASE_URL } from "../../constants/constants";
import { useAppContext } from "../../context/context";
import { Cancel, ChevronLeft, ChevronRight } from "../../Svgs";
import {
  Layout,
  Spinner,
  StackHeader,
  TweetActions,
  TweetView,
} from "../../components";
import "./TweetImageModal.scss";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  useGetTweetQuery,
  useGetTweetCommentsQuery,
  Tweet,
} from "../../generated/graphql";

const TweetImageModal = () => {
  const [showTweet, setShowTweet] = useState(true);
  const { params } = useRouteMatch<{ username: string; tweetId: string }>();
  const [{ data, fetching }, getTweet] = useGetTweetQuery({
    variables: { id: params.tweetId },
  });
  const [{ data: commentsData }, getComments] = useGetTweetCommentsQuery({
    variables: { tweetId: params.tweetId },
  });

  const { goBack } = useHistory();

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

  return (
    <div className="tweet-image-modal">
      <div
        className="image-view"
        style={{ width: showTweet ? undefined : "100%" }}
      >
        <div className="image-container">
          <button
            className="icon-wrapper control-icon icon-left"
            onClick={goBack}
          >
            <Cancel color="#fff" size={22} />
          </button>
          <button
            className="icon-wrapper control-icon icon-right"
            onClick={() => setShowTweet(!showTweet)}
          >
            {showTweet ? (
              <ChevronRight color="#fff" size={22} />
            ) : (
              <ChevronLeft color="#fff" size={22} />
            )}
          </button>
          <img
            src={`${TWEET_IMAGES_BASE_URL + data?.getTweet.tweet?.image}`}
            alt="tweet"
          />
        </div>
        <div className="bottom-row">
          <TweetActions tweet={data?.getTweet.tweet as Tweet} />
        </div>
      </div>
      {showTweet && (
        <div className="tweet-view">
          <TweetView tweet={data?.getTweet.tweet as Tweet} noImage />
        </div>
      )}
    </div>
  );
};

export default TweetImageModal;