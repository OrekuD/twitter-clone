import { Tweet, UserFullDetailsFragment } from "./generated/graphql";

export type ModalTypes =
  | "COMMENT"
  | "RETWEET"
  | "TWEET"
  | "PROFILE_IMAGE"
  | "HEADER_IMAGE"
  | null;

export type AppContext = {
  showSplashScreen: boolean;
  selectedTweet: Tweet | null;
  userDetails: UserFullDetailsFragment | null;
  setShowSplashScreen: (state: boolean) => void;
  setSelectedTweet: (tweet: Tweet | null) => void;
  setCurrentModal: (type: ModalTypes) => void;
  setSelectedImageDetails: (imageDetails: ImageDetails) => void;
  selectedImageDetails: ImageDetails;
  currentModal: ModalTypes;
};

export type ImageDetails = {
  url: string;
  type: "PROFILE_IMAGE" | "HEADER_IMAGE";
} | null;
