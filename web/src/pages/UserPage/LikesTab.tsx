import React, { useEffect } from "react";
import { Spinner, Tweets } from "../../components";
import { Tweet, useGetLikesByUserQuery } from "../../generated/graphql";

export const LikesTab = ({ userId }: { userId: string }) => {
  const [{ fetching, data }, getLikes] = useGetLikesByUserQuery({
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

  const tweets = data?.getLikesByUser?.map((like) => like.tweet);
  if (tweets?.length === 0) {
    return (
      <div className="welcome">
        <p className="main-title">You don't have any likes yet</p>
        <p className="sub-title">
          Tap the heart on any Tweet to show it some love. When you do it'll
          show up here.
        </p>
      </div>
    );
  }

  return <Tweets tweets={tweets as Tweet[]} />;
};
