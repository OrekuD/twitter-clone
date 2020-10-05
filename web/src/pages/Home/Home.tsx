import React, { useEffect } from "react";
import { Layout, PostCard, CreatePost } from "../../components";
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
      <div className="posts">
        {data?.getAllPosts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
