import React, { useEffect } from "react";
import { PostCard } from "../../components";
import { useAllPostsQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, allPosts] = useAllPostsQuery();

  useEffect(() => {
    allPosts();
  }, [allPosts, data]);

  return (
    <div className="posts">
      {data?.getAllPosts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </div>
  );
};

export default Home;
