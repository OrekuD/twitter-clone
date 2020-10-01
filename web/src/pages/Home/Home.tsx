import React, { useEffect } from "react";
import { useAllPostsQuery } from "../../generated/graphql";
import "./Home.scss";

const Home = () => {
  const [{ data }, allPost] = useAllPostsQuery();

  useEffect(() => {
    allPost();
    console.log(data?.getAllPosts);
  }, [allPost, data]);

  return (
    <div className="home">
      <div className="profile">
        <div className="image"></div>
        <div className="content">
          <h1>Hi</h1>
        </div>
      </div>
      <div className="posts">
        {data?.getAllPosts.map(({ content, creator: { username } }, index) => (
          <div className="card" key={index}>
            <p className="username">{username}</p>
            <p className="content">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
