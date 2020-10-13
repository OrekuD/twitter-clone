import React from "react";
import "./Button.scss";

interface Props {
  isLoading?: boolean;
  label: string;
  onPress?: () => void;
}

const Button = ({ label, onPress, isLoading }: Props) => {
  return (
    <button
      className="ripple-btn"
      disabled={isLoading}
      onClick={onPress}
      type={onPress ? "button" : "submit"}
    >
      {isLoading ? (
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      ) : (
        <>{label}</>
      )}
    </button>
  );
};

export default Button;
