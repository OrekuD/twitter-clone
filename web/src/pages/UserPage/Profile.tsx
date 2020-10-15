import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../generated/graphql";
import { Calendar, Location } from "../../Svgs";
import { joinedAt } from "../../utils/dateFormatters";

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  const { bio, createdAt, username, fullname, location } = user;
  return (
    <div className="profile">
      <div className="top-section">
        <div className="profile-image"></div>
        <button className="ripple-btn">Follow</button>
      </div>
      <div className="profile-details">
        <p className="fullname">{fullname}</p>
        <p className="username">@{username}</p>
        <p className="bio">
          {bio.split("\n").map((str) => {
            if (!str) {
              return " ";
            } else {
              return str.split(" ").map((substr) => {
                if (substr[0] === "@") {
                  return (
                    <Link to={`/${substr.slice(1)}`} key={Math.random()}>
                      <span className="link">{" " + substr + " "}</span>
                    </Link>
                  );
                } else if (substr[0] === "#") {
                  return (
                    <span className="link" key={Math.random()}>
                      {" " + substr + " "}
                    </span>
                  );
                } else {
                  return <span key={Math.random()}> {substr} </span>;
                }
              });
            }
          })}
        </p>
        <div className="links">
          {location && (
            <div className="row">
              <Location color="grey" size={18} />
              <p>{location}</p>
            </div>
          )}
          <div className="row">
            <Calendar color="grey" size={18} />
            <p>{joinedAt(createdAt)}</p>
          </div>
        </div>
        <div className="bottom-section">
          <p className="follow-text">
            <span>455 </span>
            Following
          </p>
          <p className="follow-text">
            <span>344 </span>
            Followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
