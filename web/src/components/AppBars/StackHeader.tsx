import React from "react";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import { Arrow } from "../../Svgs";

interface Props {
  label?: string;
}

const StackHeader = ({ label }: Props) => {
  const history = useHistory();
  return (
    <header className="stack-header">
      <button onClick={history.goBack}>
        <Arrow size={18} color="#121212" />
      </button>
      {label && <p className="label">{label}</p>}
    </header>
  );
};

export default StackHeader;
