import { User } from "../generated/graphql";

export const userHasRetweeted = (retweets: User[], userId: string) =>
  retweets.findIndex((retweet) => retweet._id === userId);
