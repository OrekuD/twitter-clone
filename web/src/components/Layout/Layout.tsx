import React from "react";
import { useAppContext } from "../../context/context";
import Profile from "../Profile/Profile";
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <div className="layout">
        <Profile />
        <div className="content-container">{children}</div>
      </div>
    </>
  );
};

export default Layout;
