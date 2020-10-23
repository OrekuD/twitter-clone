import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  Layout,
  Tweets,
  Spinner,
  StackHeader,
  EditDetails,
} from "../../components";
import { useAppContext } from "../../context/context";
import {
  Tweet,
  useGetUserByUsernameQuery,
  useGetUserTimelineQuery,
} from "../../generated/graphql";
import { Profile } from "./Profile";
import "./UserPage.scss";

const UserPage = () => {
  const { params } = useRouteMatch<{ username: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { userDetails } = useAppContext();

  const [{ data }, getUser] = useGetUserByUsernameQuery({
    variables: { username: params.username },
  });

  useEffect(() => {
    getUser();
    console.log(userDetails);
  }, [getUser, params]);

  const [{ data: userTimeline }, getTimeline] = useGetUserTimelineQuery({
    variables: {
      userId: data?.getUserByUsername.user?._id!,
    },
  });

  useEffect(() => {
    data && getTimeline();
  }, [data, getTimeline]);

  const tabs = ["Tweets", "Replies", "Likes"];
  const excludedRoutes = ["explore", "search"];

  // to prevent from using certain routes as a username in fetching detailss
  if (excludedRoutes.includes(params.username)) {
    return (
      <Layout>
        <div className="loading-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (data?.getUserByUsername.error) {
    return (
      <Layout>
        <StackHeader />
        <div className="no-user">
          <p>User is unavailable </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <StackHeader label={params.username} />
      <EditDetails isVisible={isVisible} setIsVisible={setIsVisible} />
      {!data ? (
        <div className="loading-screen">
          <Spinner />
        </div>
      ) : (
        <div className="user-page">
          {data.getUserByUsername.user && (
            <Profile
              user={data.getUserByUsername.user}
              setIsVisible={setIsVisible}
            />
          )}
          <div className="tabs">
            {tabs.map((tab, index) => (
              <button
                className={`tab ${index === activeIndex ? "active" : ""}`}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <Tweets tweets={userTimeline?.getUserTimeline as Tweet[]} />
        </div>
      )}
    </Layout>
  );
};

export default UserPage;
