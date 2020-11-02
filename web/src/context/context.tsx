import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Tweet,
  useGetCurrentUserDetailsQuery,
  UserFullDetailsFragment,
} from "../generated/graphql";
import { AppContext, ModalTypes } from "../types";

const Context = createContext<AppContext>({
  selectedTweet: null,
  userDetails: null,
  currentModal: null,
  showSplashScreen: true,
  setCurrentModal: () => {},
  setSelectedTweet: () => {},
  setShowSplashScreen: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [
    userDetails,
    setUserDetails,
  ] = useState<UserFullDetailsFragment | null>(null);
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [{ data, fetching }, getUserDetails] = useGetCurrentUserDetailsQuery();
  const { replace, location } = useHistory();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    data && setShowSplashScreen(false);
    if (!fetching && !data?.currentUser) {
      // console.log({ location });
      // replace with "/login" route rather??
      replace("/");
    } else if (!fetching && data?.currentUser) {
      const {
        _id,
        fullname,
        location,
        bio,
        profileImage,
        headerImage,
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
        profileImage,
        headerImage,
        username,
        followers,
        following,
        createdAt,
      });
    }
  }, [data]);

  const contextValue: AppContext = {
    userDetails,
    selectedTweet,
    setSelectedTweet,
    setShowSplashScreen,
    showSplashScreen,
    currentModal,
    setCurrentModal,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
