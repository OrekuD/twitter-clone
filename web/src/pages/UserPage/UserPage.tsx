import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Layout, Spinner, StackHeader, EditDetails } from "../../components";
import { Tweet, useGetUserByUsernameQuery } from "../../generated/graphql";
import { LikesTab } from "./LikesTab";
import { Profile } from "./Profile";
import { TweetsTab } from "./TweetsTab";
import "./UserPage.scss";

const UserPage = () => {
  const { params } = useRouteMatch<{ username: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [{ data, fetching }, getUser] = useGetUserByUsernameQuery({
    pause: !params.username,
    variables: {
      username: params.username,
    },
  });

  useEffect(() => {
    getUser();
  }, [getUser, params]);

  if (fetching) {
    return (
      <Layout>
        <div className="loading-screen">
          <Spinner />
        </div>
      </Layout>
    );
  }

  if (data?.getUserByUsername.error?.message.includes("not exist")) {
    return (
      <Layout>
        <StackHeader />
        <div className="no-user">
          <p>User is unavailable</p>
        </div>
      </Layout>
    );
  }

  const tabs = [
    {
      name: "Tweets",
      component: (
        <TweetsTab
          userId={data?.getUserByUsername.user?._id!}
          pinnedTweet={data?.getUserByUsername.user?.pinnedTweet as Tweet}
        />
      ),
    },
    {
      name: "Tweets & replies",
      component: <TweetsTab userId={data?.getUserByUsername.user?._id!} />,
    },
    {
      name: "Likes",
      component: <LikesTab userId={data?.getUserByUsername.user?._id!} />,
    },
  ];

  return (
    <Layout
      title={`${data?.getUserByUsername.user?.fullname} (@${data?.getUserByUsername.user?.username})`}
    >
      <EditDetails isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className="user-page">
        {data?.getUserByUsername.user && (
          <>
            <StackHeader label={params.username} />
            <Profile
              user={data.getUserByUsername.user}
              setIsVisible={setIsVisible}
            />
            <div className="tabs">
              {tabs.map((tab, index) => (
                <button
                  className={`tab ${index === activeIndex ? "active" : ""}`}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            {tabs[activeIndex].component}
          </>
        )}
      </div>
    </Layout>
  );
};

export default UserPage;
