import React from "react";
// import { useAppContext } from "../../context/context";
import Profile from "../Profile/Profile";
import SearchTab from "../SearchTab/SearchTab";
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  // const { isLoggedIn } = useAppContext();
  return (
    <>
      <div className="layout">
        <Profile />
        <div className="content-container">{children}</div>
        <SearchTab />
      </div>
    </>
  );
};

export default Layout;
