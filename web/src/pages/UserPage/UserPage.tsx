import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Posts, Spinner, StackHeader } from "../../components";
import {
  Post,
  useGetCommentsByUserQuery,
  useGetPostsByUserQuery,
  useGetUserQuery,
} from "../../generated/graphql";
import Profile from "./Profile";
import "./UserPage.scss";

const UserPage = () => {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  const [{ data }, getUser] = useGetUserQuery({
    variables: { username: pathname.slice(1) },
  });

  useEffect(() => {
    getUser();
  }, [getUser, pathname]);

  const [{ data: postsByUser }, getPostsByUser] = useGetPostsByUserQuery({
    variables: {
      userId: data?.getUser.user?._id!,
    },
  });

  const [
    { data: commentsByUser },
    getCommentsByUser,
  ] = useGetCommentsByUserQuery({
    variables: {
      userId: data?.getUser.user?._id!,
    },
  });

  useEffect(() => {
    if (activeIndex === 0) {
      getPostsByUser();
      if (postsByUser) {
        setPosts(postsByUser?.getPostsByUser as Post[]);
      }
    } else if (activeIndex === 1) {
      // console.log("--------");
      getCommentsByUser();
      if (commentsByUser) {
        setPosts([]);
        // setPosts(commentsByUser?.getCommentsByUser as Comment[]);
      }
    }
  }, [activeIndex, getPostsByUser]);

  const tabs = ["Twoots", "Replies", "Likes"];

  if (data?.getUser.error) {
    return (
      <Layout>
        <StackHeader label={pathname.slice(1)} />
        <div className="no-user">
          <p>User is unavailable </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <StackHeader label={pathname.slice(1)} />
      {!data ? (
        <div className="loading-screen">
          <Spinner />
        </div>
      ) : (
        <div className="user-page">
          {data.getUser.user && <Profile user={data.getUser.user} />}
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                className={`tab ${index === activeIndex ? "active" : ""}`}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <Posts posts={posts} />
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
