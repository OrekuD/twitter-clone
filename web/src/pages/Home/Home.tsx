import React, { useEffect } from "react";
import { Layout, CreateTweet, Tweets, Header } from "../../components";
import { Tweet, useAllTweetsQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, allTweets] = useAllTweetsQuery();

  useEffect(() => {
    allTweets();
  }, [allTweets]);

  return (
    <Layout>
      <Header label="Home" />
      <CreateTweet />
      <Tweets tweets={data?.getAllTweets as Tweet[]} />
    </Layout>
  );
};

export default Home;
