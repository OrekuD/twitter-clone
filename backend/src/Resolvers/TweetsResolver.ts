import { Auth } from "../Middleware/Auth";
import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Tweet, TweetModel } from "../Models/Tweet";
import { Context } from "../types";
import { extractHashtags } from "../Util/extractHashtags";
import { TrendsModel } from "../Models/Trends";

@ObjectType()
class TweetError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@ObjectType()
class AllTweetResponse {
  @Field(() => [Tweet])
  tweets?: Tweet[];

  @Field()
  error?: TweetError;
}

@ObjectType()
class SingleTweetResponse {
  @Field(() => Tweet, { nullable: true })
  tweet?: Tweet;

  @Field(() => TweetError, { nullable: true })
  error?: TweetError;
}

@Resolver()
export class TweetsResolver {
  @Query(() => SingleTweetResponse, { nullable: false })
  async getTweet(@Arg("id") id: string) {
    const tweet = await TweetModel.findOne({ _id: id });
    if (!tweet) {
      return {
        message: "Tweet is unavailable",
        field: "tweet",
      };
    }
    return { tweet };
  }

  @Query(() => AllTweetResponse)
  async getAllTweets() {
    const tweets = await TweetModel.find().sort({ createdAt: "desc" });
    return {
      tweets,
    };
  }

  @Query(() => [Tweet])
  async getTweetsByUser(@Arg("userId") userId: string) {
    return await TweetModel.find({ creator: userId }).sort({
      createdAt: "desc",
    });
  }

  @Mutation(() => Tweet)
  @UseMiddleware(Auth)
  async createTweet(
    @Arg("content") content: string,
    @Ctx() { request }: Context
  ): Promise<Tweet> {
    const tweet = await TweetModel.create({
      content,
      creator: request.session.userId,
      createdAt: Date.now(),
      comments: [],
      likes: [],
    });
    await tweet.save();
    const hashtags = extractHashtags(content);
    if (hashtags.length > 0) {
      hashtags.forEach(async (hashtag) => {
        const trend = await TrendsModel.findOne({ hashtag });
        if (!trend) {
          await TrendsModel.create({
            hashtag,
            numberOfTweets: 1,
            tweets: [tweet.id],
          });
        } else {
          await TrendsModel.updateOne(
            { _id: trend.id! },
            {
              $push: { Tweets: [tweet.id] as any },
              numberOfTweets: trend.numberOfTweets + 1,
            }
          );
        }
      });
    }
    return tweet;
  }
}
