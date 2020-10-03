import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PostCard, Spinner } from "../../components";
import { useGetPostQuery } from "../../generated/graphql";

const Post = () => {
  const { pathname } = useLocation();
  const [{ data }, getPost] = useGetPostQuery({
    variables: { id: pathname.slice(6) },
  });
  useEffect(() => {
    getPost();
  }, [getPost, pathname]);

  if (!data) {
    return (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <PostCard post={data.getPost.post!} />
    </div>
  );
};

export default Post;
