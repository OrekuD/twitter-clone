import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../generated/graphql";
import { FavouriteFilled, Favourite, ChatBubble, Share } from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import "./PostCard.scss";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const {
    _id,
    content,
    createdAt,
    creator: { username },
    comments,
  } = post;

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
        <button className="icon">
          {false ? (
            <FavouriteFilled size={18} color="#121212" />
          ) : (
            <Favourite size={18} color="#121212" />
          )}
        </button>
        <button className="icon">
          <ChatBubble size={18} color="#121212" />
        </button>
        <button className="icon" onClick={share}>
          <p className="count">{comments.length}</p>
          <Share size={18} color="#121212" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
