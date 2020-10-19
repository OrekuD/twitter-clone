import React from "react";
import { useRouteMatch } from "react-router-dom";
import { lightgrey } from "../../constants/colors";
import { SearchIcon } from "../../Svgs";
import Trends from "../Trends/Trends";
import "./SearchTab.scss";

const SearchTab = () => {
  const { path } = useRouteMatch();
  if (path === "/explore") {
    return <div className="search-tab" />;
  }
  return (
    <div className="search-tab">
      <div className="search-tab-content">
        <div className="search-input-container">
          <SearchIcon size={20} color={lightgrey} />
          <input
            type="text"
            className="search-input"
            placeholder="Search Twitter"
          />
        </div>
        <Trends />
      </div>
    </div>
  );
};

export default SearchTab;
