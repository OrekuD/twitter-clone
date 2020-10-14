import React from "react";
import { blue } from "../../constants/colors";
import { Star } from "../../Svgs";
import "./Header.scss";

interface Props {
  label?: string;
}

const Header = ({ label }: Props) => {
  return (
    <header className="header">
      {label && <p className="label">{label}</p>}
      <Star size={24} color={blue} />
    </header>
  );
};

export default Header;
