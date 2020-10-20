import { LikeModel, Like } from "../Models/Like";
import { TweetModel } from "../Models/Tweet";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";
import { User, UserModel } from "../Models/User";

@ObjectType()
class LikeResponse {
  @Field()
  state: boolean;

  @Field()
  message: string;
}

@Resolver(Like)
export class LikeResolver {
  @Mutation(() => LikeResponse)
  @UseMiddleware(Auth)
  async likeTweet(
    @Arg("tweetId") tweetId: string,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
    const tweet = await TweetModel.findOne({ _id: tweetId });

    if (!tweet) {
      return {
        state: false,
        message: "Tweet is unavailable",
      };
    }

    const userAlreadyLiked = tweet.likes
      .flat(Infinity)
      .findIndex((like) => like === userId);

    if (userAlreadyLiked >= 0) {
      const updatedLikes = tweet.likes.filter((like) => like !== userId);

      await TweetModel.updateOne(
        { _id: tweetId },
        { $set: { likes: updatedLikes } }
      );

      return { state: true, message: "Unlike successfull" };
    }

    await TweetModel.updateOne({ _id: tweetId }, { $push: { likes: userId } });

    return { state: true, message: "Like successfull" };
  }

  @Query(() => [Like], { nullable: true })
  async getLikesByUser(@Arg("userId") userId: string) {
    const likes = await LikeModel.find({ creatorId: userId });
    return likes;
  }

  @FieldResolver(() => User)
  async creator(@Root() like: Like) {
    return UserModel.findOne({ _id: (like._doc as Like).creatorId });
  }
}
