import React from "react";
import { useRouteMatch } from "react-router-dom";
import { FollowDetailsFragment } from "../../generated/graphql";
import UserCard from "../UserCard/UserCard";
import "./Users.scss";

interface Props {
  users: FollowDetailsFragment[];
  followingPage?: boolean;
}

const Users = ({ users, followingPage }: Props) => {
  const {
    params: { username },
  } = useRouteMatch<{ username: string }>();
  if (users.length === 0) {
    return (
      <div className="no-users">
        {followingPage ? (
          <>
            <p className="main-title">@{username} isn't following anyone</p>
            <p className="sub-title">When they do, they'll be listed here.</p>
          </>
        ) : (
          <>
            <p className="main-title">@{username} doesn't have any followers</p>
            <p className="sub-title">When they have, they'll be listed here.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {users.map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
    </div>
  );
};

export default Users;
