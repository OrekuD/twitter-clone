import React from "react";
import { useAppContext } from "../../context/context";
import "./SideMenu.scss";
import { PROFILE_IMAGES_BASE_URL } from "../../constants";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HashtagIcon,
  HomeIcon,
  Logo,
  ProfileIcon,
} from "../../Svgs";

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
  return (
    <div className="side-menu">
      <div className="side-menu-content">
        <Logo size={40} color="#ffffff" />
        <div className="links">
          {menu.map(({ Icon, name, path }, index) => (
            <div className="link" key={index}>
              <Icon size={24} color="#ffffff" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
