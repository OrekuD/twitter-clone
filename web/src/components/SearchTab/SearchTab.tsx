import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { lightgrey } from "../../constants/colors";
import { SearchIcon } from "../../Svgs";
import Trends from "../Trends/Trends";
import "./SearchTab.scss";

const SearchTab = () => {
  const { path } = useRouteMatch();
  const { push } = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="search-tab">
      {path === "/explore" ? null : (
        <>
          <div className="search-tab-content">
            <div className="search-input-container">
              <SearchIcon size={20} color={lightgrey} />
              <input
                type="text"
                className="search-input"
                placeholder="Search Twitter"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    if (!searchTerm) {
                      return;
                    }
                    push(`/search/${searchTerm}`);
                  }
                }}
              />
            </div>
            <Trends />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchTab;
