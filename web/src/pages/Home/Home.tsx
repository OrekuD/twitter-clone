import React, { useEffect } from "react";
import { Layout, CreatePost, Posts, Header } from "../../components";
import { Post, useAllPostsQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, allPosts] = useAllPostsQuery();

  useEffect(() => {
    allPosts();
  }, [allPosts, data]);

  return (
    <Layout>
      <Header label="Home" />
      <CreatePost />
      <Posts posts={data?.getAllPosts as Post[]} />
    </Layout>
  );
};

export default Home;
