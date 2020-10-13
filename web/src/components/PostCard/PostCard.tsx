import React from "react";
import { Link } from "react-router-dom";
import { dummyUserDetails } from "../../constants";
import { grey } from "../../constants/colors";
import { useAppContext } from "../../context/context";
import { Post, useLikePostMutation } from "../../generated/graphql";
import {
  FavouriteFilled,
  Favourite,
  ChatBubble,
  Share,
  ChevronDown,
} from "../../Svgs";
import { timeSince } from "../../utils/timeSince";
import { userLiked } from "../../utils/userLiked";
import "./PostCard.scss";

interface Props {
  post: any; // TODO: fix this
  nolink?: boolean;
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
  const {
    userDetails: { _id: userId },
    setCommentModalState,
    setSelectedPost,
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

  const commentPost = () => {
    setSelectedPost(post);
    setCommentModalState(true);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="image"></div>
        <Link to={`/${username}`}>
          <div className="profile-details">
            <p className="fullname">David Opoku</p>
            <div className="row">
              <p className="username">@{username}</p>
              <div className="dot" />
              <p className="username">{timeSince(new Date(createdAt))}</p>
            </div>
          </div>
        </Link>
        <div className="view-tweet">
          <Link to={`/post/${_id}`}>
            <ChevronDown size={12} color={grey} />
          </Link>
        </div>
      </div>
      <p className="content">
        {content.split("\n").map((str) => {
          if (!str) {
            return <br key={Math.random()} />;
          } else {
            return str.split(" ").map((substr) => {
              if (substr[0] === "@") {
                return (
                  <Link to={`/${substr.slice(1)}`} key={Math.random()}>
                    <span className="link">{" " + substr + " "}</span>
                  </Link>
                );
              } else if (substr[0] === "#") {
                return (
                  <span className="link" key={Math.random()}>
                    {" " + substr + " "}
                  </span>
                );
              } else {
                return <span key={Math.random()}> {substr} </span>;
              }
            });
          }
        })}
      </p>
      <div className="icons">
        <button
          className="icon"
          onClick={async () => {
            // Mutate array on client side just for visual feedback
            if (userLiked(likes, userId) >= 0) {
              likes.splice(userLiked(likes, userId), 1);
            } else {
              likes.unshift({
                _id: Math.random().toString(),
                creatorId: userId,
                postId: _id,
                creator: dummyUserDetails,
              });
            }
            await likePost({
              postId: _id,
            });
          }}
        >
          {userLiked(likes, userId) >= 0 ? (
            <FavouriteFilled size={18} color="#b00020" />
          ) : (
            <Favourite size={18} color={grey} />
          )}

          {likes.length > 0 && <p className="count">{likes.length}</p>}
        </button>
        <button className="icon" onClick={commentPost}>
          <ChatBubble size={18} color={grey} />
          {comments.length > 0 && <p className="count">{comments.length}</p>}
        </button>
        <button className="icon" onClick={share}>
          <Share size={18} color={grey} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
