import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useAppContext } from "../../context/context";
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
  const { userDetails } = useAppContext();
  if (users.length === 0) {
    return (
      <div className="welcome">
        {followingPage ? (
          userDetails?.username === username ? (
            <>
              <p className="main-title">You aren't following anyone yet</p>
              <p className="sub-title">
                When you do, they'll be listed here and you'll see their Tweets
                in your timeline.
              </p>
            </>
          ) : (
            <>
              <p className="main-title">@{username} isn't following anyone</p>
              <p className="sub-title">When they do, they'll be listed here.</p>
            </>
          )
        ) : userDetails?.username === username ? (
          <>
            <p className="main-title">You don't have any followers yet</p>
            <p className="sub-title">
              When someone follows you, you'll see them here.
            </p>
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
