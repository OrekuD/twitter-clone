import React from "react";
import { ChatBubble, Logo, People, SearchIcon } from "../../Svgs";
import "./LandingPage.scss";

const items = [
  {
    label: "Follow your interests.",
    Icon: SearchIcon,
  },
  {
    label: "Hear what people are talking about.",
    Icon: People,
  },
  {
    label: "Join the conversation.",
    Icon: ChatBubble,
  },
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="left-container">
        <div className="wrapper">
          {items.map(({ Icon, label }, index) => (
            <div className="item" key={index}>
              <Icon color="#fff" size={26} />
              <p className="label">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="right-container">
        <div className="wrapper">
          <Logo size={50} color="#fff" />
          <p className="main-title">
            See what's happening in <br />
            the world right now
          </p>
          <p className="sub-title">Join Twitter today.</p>
          <button className="ripple-btn">Sign up</button>
          <button className="transparent-btn">Log in</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
