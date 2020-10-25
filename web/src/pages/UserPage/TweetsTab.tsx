import React, { useEffect } from "react";
import { Spinner, TweetCard, Tweets } from "../../components";
import { Tweet, useGetTweetsByUserQuery } from "../../generated/graphql";

interface Props {
  pinnedTweet?: Tweet | null;
  userId: string;
}

export const TweetsTab = ({ userId, pinnedTweet }: Props) => {
  const [{ fetching, data }, getLikes] = useGetTweetsByUserQuery({
    variables: {
      userId,
    },
  });

  useEffect(() => {
    getLikes();
  }, []);

  if (fetching) {
    return (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  }

  let tweets = data?.getTweetsByUser as Tweet[];
  if (pinnedTweet) {
    tweets = tweets.filter((tweet) => tweet._id !== pinnedTweet._id);
  }

  return (
    <>
      {pinnedTweet && <TweetCard tweet={pinnedTweet} pinnedTweet />}
      <Tweets tweets={tweets} />
    </>
  );
};
