import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../generated/graphql";
import { FavouriteFilled, Favourite, ChatBubble, Share } from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import TimeAgo from "react-timeago";
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
    // comments,
  } = post;

  const share = () => {
    let newVariable = window.navigator as any;
    if (newVariable.share) {
      newVariable
        .share({
          title: "title",
          text: "description",
          url: "https://soch.in//",
        })
        .then(() => console.log("Successful share"))
        .catch((error: any) => console.log("Error sharing", error));
    } else {
      alert("share not supported");
    }
  };

  return (
    <div className="card">
      <p className="username">{username}</p>
      <Link to={`/post/${_id}`}>
        <p className="content">{content}</p>
      </Link>
      <p>{timeSince(new Date(createdAt))}</p>
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
          <Share size={18} color="#121212" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
