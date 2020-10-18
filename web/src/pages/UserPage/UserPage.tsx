import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { Layout, Tweets, Spinner, StackHeader } from "../../components";
import {
  Tweet,
  useGetCommentsByUserQuery,
  useGetTweetsByUserQuery,
  useGetUserByUsernameQuery,
} from "../../generated/graphql";
import Profile from "./Profile";
import "./UserPage.scss";

const UserPage = () => {
  const { params } = useRouteMatch<{ username: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const [{ data }, getUser] = useGetUserByUsernameQuery({
    variables: { username: params.username },
  });

  useEffect(() => {
    getUser();
  }, [getUser, params]);

  const [{ data: tweetsByUser }, getTweetsByUser] = useGetTweetsByUserQuery({
    variables: {
      userId: data?.getUserByUsername.user?._id!,
    },
  });

  const [
    { data: commentsByUser },
    getCommentsByUser,
  ] = useGetCommentsByUserQuery({
    variables: {
      userId: data?.getUserByUsername.user?._id!,
    },
  });

  useEffect(() => {
    if (activeIndex === 0) {
      getTweetsByUser();
      if (tweetsByUser) {
        setTweets(tweetsByUser?.getTweetsByUser as Tweet[]);
      }
    } else if (activeIndex === 1) {
      // console.log("--------");
      getCommentsByUser();
      if (commentsByUser) {
        setTweets([]);
        // setTweets(commentsByUser?.getCommentsByUser as Comment[]);
      }
    }
  }, [activeIndex, getTweetsByUser]);

  const tabs = ["Tweets", "Replies", "Likes"];

  if (params.username === "explore") {
    return null;
  }

  if (data?.getUserByUsername.error) {
    return (
      <Layout>
        <StackHeader label={params.username} />
        <div className="no-user">
          <p>User is unavailable </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <StackHeader label={params.username} />
      {!data ? (
        <div className="loading-screen">
          <Spinner />
        </div>
      ) : (
        <div className="user-page">
          {data.getUserByUsername.user && (
            <Profile user={data.getUserByUsername.user} />
          )}
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                className={`tab ${index === activeIndex ? "active" : ""}`}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <Tweets tweets={tweets} />
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
