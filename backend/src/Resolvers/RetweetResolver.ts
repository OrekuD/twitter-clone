import { Retweet, RetweetModel } from "../Models/Retweet";
import { Tweet, TweetModel } from "../Models/Tweet";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { User } from "../Models/User";
import { tweetLoader, userLoader } from "../Utils/dataLoaders";
import { Auth } from "../Middleware/Auth";
import { Context } from "../types";

@ObjectType()
class RetweetResponse {
  @Field()
  state: boolean;

  @Field()
  message: string;
}

@Resolver(Retweet)
export class RetweetResolver {
  @Mutation(() => RetweetResponse)
  @UseMiddleware(Auth)
  async createReTweet(
    @Arg("tweetId") tweetId: string,
    @Ctx() { request }: Context
  ): Promise<RetweetResponse> {
    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return {
        state: false,
        message: "Tweet is unavailable",
      };
    }

    const retweet = await RetweetModel.create({
      tweetId,
      creatorId: request.session.userId,
      createdAt: Date.now(),
    });

    await TweetModel.updateOne(
      {
        _id: tweetId,
      },
      {
        $push: { retweets: retweet.id },
      }
    );
    await retweet.save();

    return {
      state: true,
      message: "Retweet successfull",
    };
  }

  // field resolvers
  @FieldResolver(() => User)
  creator(@Root() retweet: Retweet) {
    return userLoader().load(retweet._doc.creatorId);
  }

  @FieldResolver(() => Tweet)
  tweet(@Root() retweet: Retweet) {
    return tweetLoader().load(retweet._doc.tweetId);
  }
}
