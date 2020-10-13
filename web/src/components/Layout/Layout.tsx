import React, { useEffect } from "react";
import { useAppContext } from "../../context/context";
import { useGetCurrentUserDetailsQuery } from "../../generated/graphql";
import Profile from "../Profile/Profile";
import SearchTab from "../SearchTab/SearchTab";
import "./Layout.scss";

const Layout: React.FC = ({ children }) => {
  const [{ data }, getUserDetails] = useGetCurrentUserDetailsQuery();
  const { addUserDetails } = useAppContext();

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    if (data?.currentUser) {
      const {
        _id,
        fullname,
        location,
        bio,
        image,
        email,
        username,
      } = data.currentUser;
      addUserDetails({
        _id,
        fullname,
        location,
        bio,
        image,
        email,
        username,
      });
    }
  }, [data]);

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
