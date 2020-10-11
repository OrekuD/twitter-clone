import React from "react";
import { AllPostsQuery } from "../../generated/graphql";
import PostCard from "../PostCard/PostCard";
import Spinner from "../Spinner/Spinner";
import "./Posts.scss";

interface Props {
  data: AllPostsQuery | undefined;
}

const Posts = ({ data }: Props) => {
  return (
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
  );
};

export default Posts;
