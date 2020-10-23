import React from "react";
import { FollowDetailsFragment } from "../../generated/graphql";
import UserCard from "../UserCard/UserCard";
import "./Users.scss";

interface Props {
  users: FollowDetailsFragment[];
}

const Users = ({ users }: Props) => {
  // const {}
  if (users.length === 0) {
    return <div className="no-users"></div>;
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
