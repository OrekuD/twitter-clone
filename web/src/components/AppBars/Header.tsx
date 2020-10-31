import React from "react";
import { Link } from "react-router-dom";
import { blue } from "../../constants/colors";
import { PROFILE_IMAGES_BASE_URL } from "../../constants/constants";
import { useAppContext } from "../../context/context";
import { Star } from "../../Svgs";
import "./Header.scss";

interface Props {
  label: string;
}

const Header = ({ label }: Props) => {
  const { userDetails } = useAppContext();
  return (
    <header className="header">
      <div className="left-content">
        <Link to={`/${userDetails?.username}`}>
          <img
            src={`${PROFILE_IMAGES_BASE_URL + userDetails?.profileImage}`}
            alt="profile"
            className="profile-image"
          />
        </Link>
        <p className="label">{label}</p>
      </div>
      <Star size={24} color={blue} />
    </header>
  );
};

export default Header;
