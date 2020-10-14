import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Tweets, Spinner, StackHeader } from "../../components";
import {
  Tweet,
  useGetCommentsByUserQuery,
  useGetTweetsByUserQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import Profile from "./Profile";
import "./UserPage.scss";

const UserPage = () => {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const [{ data }, getUser] = useGetUserQuery({
    variables: { username: pathname.slice(1) },
  });

  useEffect(() => {
    getUser();
  }, [getUser, pathname]);

  const [{ data: tweetsByUser }, getTweetsByUser] = useGetTweetsByUserQuery({
    variables: {
      userId: data?.getUser.user?._id!,
    },
  });

  const [
    { data: commentsByUser },
    getCommentsByUser,
  ] = useGetCommentsByUserQuery({
    variables: {
      userId: data?.getUser.user?._id!,
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

  if (data?.getUser.error) {
    return (
      <Layout>
        <StackHeader label={pathname.slice(1)} />
        <div className="no-user">
          <p>User is unavailable </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <StackHeader label={pathname.slice(1)} />
      {!data ? (
        <div className="loading-screen">
          <Spinner />
        </div>
      ) : (
        <div className="user-page">
          {data.getUser.user && <Profile user={data.getUser.user} />}
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
