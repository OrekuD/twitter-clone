import React from "react";
import "./App.scss";
import "./normalize.css";
import {
  Home,
  Login,
  Tweet,
  Register,
  UserPage,
  Explore,
  SearchResults,
  Following,
  Followers,
  LandingPage,
} from "./pages";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "./context/context";
import { SplashScreen } from "./components";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      {!isLoggedIn && <Redirect from="/" to="/login" />}
      {isLoggedIn && <Redirect exact strict from="/" to="/home" />}
      <Route path="/" exact component={LandingPage} />
      <Route path="/home" exact component={Home} />
      <Route path="/explore" exact component={Explore} />
      <Route path="/search/:hashtag" exact component={SearchResults} />
      <Route path="/:username/status/:tweetId" exact component={Tweet} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/:username" exact component={UserPage} />
      <Route path="/:username/following" exact component={Following} />
      <Route path="/:username/followers" exact component={Followers} />
      <SplashScreen />
    </>
  );
}

export default App;
