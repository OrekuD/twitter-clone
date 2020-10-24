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

  return <Tweets tweets={tweets as Tweet[]} />;
};
