import React, { useEffect } from "react";
import { useGetTrendsQuery } from "../../generated/graphql";
import { Link } from "react-router-dom";
import "./Trends.scss";

const Trends = () => {
  const [{ data }, getTrends] = useGetTrendsQuery();

  useEffect(() => {
    getTrends();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="trends">
      <div className="top-section">
        <p>Trends for you</p>
      </div>
      {data?.getTrends.slice(0, 4).map(({ hashtag, numberOfTweets }, index) => (
        <Link key={index} to={`/search/${hashtag.slice(1)}`}>
          <button className="trend" key={index}>
            <p className="hashtag">{hashtag}</p>
            <p className="number-of-tweets">{numberOfTweets} Tweets</p>
          </button>
        </Link>
      ))}
      <Link to="/explore">
        <button className="show-more">Show more</button>
      </Link>
    </div>
  );
};

export default Trends;
