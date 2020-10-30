import React from "react";
import CreateComment from "../CreateComment/CreateComment";
import SideMenu from "../SideMenu/SideMenu";
import SearchTab from "../SearchTab/SearchTab";
import "./Layout.scss";
import { Helmet } from "react-helmet";
import CreateRetweet from "../CreateRetweet/CreateRetweet";
import { CreateTweetModal } from "../CreateTweet";

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
      <CreateComment />
      <CreateRetweet />
      <CreateTweetModal />
    </>
  );
};

export default Layout;
