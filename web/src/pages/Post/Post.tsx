import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, PostCard, Spinner } from "../../components";
import { useGetPostQuery } from "../../generated/graphql";
import "./Post.scss";

const Post = () => {
  const { pathname } = useLocation();
  const [{ data }, getPost] = useGetPostQuery({
    variables: { id: pathname.slice(6) },
  });
  useEffect(() => {
    getPost();
  }, [getPost, pathname]);

  let content = (
    <div>
      <PostCard post={data?.getPost.post!} />
    </div>
  );

  if (!data) {
    content = (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  } else {
    content = (
      <div>
        <p>{data.getPost.post?.content}</p>
      </div>
    );
  }

  return <Layout>{content}</Layout>;
};

export default Post;
