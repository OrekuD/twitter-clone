import React from "react";
import "./App.scss";
import { Home, Login, Post, Register } from "./pages";
// import "rsuite/dist/styles/rsuite-default.css";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "./context/context";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/post/:postId" exact component={Post} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      {/* {isLoggedIn && (
        <>
          <Redirect from="/register" to="/" exact />
          <Redirect from="/login" to="/" exact />
        </>
      )} */}
    </div>
  );
}

export default App;
