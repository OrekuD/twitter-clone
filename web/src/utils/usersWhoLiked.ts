import { Like, UserPartialDetailsFragment } from "../generated/graphql";

export const usersWhoLiked = (
  following: UserPartialDetailsFragment[],
  likes: Like[]
) => {
  let users: UserPartialDetailsFragment[] = [];
  following.forEach((user) => {
    likes.forEach((like) => {
      if (like.creatorId === user._id) {
        users.push(user);
      }
    });
  });
  console.log(users);
  return users;
};
