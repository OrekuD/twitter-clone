import React from "react";
import { Post } from "../../generated/graphql";
import PostCard from "../PostCard/PostCard";
import Spinner from "../Spinner/Spinner";
import "./Posts.scss";

interface Props {
  posts: Post[] | undefined;
}

const Posts = ({ posts }: Props) => {
  let content;
  if (typeof posts === "undefined") {
    content = (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  } else if (posts.length === 0) {
    content = <p className="no-tweets">No tweets</p>;
  } else {
    content = (
      <>
        {posts.map((post, index) => (
          <PostCard post={post} />
        ))}
      </>
    );
  }
  return <div className="posts">{content}</div>;
};

export default Posts;
