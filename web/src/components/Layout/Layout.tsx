import React from "react";
import SideMenu from "../SideMenu/SideMenu";
import SearchTab from "../SearchTab/SearchTab";
import "./Layout.scss";
import { Helmet } from "react-helmet";

const Layout: React.FC<{ title?: string }> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        {title ? <title>{title} / Twitter</title> : <title>Twitter</title>}
      </Helmet>
      <div className="layout">
        <SideMenu />
        <div className="content-container">{children}</div>
        <SearchTab />
      </div>
    </>
  );
};

export default Layout;
