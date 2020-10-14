import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, TweetCard, Spinner } from "../../components";
import { useGetTweetQuery } from "../../generated/graphql";
import "./Tweet.scss";

const Tweet = () => {
  const { pathname } = useLocation();
  const [{ data }, getTweet] = useGetTweetQuery({
    variables: { id: pathname.slice(6) },
  });
  useEffect(() => {
    getTweet();
  }, [getTweet, pathname]);

  let content = (
    <div>
      <TweetCard tweet={data?.getTweet.tweet!} />
    </div>
  );

  if (!data) {
    content = (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  } else {
    content = (
      <div>
        <p>{data.getTweet.tweet?.content}</p>
      </div>
    );
  }

  return <Layout>{content}</Layout>;
};

export default Tweet;
