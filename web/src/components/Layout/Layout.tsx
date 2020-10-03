import React from "react";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="layout">
        <Profile />
        <div className="content-container">{children}</div>
      </div>
    </>
  );
};

export default Layout;
