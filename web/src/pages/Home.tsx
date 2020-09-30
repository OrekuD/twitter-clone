import React, { useEffect } from "react";
import { useAllPostsQuery } from "../generated/graphql";

const Home = () => {
  const [{ data }, allPost] = useAllPostsQuery();

  useEffect(() => {
    allPost();
    console.log(data?.getAllPosts);
  }, [allPost, data]);

  return (
    <div className="home">
      {data?.getAllPosts.map(({ content, creator: { username } }, index) => (
        <div className="card" key={index}>
          <p className="username">{username}</p>
          <p className="content">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
