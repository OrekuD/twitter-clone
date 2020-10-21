import { Like } from "../generated/graphql";

export const userHasLiked = (likes: Like[], userId: string) =>
  likes.findIndex((like) => like.creatorId === userId);
