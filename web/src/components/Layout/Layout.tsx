import React from "react";
import CreateComment from "../CreateComment/CreateComment";
import SideMenu from "../SideMenu/SideMenu";
import SearchTab from "../SearchTab/SearchTab";
import "./Layout.scss";
import CreateRetweet from "../CreateRetweet/CreateRetweet";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="layout">
        <SideMenu />
        <div className="content-container">{children}</div>
        <SearchTab />
        <CreateComment />
        <CreateRetweet />
      </div>
    </>
  );
};

export default Layout;
