import { Like } from "../generated/graphql";

export const userLiked = (likes: Like[], userId: string) =>
  likes.findIndex((like) => like.creatorId === userId);
