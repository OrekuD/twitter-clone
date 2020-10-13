import React from "react";
import { grey } from "../../constants/colors";
import { SearchIcon } from "../../Svgs";
import "./SearchTab.scss";

const SearchTab = () => {
  return (
    <div className="search-tab">
      <div className="search-tab-content">
        <div className="search-input-container">
          <SearchIcon size={18} color={grey} />
          <input
            type="text"
            className="search-input"
            placeholder="Search posts, users"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchTab;
