import React, { ReactNode } from "react";
import { Tweet } from "../../generated/graphql";
import TweetCard from "../TweetCard/TweetCard";
import Spinner from "../Spinner/Spinner";
import "./Tweets.scss";

interface Props {
  tweets: Tweet[] | undefined;
  emptyTweets?: ReactNode;
}

const Tweets = ({ tweets, emptyTweets = null }: Props) => {
  let content;
  if (typeof tweets === "undefined") {
    content = (
      <div className="loading-screen">
        <Spinner />
      </div>
    );
  } else if (tweets.length === 0) {
    content = emptyTweets;
  } else {
    content = (
      <>
        {tweets.map((tweet, index) => (
          <TweetCard tweet={tweet} key={index} />
        ))}
      </>
    );
  }
  return <div className="tweets">{content}</div>;
};

export default Tweets;
