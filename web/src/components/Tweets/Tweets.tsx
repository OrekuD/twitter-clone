import React from "react";
import { Tweet } from "../../generated/graphql";
import TweetCard from "../TweetCard/TweetCard";
import Spinner from "../Spinner/Spinner";
import "./Tweets.scss";

interface Props {
  tweets: Tweet[] | undefined;
}

const Tweets = ({ tweets }: Props) => {
  let content;
  if (typeof tweets === "undefined") {
    content = (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  } else if (tweets.length === 0) {
    content = <p className="no-tweets">No tweets</p>;
  } else {
    content = (
      <>
        {tweets.map((tweet, index) => (
          <TweetCard tweet={tweet} />
        ))}
      </>
    );
  }
  return <div className="tweets">{content}</div>;
};

export default Tweets;
