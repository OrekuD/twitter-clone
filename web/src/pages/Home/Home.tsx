import React, { useEffect } from "react";
import { Layout, PostCard, CreatePost, Spinner } from "../../components";
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
        {data?.getAllPosts ? (
          <>
            {data?.getAllPosts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
          </>
        ) : (
          <div className="loading-screen">
            <Spinner />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
