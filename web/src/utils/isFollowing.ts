import { UserPartialDetailsFragment } from "../generated/graphql";

export const isFollowing = (
  followers: UserPartialDetailsFragment[],
  userId: string
) => followers.findIndex((user) => user._id === userId);
