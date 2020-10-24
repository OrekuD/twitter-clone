import React from "react";
import { FollowDetailsFragment } from "../../generated/graphql";
import UserCard from "../UserCard/UserCard";
import "./Users.scss";

const Users = ({ users }: { users: FollowDetailsFragment[] }) => {
  if (users.length === 0) {
    return (
      <div className="no-users">
        <p>None</p>
      </div>
    );
  }

  return (
    <div className="users">
      {users.map((user, index) => (
        <UserCard user={user} key={index} />
      ))}
    </div>
  );
};

export default Users;
