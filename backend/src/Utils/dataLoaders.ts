import { User, UserModel } from "../Models/User";
import DataLoader from "dataloader";
import { Tweet, TweetModel } from "../Models/Tweet";

export const tweetLoader = () =>
  new DataLoader<string, Tweet>(async (tweetIds) => {
    const tweets = await TweetModel.find({
      _id: { $in: tweetIds as string[] },
    });
    const tweetIdToTweet: Record<string, Tweet> = {};
    tweets.forEach((tweet) => {
      tweetIdToTweet[tweet.id] = tweet;
    });
    return tweetIds.map((tweetId) => tweetIdToTweet[tweetId]);
  });

export const userLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await UserModel.find({ _id: { $in: userIds as string[] } });
    const userIdToUser: Record<string, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });
    return userIds.map((userId) => userIdToUser[userId]);
  });
