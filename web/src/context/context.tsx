import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyUserDetails } from "../constants";
import { Post, useGetCurrentUserDetailsQuery } from "../generated/graphql";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppContext, User } from "../types";

const Context = createContext<AppContext>({
  isLoggedIn: false,
  showCommentModal: false,
  selectedPost: null,
  setSelectedPost: () => {},
  setCommentModalState: () => {},
  userDetails: dummyUserDetails,
  setIsLoggedIn: () => {},
  addUserDetails: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userDetails, setUserDetails] = useState<User>(dummyUserDetails);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [{ data }, getUserDetails] = useGetCurrentUserDetailsQuery();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    if (data?.currentUser) {
      const {
        _id,
        fullname,
        location,
        bio,
        image,
        email,
        username,
      } = data.currentUser;
      setUserDetails({
        _id,
        fullname,
        location,
        bio,
        image,
        email,
        username,
      });
    }
  }, [data]);

  const setCommentModalState = (state: boolean) => {
    setShowCommentModal(state);
  };

  const addUserDetails = (details: Partial<User>) => {
    setUserDetails((prevValue) => {
      return {
        _id: prevValue._id,
        bio: details.bio || prevValue.bio,
        email: details.email || prevValue.email,
        fullname: details.fullname || prevValue.fullname,
        location: details.location || prevValue.location,
        username: details.username || prevValue.username,
        image: prevValue.image,
      };
    });
  };

  const contextValue: AppContext = {
    isLoggedIn,
    userDetails,
    setIsLoggedIn,
    addUserDetails,
    showCommentModal,
    setCommentModalState,
    selectedPost,
    setSelectedPost,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
