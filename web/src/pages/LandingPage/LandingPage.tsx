import React from "react";
import { ChatBubble, Logo, People, SearchIcon } from "../../Svgs";
import "./LandingPage.scss";
import { blue } from "../../constants/colors";
import { Link } from "react-router-dom";

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
        <Logo color={blue} size={1500} />
        <div className="content">
          <div className="wrapper">
            {items.map(({ Icon, label }, index) => (
              <div className="item" key={index}>
                <Icon color="#fff" size={26} />
                <p className="label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="wrapper">
          <Logo size={50} color="#fff" />
          <p className="main-title">
            See what's happening in the world right now
          </p>
          <p className="sub-title">Join Twitter today.</p>
          <Link to="/signup">
            <button className="ripple-btn">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="transparent-btn">Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
