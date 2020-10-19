import { LikeModel, Like } from "../Models/Like";
import { TweetModel } from "../Models/Tweet";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";
import { CommentModel } from "../Models/Comment";

@ObjectType()
class LikeResponse {
  @Field()
  state: boolean;

  @Field()
  message: string;
}

@Resolver()
export class LikeResolver {
  @Mutation(() => LikeResponse)
  @UseMiddleware(Auth)
  async likeTweet(
    @Arg("tweetId") tweetId: string,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
    const tweet = await CommentModel.findOne({ _id: tweetId });

    if (!tweet) {
      return {
        state: false,
        message: "Tweet is unavailable",
      };
    }

    const hasUserAlreadyLiked = tweet.likes.findIndex(
      (like) => (like as Like).creatorId === userId
    );

    if (hasUserAlreadyLiked >= 0) {
      const updatedLikes = tweet.likes.filter(
        (like) => (like as Like).creatorId !== userId
      );

      await TweetModel.updateOne(
        { _id: tweetId },
        { $set: { likes: updatedLikes } }
      );

      await LikeModel.deleteOne({
        _id: (tweet.likes[hasUserAlreadyLiked] as Like)._id,
      });

      return { state: true, message: "Unlike successfull" };
    }

    const like = await LikeModel.create({
      creator: userId,
      tweetId,
      creatorId: userId,
    });
    await like.save();

    await TweetModel.updateOne(
      { _id: tweetId },
      { $push: { likes: [like.id] as any } }
    );

    return { state: true, message: "Like successfull" };
  }

  @Query(() => [Like], { nullable: true })
  async getLikesByUser(@Arg("userId") userId: string) {
    const likes = await LikeModel.find({ creatorId: userId });
    return likes;
  }
}
