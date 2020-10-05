import React from "react";
import { useAppContext } from "../../context/context";
import "./Profile.scss";

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
  console.log(image);
  return (
    <div className="profile">
      <div className="image"></div>
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
