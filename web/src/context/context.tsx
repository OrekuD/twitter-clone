import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppContext } from "../types";

const defaultUserDetails = {
  image: "",
  fullname: "",
  username: "",
  bio: "",
  location: "",
  email: "",
};

const Context = createContext<AppContext>({
  isLoggedIn: false,
  userDetails: defaultUserDetails,
  setUserDetails: () => {},
  setIsLoggedIn: () => {},
});

const Provider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [userDetails, setUserDetails] = useLocalStorage(
    "isLoggedIn",
    defaultUserDetails
  );

  return (
    <Context.Provider
      value={{ isLoggedIn, userDetails, setUserDetails, setIsLoggedIn }}
    >
      {children}
    </Context.Provider>
  );
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
