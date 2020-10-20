import { User } from "../generated/graphql";

export const userHasLiked = (likes: User[], userId: string) =>
  likes.findIndex((like) => like._id === userId);
