import React from "react";
import { Form } from "../../components";
import "./Register.scss";

const Register = () => {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form signup onSubmit={submitForm} />
    </div>
  );
};

export default Register;
