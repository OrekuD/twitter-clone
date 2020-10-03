import React, { createContext, useContext } from "react";
import { AppContext } from "../types";

const Context = createContext<AppContext>({});

const Provider: React.FC = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
