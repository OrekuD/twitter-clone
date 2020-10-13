import React from "react";
import "./Header.scss";

interface Props {
  label?: string;
}

const Header = ({ label }: Props) => {
  return (
    <header className="header">
      {label && <p className="label">{label}</p>}
    </header>
  );
};

export default Header;
