import React from "react";
import {
  FollowDetailsFragment,
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../../generated/graphql";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import "./UserCard.scss";
import ParsedText from "../ParsedText/ParsedText";
import { useHistory } from "react-router-dom";
import { isFollowing } from "../../utils/isFollowing";
import { useAppContext } from "../../context/context";

interface Props {
  user: FollowDetailsFragment;
}

const UserCard = ({ user }: Props) => {
  const [, followUser] = useFollowUserMutation();
  const [, unFollowUser] = useUnFollowUserMutation();
  const {
    _id,
    bio,
    fullname,
    profileImage,
    username,
    followers,
    following,
  } = user;
  const { userDetails } = useAppContext();
  const history = useHistory();

  const follow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    // Mutate array on client side to show user an immediate visual feedback
    if (isFollowing(followers, userDetails?._id!) >= 0) {
      followers.splice(isFollowing(followers, userDetails?._id!), 1);
    } else {
      followers.unshift({
        _id: userDetails?._id!,
      } as any);
    }

    // Call follow user mutation
    followUser({
      userId: _id,
    });
  };

  const unFollow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    // Mutate array on client side to show user an immediate visual feedback
    if (isFollowing(followers, userDetails?._id!) >= 0) {
      followers.splice(isFollowing(followers, userDetails?._id!), 1);
    } else {
      followers.unshift({
        creatorId: userDetails?._id!,
      } as any);
    }

    // Call unfollow user mutation
    unFollowUser({
      userId: _id,
    });
  };

  return (
    <div
      className="user-card-container"
      onClick={() => history.push(`/${username}`)}
    >
      <img
        src={`${PROFILE_IMAGES_BASE_URL + profileImage}`}
        alt="profile"
        className="profile-image"
      />
      <div className="user-card-content">
        <div className="user-card-header">
          <div>
            <p className="fullname">{fullname}</p>
            <p className="username">
              @{username}{" "}
              {userDetails?._id === _id ? null : isFollowing(
                  following,
                  userDetails?._id!
                ) >= 0 ? (
                <span className="follows-you">follows you</span>
              ) : null}
            </p>
          </div>
          {userDetails?._id === _id ? null : isFollowing(
              followers,
              userDetails?._id!
            ) >= 0 ? (
            <button className="ripple-btn" onClick={unFollow}>
              Following
            </button>
          ) : (
            <button className="transparent-btn" onClick={follow}>
              Follow
            </button>
          )}
        </div>
        <ParsedText text={bio} />
      </div>
    </div>
  );
};

export default UserCard;
