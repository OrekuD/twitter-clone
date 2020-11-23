import React, { useEffect } from "react";
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
  Notifications,
  TweetImageModal,
} from "./pages";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  CreateComment,
  CreateRetweet,
  CreateTweetModal,
  ImageModal,
  SplashScreen,
} from "./components";
import { useGetCurrentUserDetailsQuery } from "./generated/graphql";
import "reactjs-popup/dist/index.css";

function App() {
  const [{ data, fetching }, getUserDetails] = useGetCurrentUserDetailsQuery();

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Switch>
        {/* {!fetching && !data?.currentUser && <Redirect from="/" to="/login" />} */}
        {!fetching && data?.currentUser && (
          <Redirect exact strict from="/" to="/home" />
        )}
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={Home} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/search/:searchTerm" exact component={SearchResults} />
        <Route
          path="/:username/status/:tweetId/photo"
          exact
          component={TweetImageModal}
        />
        <Route path="/:username/status/:tweetId" exact component={Tweet} />

        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/notifications" exact component={Notifications} />
        <Route path="/:username" exact component={UserPage} />
        <Route path="/:username/following" exact component={Following} />
        <Route path="/:username/followers" exact component={Followers} />
      </Switch>
      <SplashScreen />
      <CreateComment />
      <CreateRetweet />
      <CreateTweetModal />
      <ImageModal />
    </>
  );
}

export default App;
