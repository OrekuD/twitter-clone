import { LikeModel, Like } from "../Models/Like";
import { Tweet, TweetModel } from "../Models/Tweet";
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
import { mongoose } from "@typegoose/typegoose";
import { tweetLoader, userLoader } from "../Utils/dataLoaders";

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

    const like = await LikeModel.findOne({ creatorId: userId, tweetId });

    if (like) {
      await TweetModel.updateOne(
        { _id: tweetId },
        {
          $pull: {
            likes: new mongoose.Types.ObjectId(like.id),
          },
        }
      );

      await LikeModel.deleteOne({
        _id: like.id,
      });

      return { state: true, message: "Unlike successfull" };
    }

    const newlike = await LikeModel.create({
      tweetId,
      creatorId: userId,
      createdAt: Date.now(),
    });

    await TweetModel.updateOne(
      { _id: tweetId },
      { $push: { likes: new mongoose.Types.ObjectId(newlike.id) } }
    );

    return { state: true, message: "Like successfull" };
  }

  @Query(() => [Like], { nullable: true })
  getLikesByUser(@Arg("userId") userId: string) {
    return LikeModel.find({ creatorId: userId });
  }

  // remove this later
  @Query(() => [Like], { nullable: true })
  allLikes() {
    return LikeModel.find();
  }

  // field resolvers
  @FieldResolver(() => User)
  creator(@Root() like: Like) {
    return userLoader().load(like._doc.creatorId);
  }

  @FieldResolver(() => Tweet)
  tweet(@Root() like: Like) {
    return tweetLoader().load(like._doc.tweetId);
  }
}
