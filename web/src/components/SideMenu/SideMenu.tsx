import React from "react";
import "./SideMenu.scss";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { NavLink } from "react-router-dom";
import {
  ChevronDown,
  HashtagIcon,
  HomeIcon,
  Logo,
  NotificationIcon,
  ProfileIcon,
  TweetIcon,
} from "../../Svgs";
import { useAppContext } from "../../context/context";
import Popup from "reactjs-popup";
import { deeppurple, lightgrey } from "../../constants/colors";

const SideMenu = () => {
  const { userDetails, setShowTweetModal } = useAppContext();

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
      name: "Notifications",
      path: "/notifications",
      Icon: NotificationIcon,
    },
    {
      name: "Profile",
      path: `/${userDetails?.username}`,
      Icon: ProfileIcon,
    },
  ];

  return (
    <>
      <div className="side-menu">
        <div className="side-menu-content">
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
          <button
            className="ripple-btn"
            onClick={() => setShowTweetModal(true)}
          >
            Tweet
          </button>
          <button
            className="ripple-btn tweet-btn"
            onClick={() => setShowTweetModal(true)}
          >
            <TweetIcon color="#fff" size={24} />
          </button>
          {userDetails?.username && (
            <Popup
              trigger={
                <div className="profile">
                  <div className="left-content">
                    <img
                      src={`${PROFILE_IMAGES_BASE_URL + userDetails.image}`}
                      alt="profile"
                      className="profile-image"
                    />
                    <div className="profile-details">
                      <p className="fullname">{userDetails.fullname}</p>
                      <p className="username">@{userDetails.username}</p>
                    </div>
                  </div>
                  <div className="chevron">
                    <ChevronDown size={20} color="#ffffff" />
                  </div>
                </div>
              }
              position={window.innerWidth > 1230 ? "top left" : "top left"}
              repositionOnResize
              contentStyle={{
                backgroundColor: deeppurple,
                borderColor: lightgrey,
                borderWidth: 1,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {(close: () => void) => (
                <div>
                  <div className="popup-menu-item">
                    Log out @{userDetails.username}
                  </div>
                  <div className="popup-menu-item">
                    Log out @{userDetails.username}
                  </div>
                </div>
              )}
            </Popup>
          )}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
