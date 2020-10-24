import React, { useEffect } from "react";
import { Spinner, Tweets } from "../../components";
import { Tweet, useGetTweetsByUserQuery } from "../../generated/graphql";

export const TweetsTab = ({ userId }: { userId: string }) => {
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

  return <Tweets tweets={data?.getTweetsByUser as Tweet[]} />;
};
