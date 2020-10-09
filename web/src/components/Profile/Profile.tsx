import React from "react";
import { useAppContext } from "../../context/context";
import "./Profile.scss";
import { PROFILE_IMAGES_BASE_URL } from "../../constants";

const Profile = () => {
  const {
    userDetails: { bio, email, fullname, image, location, username },
  } = useAppContext();
  return (
    <div className="profile">
      <img
        src={`${PROFILE_IMAGES_BASE_URL + image}`}
        alt="profile"
        className="image"
      />
      <div className="content">
        <p className="fullname">{fullname}</p>
        <p className="username">@{username}</p>
        <p className="bio">{bio}</p>
        <p className="email">{email}</p>
        <p className="location">{location}</p>
      </div>
    </div>
  );
};

export default Profile;
