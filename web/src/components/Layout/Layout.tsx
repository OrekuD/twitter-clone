import React from "react";
import { useAppContext } from "../../context/context";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <Header />
      <div className="layout">
        {isLoggedIn && <Profile />}
        <div className="content-container">{children}</div>
      </div>
    </>
  );
};

export default Layout;
