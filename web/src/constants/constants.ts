import { User } from "../generated/graphql";

export const PROFILE_IMAGES_BASE_URL = "http://localhost:4000/profile_images";
export const APP_URL = "https://twitter-clone.netlify.app";

export const dummyUserDetails: User = {
  image: "",
  fullname: "",
  username: "",
  bio: "",
  location: "",
  email: "",
  _id: "",
  createdAt: "",
  followers: [],
  following: [],
};
