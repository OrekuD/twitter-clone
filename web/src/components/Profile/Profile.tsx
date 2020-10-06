import React from "react";
import { useAppContext } from "../../context/context";
import "./Profile.scss";
import Image from "../../assets/images/dummy.jpg";
import { PROFILE_IMAGES_BASE_URL } from "../../constants";

// const sampleData = {
//   _id: "0",
//   username: "OrekuD",
//   fullname: "David Opoku",
//   location: "Accra, Ghana",
//   bio:
//     "I'm just a sucker for pain. Sint adipisicing culpa cupidatat adipisicing ea pariatur. Aute nisi reprehenderit cupidatat labore non mollit mollit dolor.",
// };

const Profile = () => {
  // const { fullname, location, bio, username } = sampleData;
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
