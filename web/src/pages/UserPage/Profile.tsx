import React from "react";
import { Link } from "react-router-dom";
import { ParsedText } from "../../components";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { useAppContext } from "../../context/context";
import {
  useFollowUserMutation,
  UserFullDetailsFragment,
  useUnFollowUserMutation,
} from "../../generated/graphql";
import { Calendar, Location } from "../../Svgs";
import { joinedAt } from "../../utils/dateFormatters";
import { isFollowing } from "../../utils/isFollowing";

interface Props {
  user: UserFullDetailsFragment;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Profile = ({ user, setIsVisible }: Props) => {
  const [, followUser] = useFollowUserMutation();
  const [, unFollowUser] = useUnFollowUserMutation();
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
    image,
  } = user;

  const follow = () => {
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

  const unFollow = () => {
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
    <div className="profile">
      <div className="top-section">
        <img
          className="profile-image"
          src={`${PROFILE_IMAGES_BASE_URL + image}`}
          alt="profile"
        />
        {userDetails?.username === username ? (
          <button
            className="transparent-btn"
            onClick={() => setIsVisible(true)}
          >
            Edit profile
          </button>
        ) : isFollowing(followers, userDetails?._id!) >= 0 ? (
          <button className="ripple-btn" onClick={unFollow}>
            Following
          </button>
        ) : (
          <button className="transparent-btn" onClick={follow}>
            Follow
          </button>
        )}
      </div>
      <div className="profile-details">
        <p className="fullname">{fullname}</p>
        <p className="username">@{username}</p>
        <ParsedText text={bio} isBio />
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
          <Link to={`/${username}/following`}>
            <p className="follow-text">
              <span>{following.length} </span>
              Following
            </p>
          </Link>
          <Link to={`/${username}/followers`}>
            <p className="follow-text">
              <span>{followers.length} </span>
              Followers
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
