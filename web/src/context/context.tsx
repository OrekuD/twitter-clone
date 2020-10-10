import React, { createContext, useContext, useEffect, useState } from "react";
import { defaultUserDetails } from "../constants";
import { useGetCurrentUserDetailsQuery } from "../generated/graphql";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppContext, User } from "../types";

const Context = createContext<AppContext>({
  isLoggedIn: false,
  userDetails: defaultUserDetails,
  setIsLoggedIn: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userDetails, setUserDetails] = useState<User>(defaultUserDetails);
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

  return (
    <Context.Provider value={{ isLoggedIn, userDetails, setIsLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
