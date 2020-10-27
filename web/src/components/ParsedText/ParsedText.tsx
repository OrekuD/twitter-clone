import React from "react";
import { useHistory } from "react-router-dom";
import "./ParsedText.scss";

interface Props {
  text: string;
  isBio?: boolean;
}

const ParsedText = ({ text, isBio }: Props) => {
  const { push } = useHistory();
  if (!text) {
    return null;
  }
  return (
    <p className="parsed-text">
      {text.split("\n").map((str) => {
        if (!str) {
          return isBio ? " " : <br key={Math.random()} />;
        } else {
          return str.split(" ").map((substr) => {
            if (substr[0] === "@") {
              return (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    push(`/${substr.slice(1)}`);
                  }}
                  className="link"
                  key={Math.random()}
                >
                  {" " + substr + " "}
                </span>
              );
            } else if (substr[0] === "#") {
              return (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    push(`/search/${substr.slice(1)}`);
                  }}
                  className="link"
                  key={Math.random()}
                >
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

export default ParsedText;
