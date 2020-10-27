import React, { useEffect } from "react";
import { Layout, CreateTweet, Tweets, Header } from "../../components";
import { useAppContext } from "../../context/context";
import { Tweet, useGetUserTimelineQuery } from "../../generated/graphql";

const Home = () => {
  const [{ data }, userTimeline] = useGetUserTimelineQuery();
  const { userDetails } = useAppContext();

  useEffect(() => {
    userTimeline();
  }, [userTimeline]);

  return (
    <Layout>
      <Header label="Home" />
      <CreateTweet />
      {data?.getUserTimeline.length === 0 &&
      userDetails?.following.length === 0 ? (
        <div className="welcome">
          <p className="main-title">Welcome to Twitter!</p>
          <p className="sub-title">
            This is the best place to see what's happening in your world. Find
            some people to follow now.
          </p>
          <button className="ripple-btn">Let's go</button>
        </div>
      ) : (
        <Tweets tweets={data?.getUserTimeline as Tweet[]} />
      )}
    </Layout>
  );
};

export default Home;
