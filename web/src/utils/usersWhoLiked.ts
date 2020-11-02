import { Like, UserPartialDetailsFragment } from "../generated/graphql";

export const usersWhoLiked = (
  following: UserPartialDetailsFragment[],
  likes: Like[]
) => {
  let users: UserPartialDetailsFragment[] = [];
  if (!following || following.length === 0) {
    return [];
  }
  following.forEach((user) => {
    likes.forEach((like) => {
      if (like.creatorId === user._id) {
        users.push(user);
      }
    });
  });
  return users;
};
