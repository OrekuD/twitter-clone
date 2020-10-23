import React from "react";
import CreateComment from "../CreateComment/CreateComment";
import SideMenu from "../SideMenu/SideMenu";
import SearchTab from "../SearchTab/SearchTab";
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="layout">
        <SideMenu />
        <div className="content-container">{children}</div>
        <SearchTab />
        <CreateComment />
      </div>
    </>
  );
};

export default Layout;
