import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useAppContext } from "../../context/context";
import {
  useFollowerUserMutation,
  UserFullDetailsFragment,
  useUnFollowerUserMutation,
} from "../../generated/graphql";
import { Calendar, Location } from "../../Svgs";
// import { User } from "../../types";
import { joinedAt } from "../../utils/dateFormatters";
import { isFollowing } from "../../utils/isFollowing";

interface Props {
  user: UserFullDetailsFragment;
}

const Profile = ({ user }: Props) => {
  const [, followerUser] = useFollowerUserMutation();
  const [, unFollowerUser] = useUnFollowerUserMutation();
  const { userDetails } = useAppContext();
  const {
    bio,
    createdAt,
    username,
    fullname,
    location,
    followers,
    following,
    _id,
  } = user;
  return (
    <div className="profile">
      <div className="top-section">
        <div className="profile-image"></div>
        {userDetails.username === username ? (
          <button className="ripple-btn">Edit Profile</button>
        ) : isFollowing(followers, userDetails._id) >= 0 ? (
          <button
            className="ripple-btn"
            onClick={async () => {
              const res = await unFollowerUser({ userId: _id });
              alert(res.data?.unFollowUser);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="ripple-btn"
            onClick={async () => {
              const res = await followerUser({ userId: _id });
              alert(res.data?.followUser);
            }}
          >
            Follow
          </button>
        )}
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
            <span>{following.length} </span>
            Following
          </p>
          <p className="follow-text">
            <span>{followers.length} </span>
            Followers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
