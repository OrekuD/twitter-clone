import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetUserDetailsQuery } from "../generated/graphql";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppContext, User } from "../types";

const defaultUserDetails = {
  image: "",
  fullname: "",
  username: "",
  bio: "",
  location: "",
  email: "",
  _id: "",
};

const Context = createContext<AppContext>({
  isLoggedIn: false,
  userDetails: defaultUserDetails,
  setUserId: () => {},
  setIsLoggedIn: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userId, setUserId] = useLocalStorage("userId", "0");
  const [userDetails, setUserDetails] = useState<User>(defaultUserDetails);
  const [{ data }, getUserDetails] = useGetUserDetailsQuery({
    variables: { id: userId },
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (data?.getUserDetails.user) {
      const {
        _id,
        fullname,
        location,
        bio,
        image,
        email,
        username,
      } = data.getUserDetails.user;
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
    <Context.Provider
      value={{ isLoggedIn, userDetails, setUserId, setIsLoggedIn }}
    >
      {children}
    </Context.Provider>
  );
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
