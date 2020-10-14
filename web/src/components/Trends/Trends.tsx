import React, { useEffect } from "react";
import { useGetTrendsQuery } from "../../generated/graphql";
import "./Trends.scss";

const Trends = () => {
  const [{ data }, getTrends] = useGetTrendsQuery();

  useEffect(() => {
    getTrends();
  }, [data, getTrends]);

  if (!data) {
    return null;
  }

  return (
    <div className="trends">
      <div className="top-section">
        <p>Trends for you</p>
      </div>
      {data?.getTrends.map(({ hashtag, numberOfTweets }, index) => (
        <button className="trend" key={index}>
          <p className="hashtag">{hashtag}</p>
          <p className="number-of-tweets">{numberOfTweets} Tweets</p>
        </button>
      ))}
      <button className="show-more">Show more</button>
    </div>
  );
};

export default Trends;
