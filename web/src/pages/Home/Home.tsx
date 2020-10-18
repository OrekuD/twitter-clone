import React, { useEffect } from "react";
import { Layout, CreateTweet, Tweets, Header } from "../../components";
import { Tweet, useGetCurrentUserTimelineQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, userTimeline] = useGetCurrentUserTimelineQuery();

  useEffect(() => {
    userTimeline();
  }, [userTimeline]);

  return (
    <Layout>
      <Header label="Home" />
      <CreateTweet />
      <Tweets tweets={data?.getCurrentUserTimeline as Tweet[]} />
    </Layout>
  );
};

export default Home;
