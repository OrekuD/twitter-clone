import React from "react";
import "./App.scss";
import { EditDetails, Home, Login, Post, Register } from "./pages";
// import "rsuite/dist/styles/rsuite-default.css";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/post/:postId" exact component={Post} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/edit-details" exact component={EditDetails} />
    </div>
  );
}

export default App;
