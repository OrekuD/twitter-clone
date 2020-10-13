import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/register">
        <p>Register</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
    </header>
  );
};

export default Header;
