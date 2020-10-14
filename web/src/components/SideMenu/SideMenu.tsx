import React, { useEffect } from "react";
import { useAppContext } from "../../context/context";
import "./SideMenu.scss";
import { PROFILE_IMAGES_BASE_URL } from "../../constants";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  HashtagIcon,
  HomeIcon,
  Logo,
  ProfileIcon,
} from "../../Svgs";
import { useGetCurrentUserDetailsQuery } from "../../generated/graphql";

const menu = [
  {
    name: "Home",
    path: "/",
    Icon: HomeIcon,
  },
  {
    name: "Explore",
    path: "/explore",
    Icon: HashtagIcon,
  },
  {
    name: "Profile",
    path: "/profile",
    Icon: ProfileIcon,
  },
];

const SideMenu = () => {
  const [{ data }, getCurrentUser] = useGetCurrentUserDetailsQuery();
  const { isLoggedIn } = useAppContext();
  useEffect(() => {
    getCurrentUser();
  }, [data, getCurrentUser, isLoggedIn]);

  return (
    <div className="side-menu">
      <div className="side-menu-content">
        <div>
          <div className="logo">
            <Logo size={40} color="#ffffff" />
          </div>
          <div className="links">
            {menu.map(({ Icon, name, path }, index) => (
              <NavLink
                to={path}
                activeClassName="active-link"
                exact
                key={index}
              >
                <div className="link">
                  <Icon size={24} />
                  <p>{name}</p>
                </div>
              </NavLink>
            ))}
          </div>
          <button className="ripple-btn">Tweet</button>
        </div>
        {data && (
          <div className="profile">
            <div className="left-content">
              <img
                src={`${PROFILE_IMAGES_BASE_URL + data.currentUser?.image}`}
                alt="profile"
                className="profile-image"
              />
              <div className="profile-details">
                <p className="fullname">{data.currentUser?.fullname}</p>
                <p className="username">@{data.currentUser?.username}</p>
              </div>
            </div>
            <button>
              <ChevronDown size={20} color="#ffffff" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
