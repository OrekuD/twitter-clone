import React, { useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Layout, Spinner, StackHeader, Users } from "../../components";
import {
  useGetUserByUsernameQuery,
  UserFullDetailsFragment,
} from "../../generated/graphql";

const Followers = () => {
  const { params } = useRouteMatch<{ username: string }>();
  const history = useHistory();
  const [{ data, fetching }, getUser] = useGetUserByUsernameQuery({
    variables: {
      username: params.username,
    },
  });

  useEffect(() => {
    getUser();
  }, [params]);

  if (fetching) {
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

  const { followers, fullname, username } = data?.getUserByUsername
    .user as UserFullDetailsFragment;

  const tabs = ["followers", "following"];

  return (
    <Layout title={`People following ${fullname} (@${username})`}>
      <div className="followers-page">
        <StackHeader
          label={fullname}
          goBack={() => history.push(`/${username}`)}
        />
        <div className="tabs">
          {tabs.map((tab, index) => (
            <button
              className={`tab ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <Link to={`/${params.username}/${tab}`}>{tab}</Link>
            </button>
          ))}
        </div>
        <Users users={followers} />
      </div>
    </Layout>
  );
};

export default Followers;
