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

  const { content, creator } = data?.getTweet.tweet as Tweet;
  const { fullname } = creator;

  return (
    <Layout title={`${fullname} on Twitter: "${content.slice(0, 15)}"`}>
      <StackHeader label="Tweet" />
      <TweetView tweet={data?.getTweet.tweet as Tweet} />
      <Tweets tweets={commentsData?.getTweetComments as Tweet[]} />
    </Layout>
  );
};

export default TweetPage;
