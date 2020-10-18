import React, { useEffect } from "react";
import { Layout } from "../../components";
import { lightgrey } from "../../constants/colors";
import { useGetTrendsQuery } from "../../generated/graphql";
import { SearchIcon } from "../../Svgs";
import "./Explore.scss";

const Explore = () => {
  const [{ data }, getTrends] = useGetTrendsQuery();

  useEffect(() => {
    getTrends();
  }, []);
  return (
    <Layout>
      <div className="explore-page">
        <div className="search-input-container">
          <SearchIcon size={20} color={lightgrey} />
          <input
            type="text"
            className="search-input"
            placeholder="Search Twitter"
          />
        </div>
        <div className="explore-page-title">
          <p>Trends for you</p>
        </div>
        {data?.getTrends.map(({ hashtag, numberOfTweets }, index) => (
          <button className="trend" key={index}>
            <p className="hashtag">{hashtag}</p>
            <p className="number-of-tweets">{numberOfTweets} Tweets</p>
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Explore;
