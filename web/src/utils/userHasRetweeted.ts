import { UserPartialDetailsFragment } from "../generated/graphql";

export const userHasRetweeted = (
  retweets: UserPartialDetailsFragment[],
  userId: string
) => retweets.findIndex((retweet) => retweet._id === userId);
