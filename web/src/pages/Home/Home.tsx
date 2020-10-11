import React, { useEffect } from "react";
import { Layout, CreatePost, Posts } from "../../components";
import { useAllPostsQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, allPosts] = useAllPostsQuery();

  useEffect(() => {
    allPosts();
  }, [allPosts, data]);

  return (
    <Layout>
      <CreatePost />
      <Posts data={data} />
    </Layout>
  );
};

export default Home;
