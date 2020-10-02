import React from "react";
import { Form } from "../../components";
import "./Login.scss";

const Login = () => {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={submitForm} />
    </div>
  );
};

export default Login;
