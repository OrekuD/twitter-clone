import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Tweet,
  useGetCurrentUserDetailsQuery,
  UserFullDetailsFragment,
} from "../generated/graphql";
import { AppContext } from "../types";

const Context = createContext<AppContext>({
  showCommentModal: false,
  showRetweetModal: false,
  showTweetModal: false,
  showSplashScreen: true,
  selectedTweet: null,
  setSelectedTweet: () => {},
  setShowCommentModal: () => {},
  setShowRetweetModal: () => {},
  setShowTweetModal: () => {},
  setShowSplashScreen: () => {},
  userDetails: null,
});

const Provider: React.FC = ({ children }) => {
  const [
    userDetails,
    setUserDetails,
  ] = useState<UserFullDetailsFragment | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showRetweetModal, setShowRetweetModal] = useState(false);
  const [showTweetModal, setShowTweetModal] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [{ data }, getUserDetails] = useGetCurrentUserDetailsQuery();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    data && setShowSplashScreen(false);
    if (data?.currentUser) {
      const {
        _id,
        fullname,
        location,
        bio,
        image,
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
        username,
        followers,
        following,
        createdAt,
      });
    }
  }, [data]);

  const contextValue: AppContext = {
    userDetails,
    showCommentModal,
    setShowCommentModal,
    selectedTweet,
    setSelectedTweet,
    setShowSplashScreen,
    showSplashScreen,
    showRetweetModal,
    setShowRetweetModal,
    setShowTweetModal,
    showTweetModal,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
