import { Tweet, UserFullDetailsFragment } from "./generated/graphql";

export type AppContext = {
  isLoggedIn: boolean;
  showCommentModal: boolean;
  setShowCommentModal: (state: boolean) => void;
  showSplashScreen: boolean;
  setShowSplashScreen: (state: boolean) => void;
  selectedTweet: Tweet | null;
  setSelectedTweet: (tweet: Tweet) => void;
  userDetails: UserFullDetailsFragment | null;
  setIsLoggedIn: (state: boolean) => void;
};
