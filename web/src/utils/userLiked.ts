import { Like } from "../generated/graphql";

export const userLiked = (likes: Like[], userId: string) => {
  likes.forEach((like, _) => {
    if (like.creatorId === userId) {
      return true;
    }
  });

  return false;
};
