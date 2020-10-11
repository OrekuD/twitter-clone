import React, { createContext, useContext, useEffect, useState } from "react";
import { dummyUserDetails } from "../constants";
import { useGetCurrentUserDetailsQuery } from "../generated/graphql";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppContext, User } from "../types";

const Context = createContext<AppContext>({
  isLoggedIn: false,
  showModal: false,
  setModalState: () => {},
  userDetails: dummyUserDetails,
  setIsLoggedIn: () => {},
  addUserDetails: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userDetails, setUserDetails] = useState<User>(dummyUserDetails);
  const [showModal, setShowModal] = useState(false);
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

  const setModalState = (state: boolean) => {
    setShowModal(state);
  };

  const addUserDetails = (details: Partial<User>) => {
    setUserDetails((prevValue) => {
      return {
        _id: prevValue._id,
        bio: details.bio ? details.bio : prevValue.bio,
        email: details.email ? details.email : prevValue.email,
        fullname: details.fullname ? details.fullname : prevValue.fullname,
        location: details.location ? details.location : prevValue.location,
        username: details.username ? details.username : prevValue.username,
        image: prevValue.image,
      };
    });
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        userDetails,
        setIsLoggedIn,
        addUserDetails,
        showModal,
        setModalState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
