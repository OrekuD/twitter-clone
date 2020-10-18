import React from "react";
import { Link } from "react-router-dom";
import "./RenderTweet.scss";

interface Props {
  text: string;
}

const RenderTweet = ({ text }: Props) => {
  return (
    <p className="tweet-content">
      {text.split("\n").map((str) => {
        if (!str) {
          return <br key={Math.random()} />;
        } else {
          return str.split(" ").map((substr) => {
            if (substr[0] === "@") {
              return (
                <Link to={`/${substr.slice(1)}`} key={Math.random()}>
                  <span className="link">{" " + substr + " "}</span>
                </Link>
              );
            } else if (substr[0] === "#") {
              return (
                <span className="link" key={Math.random()}>
                  {" " + substr + " "}
                </span>
              );
            } else {
              return <span key={Math.random()}> {substr} </span>;
            }
          });
        }
      })}
    </p>
  );
};

export default RenderTweet;
