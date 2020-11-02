import { Tweet, UserFullDetailsFragment } from "./generated/graphql";

export type ModalTypes = "COMMENT" | "RETWEET" | "TWEET" | "TWEET_IMAGE" | null;

export type AppContext = {
  showSplashScreen: boolean;
  selectedTweet: Tweet | null;
  userDetails: UserFullDetailsFragment | null;
  setShowSplashScreen: (state: boolean) => void;
  setSelectedTweet: (tweet: Tweet | null) => void;
  setCurrentModal: (type: ModalTypes) => void;
  currentModal: ModalTypes;
};
