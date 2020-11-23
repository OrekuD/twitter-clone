import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Layout, Tweets, Users } from "../../components";
import { blue, lightgrey } from "../../constants/colors";
import { Tweet, User, useSearchQuery } from "../../generated/graphql";
import { Arrow, SearchIcon } from "../../Svgs";
import "./SearchResults.scss";

const SearchResults = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    params: { searchTerm },
  } = useRouteMatch<{ searchTerm: string }>();
  const [{ data }, search] = useSearchQuery({
    variables: {
      searchTerm: searchTerm,
    },
  });
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const emptyResults = (
    <div className="description-text-wrapper">
      <p className="main-title">No results for "{searchTerm}" </p>
      <p className="sub-title">
        The term you entered did not bring up any results. <br /> You may have
        mistyped.
      </p>
    </div>
  );

  const tabs = [
    {
      name: "Top",
      component: (
        <Tweets
          tweets={data?.search.tweets as Tweet[]}
          emptyTweets={emptyResults}
        />
      ),
    },
    {
      name: "People",
      component: (
        <Users users={data?.search.users as User[]} noUsers={emptyResults} />
      ),
    },
  ];

  return (
    <Layout title={`${searchTerm} - Twitter Search`}>
      <div className="search-results-page">
        <div className="top-section">
          <button onClick={history.goBack} className="icon-wrapper">
            <Arrow size={24} color={blue} />
          </button>
          <div className="search-input-container">
            <SearchIcon size={20} color={lightgrey} />
            <input
              type="text"
              className="search-input"
              placeholder="Search Twitter"
              defaultValue={searchTerm}
            />
          </div>
        </div>
        <div className="tabs">
          {tabs.map(({ name }, index) => (
            <button
              className={`tab ${index === activeIndex ? "active" : ""}`}
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              <p>{name}</p>
            </button>
          ))}
        </div>
      </div>

      {tabs[activeIndex].component}
    </Layout>
  );
};

export default SearchResults;
