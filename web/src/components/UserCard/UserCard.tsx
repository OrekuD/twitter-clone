import React from "react";
import { FollowDetailsFragment } from "../../generated/graphql";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import "./UserCard.scss";
import ParseText from "../ParseText/ParseText";
import { useHistory } from "react-router-dom";
import { isFollowing } from "../../utils/isFollowing";
import { useAppContext } from "../../context/context";

interface Props {
  user: FollowDetailsFragment;
}

const UserCard = ({ user }: Props) => {
  const { _id, bio, fullname, image, username, followers, following } = user;
  const { userDetails } = useAppContext();
  const history = useHistory();
  // console.log(userDetails._id === _id);
  console.log({
    myId: userDetails?._id,
    hisId: _id,
  });
  console.log(userDetails);
  return (
    <div
      className="user-card-container"
      onClick={() => history.push(`/${username}`)}
    >
      <img
        src={`${PROFILE_IMAGES_BASE_URL + image}`}
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
                  userDetails?.followers!,
                  _id
                ) ? (
                <span className="follows-you">follows you</span>
              ) : null}
            </p>
          </div>
          {userDetails?._id === _id ? null : isFollowing(
              userDetails?.following!,
              _id
            ) ? (
            <button className="ripple-btn" onClick={(e) => e.stopPropagation()}>
              Following
            </button>
          ) : (
            <button
              className="transparent-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Follow
            </button>
          )}
        </div>
        <ParseText text={bio} />
      </div>
    </div>
  );
};

export default UserCard;
