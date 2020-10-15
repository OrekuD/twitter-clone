import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import { Arrow } from "../../Svgs";
import { blue } from "../../constants/colors";

interface Props {
  label?: string;
}

const StackHeader = ({ label }: Props) => {
  const history = useHistory();
  return (
    <header className="stack-header">
      <button onClick={history.goBack}>
        <Arrow size={24} color={blue} />
      </button>
      {label && <p className="label">{label}</p>}
    </header>
  );
};

export default StackHeader;
