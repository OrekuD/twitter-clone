import React from "react";
import "./App.scss";
import { EditDetails, Home, Login, Tweet, Register, UserPage } from "./pages";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "./context/context";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      {!isLoggedIn && <Redirect from="/" to="/user/login" />}
      <Route path="/" exact component={Home} />
      <Route path="/:username/status/:tweetId" exact component={Tweet} />
      <Route path="/user/register" exact component={Register} />
      <Route path="/user/login" exact component={Login} />
      <Route path="/user/edit-details" exact component={EditDetails} />
      <Route path="/:username" exact component={UserPage} />
    </>
  );
}

export default App;
