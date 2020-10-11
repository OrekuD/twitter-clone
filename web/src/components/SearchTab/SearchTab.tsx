import React from "react";
import { ChatBubble } from "../../Svgs";
import "./SearchTab.scss";

const SearchTab = () => {
  return (
    <div className="search-tab">
      <div className="search-tab-content">
        <div className="search-input-container">
          <ChatBubble size={20} color="#121212" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for posts, or users"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
