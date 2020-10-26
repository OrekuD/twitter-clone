import { Retweet } from "../generated/graphql";

export const userHasRetweeted = (retweets: Retweet[], userId: string) =>
  retweets.findIndex((retweet) => retweet.creatorId === userId);
