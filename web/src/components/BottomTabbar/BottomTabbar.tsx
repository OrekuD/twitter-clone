import React from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/context";
import {
  HomeIcon,
  NotificationIcon,
  ProfileIcon,
  SearchIcon,
} from "../../Svgs";
import "./BottomTabbar.scss";

const BottomTabbar = () => {
  const { userDetails } = useAppContext();
  const menu = [
    {
      name: "Home",
      path: "/home",
      Icon: HomeIcon,
    },
    {
      name: "Explore",
      path: "/explore",
      Icon: SearchIcon,
    },

    {
      name: "Notifications",
      path: "/notifications",
      Icon: NotificationIcon,
    },
    {
      name: "Profile",
      path: "",
      Icon: ProfileIcon,
    },
  ];
  return (
    <div className="bottom-tabbar">
      {menu.map(({ Icon, name, path }, index) => (
        <NavLink
          to={path || `/${userDetails?.username}`}
          activeClassName="active-link"
          exact
          key={index}
        >
          <div className="tab-icon" key={index}>
            <Icon size={24} />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default BottomTabbar;
