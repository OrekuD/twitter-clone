import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import "./CreatePost.scss";

const CreatePost = () => {
  const {} = useAppContext();
  return (
    <div className="create-post">
      <div className="user-details">
        <div className="profile-image"></div>
        <div className="text-input-container">
          <input type="text" placeholder="Say something" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
