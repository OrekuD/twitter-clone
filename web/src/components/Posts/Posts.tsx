import React from "react";
import { Post } from "../../generated/graphql";
import PostCard from "../PostCard/PostCard";
import Spinner from "../Spinner/Spinner";
import "./Posts.scss";

interface Props {
  posts: Post[] | undefined;
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="posts">
      {posts && posts.length > 0 ? (
        <>
          {posts.map((post, index) => (
            <PostCard post={post} />
          ))}
        </>
      ) : (
        <div className="loading-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Posts;
