import React from "react";
import { useAppContext } from "../../context/context";
import "./Profile.scss";
import { PROFILE_IMAGES_BASE_URL } from "../../constants";

const Profile = () => {
  const { userDetails } = useAppContext();

  if (!userDetails) {
    return null;
  }

  const { bio, email, fullname, image, location, username } = userDetails;

  return (
    <div className="profile">
      {image && (
        <img
          src={`${PROFILE_IMAGES_BASE_URL + image}`}
          alt="profile"
          className="image"
        />
      )}
      <div className="content">
        <p className="fullname">{fullname}</p>
        {username && <p className="username">@{username}</p>}
        <p className="bio">{bio}</p>
        <p className="email">{email}</p>
        <p className="location">{location}</p>
      </div>
    </div>
  );
};

export default Profile;
