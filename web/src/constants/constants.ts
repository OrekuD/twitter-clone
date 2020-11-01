import { User } from "../generated/graphql";

export const PROFILE_IMAGES_BASE_URL = "http://localhost:4000/user_images";
export const TWEET_IMAGES_BASE_URL = "http://localhost:4000/tweet_images";
export const APP_URL = "https://twitter-clone.netlify.app";

export const dummyUserDetails: User = {
  profileImage: "",
  headerImage: "",
  fullname: "",
  username: "",
  bio: "",
  location: "",
  email: "",
  _id: "",
  createdAt: "",
  pinnedTweet: null,
  followers: [],
  following: [],
};
