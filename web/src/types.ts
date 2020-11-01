import { Tweet, UserFullDetailsFragment } from "./generated/graphql";

export type AppContext = {
  // showCommentModal: boolean;
  // showRetweetModal: boolean;
  // showTweetModal: boolean;
  // showTweetImage: boolean;
  showSplashScreen: boolean;
  selectedTweet: Tweet | null;
  userDetails: UserFullDetailsFragment | null;
  // setShowCommentModal: (state: boolean) => void;
  // setShowRetweetModal: (state: boolean) => void;
  // setShowTweetModal: (state: boolean) => void;
  setShowSplashScreen: (state: boolean) => void;
  // setShowTweetImage: (state: boolean) => void;
  setSelectedTweet: (tweet: Tweet | null) => void;
  setCurrentModal: (type: ModalTypes) => void;
  currentModal: ModalTypes;
};

export type ModalTypes = "COMMENT" | "RETWEET" | "TWEET" | "TWEET_IMAGE" | null;
