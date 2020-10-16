import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyUserDetails } from "../constants/constants";
import {
  Tweet,
  useGetCurrentUserDetailsQuery,
  UserFullDetailsFragment,
} from "../generated/graphql";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppContext } from "../types";

const Context = createContext<AppContext>({
  isLoggedIn: false,
  showCommentModal: false,
  selectedTweet: null,
  setSelectedTweet: () => {},
  setCommentModalState: () => {},
  userDetails: dummyUserDetails,
  setIsLoggedIn: () => {},
  addUserDetails: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userDetails, setUserDetails] = useState<UserFullDetailsFragment>(
    dummyUserDetails
  );
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [{ data }, getUserDetails] = useGetCurrentUserDetailsQuery();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    setIsLoggedIn(isLoggedIn);
  }, []);

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
        followers,
        following,
        createdAt,
      } = data.currentUser;
      setUserDetails({
        _id,
        fullname,
        location,
        bio,
        image,
        email,
        username,
        createdAt,
        followers,
        following,
      });
    }
  }, [data]);

  const setCommentModalState = (state: boolean) => {
    setShowCommentModal(state);
  };

  const addUserDetails = (details: Partial<UserFullDetailsFragment>) => {
    setUserDetails((prevValue) => {
      return {
        _id: prevValue._id,
        image: prevValue.image,
        followers: prevValue.followers,
        following: prevValue.following,
        createdAt: prevValue.createdAt,
        bio: details.bio || prevValue.bio,
        email: details.email || prevValue.email,
        fullname: details.fullname || prevValue.fullname,
        location: details.location || prevValue.location,
        username: details.username || prevValue.username,
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
    selectedTweet,
    setSelectedTweet,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
