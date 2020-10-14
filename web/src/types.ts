import { Tweet } from "./generated/graphql";

export type AppContext = {
  isLoggedIn: boolean;
  showCommentModal: boolean;
  setCommentModalState: (state: boolean) => void;
  selectedTweet: Tweet | null;
  setSelectedTweet: (tweet: Tweet) => void;
  userDetails: User;
  setIsLoggedIn: (state: boolean) => void;
  addUserDetails: (details: Partial<User>) => void;
};

export type User = {
  image: string;
  fullname: string;
  username: string;
  bio: string;
  location: string;
  email: string;
  _id: string;
};
