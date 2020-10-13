import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Modal, Posts, Spinner, StackHeader } from "../../components";
import {
  Post,
  // useGetPostsByUserQuery,
  // useGetUserQuery,
} from "../../generated/graphql";
import Profile from "./Profile";
import "./UserPage.scss";

const UserPage = () => {
  const { pathname } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalState, setModalState] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();

  // const [{ data }, getUser] = useGetUserQuery({
  //   variables: { username: pathname.slice(1) },
  // });

  // useEffect(() => {
  //   getUser();
  // }, [getUser, pathname]);

  // const [{ data: postsByUser }, getPostsByUser] = useGetPostsByUserQuery({
  //   variables: {
  //     userId: data?.getUser.user?._id!,
  //   },
  // });

  // useEffect(() => {
  //   getPostsByUser();
  //   if (postsByUser) {
  //     setPosts(postsByUser?.getPostsByUser as Post[]);
  //     console.log(postsByUser.getPostsByUser);
  //   }
  // }, [activeIndex, postsByUser]);

  const tabs = ["Twoots", "Replies", "Likes"];

  // if (data?.getUser.error) {
  //   return (
  //     <Layout>
  //       <StackHeader label={pathname.slice(1)} />
  //       <div className="no-user">
  //         <p>User is unavailable </p>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <StackHeader label={pathname.slice(1)} />

      {/* <Modal isVisible={modalState} onClose={() => setModalState(false)}>
        <p>{selectedPost?.content}</p>
      </Modal> */}
    </Layout>
  );
};

export default UserPage;
