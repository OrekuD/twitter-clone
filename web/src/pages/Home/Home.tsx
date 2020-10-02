import React, { useEffect } from "react";
import { Button } from "rsuite";
import { CreatePost, Header } from "../../components";
import { useAllPostsQuery } from "../../generated/graphql";
import "./Home.scss";

const sampleData = {
  username: "OrekuD",
  fullname: "David Opoku",
  location: "Accra, Ghana",
  bio:
    "I'm just a sucker for pain. Sint adipisicing culpa cupidatat adipisicing ea pariatur. Aute nisi reprehenderit cupidatat labore non mollit mollit dolor.",
};

const Home = () => {
  const [{ data }, allPost] = useAllPostsQuery();
  const { bio, fullname, location, username } = sampleData;

  useEffect(() => {
    allPost();
    console.log(data?.getAllPosts);
  }, [allPost, data]);

  return (
    <>
      <Header />
      <div className="home">
        <div className="profile">
          <div className="image"></div>
          <div className="content">
            <p className="fullname">{fullname}</p>
            <p className="username">@{username}</p>
            <p className="bio">{bio}</p>
            <p className="location">{location}</p>
            {/* <CreatePost /> */}
          </div>
        </div>
        <div className="posts">
          {data?.getAllPosts.map(
            ({ content, creator: { username } }, index) => (
              <div className="card" key={index}>
                <p className="username">{username}</p>
                <p className="content">{content}</p>
                {index === 0 && (
                  <p>
                    Ea pariatur eiusmod Lorem amet enim. Amet id nisi labore
                    qui. Tempor enim et dolor qui ad pariatur duis non ea velit.
                    Fugiat laborum laborum sit id in laborum duis aliquip. Sunt
                    excepteur qui sit in consectetur ex irure tempor tempor
                    reprehenderit minim aute consectetur.
                  </p>
                )}
                <Button>Okay</Button>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
