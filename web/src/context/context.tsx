import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Tweet,
  useGetCurrentUserDetailsQuery,
  UserFullDetailsFragment,
} from "../generated/graphql";
import { AppContext, ImageDetails, ModalTypes } from "../types";

const Context = createContext<AppContext>({
  selectedTweet: null,
  userDetails: null,
  currentModal: null,
  selectedImageDetails: null,
  showSplashScreen: true,
  setCurrentModal: () => {},
  setSelectedTweet: () => {},
  setShowSplashScreen: () => {},
  setSelectedImageDetails: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [
    userDetails,
    setUserDetails,
  ] = useState<UserFullDetailsFragment | null>(null);
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null);
  const [
    selectedImageDetails,
    setSelectedImageDetails,
  ] = useState<ImageDetails>(null);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [{ data, fetching }, getUserDetails] = useGetCurrentUserDetailsQuery();
  const { replace } = useHistory();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    data && setShowSplashScreen(false);
    if (!fetching && !data?.currentUser) {
      // TODO: replace with "/login" route rather??
      replace("/");
    } else if (!fetching && data?.currentUser) {
      setUserDetails(data.currentUser);
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
    selectedImageDetails,
    setSelectedImageDetails,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
