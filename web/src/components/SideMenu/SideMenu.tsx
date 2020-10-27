import React, { useEffect, useState } from "react";
import "./SideMenu.scss";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { NavLink } from "react-router-dom";
import {
  Cancel,
  ChevronDown,
  HashtagIcon,
  HomeIcon,
  Logo,
  ProfileIcon,
} from "../../Svgs";
import { useGetCurrentUserDetailsQuery } from "../../generated/graphql";
import Modal from "../Modal/Modal";
import { blue } from "../../constants/colors";
import CreateTweet from "../CreateTweet/CreateTweet";

const menu = [
  {
    name: "Home",
    path: "/home",
    Icon: HomeIcon,
  },
  {
    name: "Explore",
    path: "/explore",
    Icon: HashtagIcon,
  },
  {
    name: "Profile",
    path: "",
    Icon: ProfileIcon,
  },
];

const SideMenu = () => {
  const [{ data }, getCurrentUser] = useGetCurrentUserDetailsQuery();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <div className="side-menu">
        <div className="side-menu-content">
          <div>
            <div className="logo">
              <Logo size={40} color="#ffffff" />
            </div>
            <div className="links">
              {menu.map(({ Icon, name, path }, index) => (
                <NavLink
                  to={path || `/${data?.currentUser?.username}`}
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
            <button className="ripple-btn" onClick={() => setIsVisible(true)}>
              Tweet
            </button>
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
      <Modal isVisible={isVisible} onClose={() => setIsVisible(false)}>
        <div className="modal-header">
          <button className="icon-wrapper" onClick={() => setIsVisible(false)}>
            <Cancel size={24} color={blue} />
          </button>
        </div>
        <div className="create-tweet-modal">
          <CreateTweet setIsVisible={setIsVisible} />
        </div>
      </Modal>
    </>
  );
};

export default SideMenu;
