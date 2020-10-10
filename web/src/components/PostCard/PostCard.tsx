import React from "react";
import { Link } from "react-router-dom";
import { defaultUserDetails } from "../../constants";
import { useAppContext } from "../../context/context";
import {
  Like,
  Post,
  useLikePostMutation,
  useUnLikePostMutation,
  User,
} from "../../generated/graphql";
import { FavouriteFilled, Favourite, ChatBubble, Share } from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import { userLiked } from "../../utils/userLiked";
import "./PostCard.scss";

interface Props {
  post: any; // TODO: fix this
}

const PostCard = ({ post }: Props) => {
  const {
    _id,
    content,
    createdAt,
    creator: { username },
    comments,
    likes,
  } = post as Post;
  const [, likePost] = useLikePostMutation();
  const [, unlikePost] = useUnLikePostMutation();
  const {
    userDetails: { _id: userId },
  } = useAppContext();

  const url = "https://weconnect.netlify.app";

  const share = async () => {
    let newVariable = window.navigator as any;
    if (newVariable.share) {
      await newVariable.share({
        title: "WeConnect",
        text: "Check out this post",
        url: `${url}/post/${_id}`,
      });
    } else {
      alert("share not supported");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="image"></div>
        <div className="profile-details">
          <p className="fullname">David Opoku</p>
          <div className="row">
            <p className="username">@{username}</p>
            <div className="dot" />
            <p className="username">{timeSince(new Date(createdAt))}</p>
          </div>
        </div>
      </div>
      <Link to={`/post/${_id}`}>
        <p className="content">{content}</p>
      </Link>
      <div className="icons">
        <button
          className="icon"
          onClick={() => {
            if (userLiked(likes, userId) >= 0) {
              likes.splice(userLiked(likes, userId), 1);
            } else {
              likes.unshift({
                _id: Math.random().toString(),
                creatorId: userId,
                postId: _id,
                creator: defaultUserDetails,
              });
            }
            likePost({
              postId: _id,
            });
          }}
        >
          {userLiked(likes, userId) >= 0 ? (
            <FavouriteFilled size={14} color="#b00020" />
          ) : (
            <Favourite size={14} color="#121212" />
          )}

          {likes.length > 0 && <p className="count">{likes.length}</p>}
        </button>
        <button className="icon">
          <ChatBubble size={14} color="#121212" />
          {comments.length > 0 && <p className="count">{comments.length}</p>}
        </button>
        <button className="icon" onClick={share}>
          <Share size={14} color="#121212" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
