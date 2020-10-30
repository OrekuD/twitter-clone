import { Tweet, UserFullDetailsFragment } from "./generated/graphql";

export type AppContext = {
  showCommentModal: boolean;
  showRetweetModal: boolean;
  showTweetModal: boolean;
  showSplashScreen: boolean;
  selectedTweet: Tweet | null;
  userDetails: UserFullDetailsFragment | null;
  setShowCommentModal: (state: boolean) => void;
  setShowRetweetModal: (state: boolean) => void;
  setShowTweetModal: (state: boolean) => void;
  setShowSplashScreen: (state: boolean) => void;
  setSelectedTweet: (tweet: Tweet | null) => void;
};
