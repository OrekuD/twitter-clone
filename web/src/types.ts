import { Tweet, UserFullDetailsFragment } from "./generated/graphql";

export type AppContext = {
  isLoggedIn: boolean;
  showCommentModal: boolean;
  setCommentModalState: (state: boolean) => void;
  selectedTweet: Tweet | null;
  setSelectedTweet: (tweet: Tweet) => void;
  userDetails: UserFullDetailsFragment;
  setIsLoggedIn: (state: boolean) => void;
  addUserDetails: (details: Partial<UserFullDetailsFragment>) => void;
};

// export type User = {
//   _id: string;
//   image: string;
//   fullname: string;
//   username: string;
//   bio: string;
//   location: string;
//   email: string;
//   createdAt: string;
//   followers: UserPartialDetailsFragment[];
//   following: UserPartialDetailsFragment[];
// };
