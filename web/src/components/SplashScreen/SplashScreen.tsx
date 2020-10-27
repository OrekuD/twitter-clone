import React from "react";
import { useAppContext } from "../../context/context";
import { Logo } from "../../Svgs";
import "./SplashScreen.scss";

const SplashScreen = () => {
  const { showSplashScreen } = useAppContext();

  if (!showSplashScreen) {
    return null;
  }
  return (
    <div className="splash-screen">
      <Logo size={90} color="#1DA1F2" />
    </div>
  );
};

export default SplashScreen;
