import React, { useEffect } from "react";
import { Layout, CreateTweet, Tweets, Header } from "../../components";
import { Tweet, useGetUserTimelineQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, userTimeline] = useGetUserTimelineQuery();

  useEffect(() => {
    userTimeline();
  }, [userTimeline]);

  return (
    <Layout>
      <Header label="Home" />
      <CreateTweet />
      <Tweets tweets={data?.getUserTimeline as Tweet[]} />
    </Layout>
  );
};

export default Home;
