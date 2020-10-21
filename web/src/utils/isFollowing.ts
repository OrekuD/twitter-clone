import { UserPartialDetailsFragment } from "../generated/graphql";

export const isFollowing = (
  followers: UserPartialDetailsFragment[],
  userId: string
) => followers.findIndex((like) => like._id === userId);
