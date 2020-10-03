import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "urql";
import { PostCard, Spinner } from "../../components";
import { useGetPostQuery } from "../../generated/graphql";

const QUERY = `
query GetPost($id: String!) {
    getPost(id: $id) {
      post {
        _id
        content
        createdAt
        comments
        likes
        comments
        creator {
          _id
          username
          createdAt
        }
      }
      error {
        message
        field
      }
    }
  }
  
`;

const Post = () => {
  const { pathname } = useLocation();
  const [{ data }, getPost] = useQuery({
    query: QUERY,
    variables: { id: pathname.slice(6) },
  });
  useEffect(() => {
    // console.log({ id: pathname.slice(6) });
    getPost({ variables: { id: pathname.slice(6) } });
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
