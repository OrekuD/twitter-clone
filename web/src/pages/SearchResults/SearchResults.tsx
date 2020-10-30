import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Layout, Tweets } from "../../components";
import { blue, lightgrey } from "../../constants/colors";
import { Tweet, useSearchQuery } from "../../generated/graphql";
import { Arrow, SearchIcon } from "../../Svgs";
import "./SearchResults.scss";

const SearchResults = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { params } = useRouteMatch<{ hashtag: string }>();
  const [{ data }, search] = useSearchQuery({
    variables: {
      searchTerm: params.hashtag,
    },
  });
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const tabs = [
    {
      name: "Top",
      component: <Tweets tweets={data?.search.tweets as Tweet[]} />,
    },
    {
      name: "People",
      component: <Tweets tweets={[]} />,
    },
  ];

  return (
    <Layout title={`${params.hashtag} - Twitter Search`}>
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
              defaultValue={params.hashtag}
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
