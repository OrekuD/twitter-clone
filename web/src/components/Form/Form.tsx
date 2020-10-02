import React from "react";
import { Link } from "react-router-dom";
import "./Form.scss";

interface Props {
  signup?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ onSubmit, signup }: Props) => {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="group">
          <label htmlFor="username">Username</label>
          <div className="input">
            <input type="text" name="username" />
            <p className="error-label">
              Nostrud in consectetur consectetur in.
            </p>
          </div>
        </div>
        {signup && (
          <div className="group">
            <label htmlFor="fullname">Fullname</label>
            <div className="input">
              <input type="text" name="fullname" />
              <p className="error-label">
                Nostrud in consectetur consectetur in.
              </p>
            </div>
          </div>
        )}
        <div className="group">
          <label htmlFor="password">Password</label>
          <div className="input">
            <input type="password" name="password" />
            <p className="error-label">
              Nostrud in consectetur consectetur in.
            </p>
          </div>
        </div>
        <div className="bottom-section">
          <button className="submit">{signup ? "Submit" : "Log in"}</button>
          {signup ? (
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="register">Create one</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
