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
import { User } from "../Models/User";
import { Like } from "../Models/Like";
import { Comment } from "../Models/Comment";

@ObjectType()
class TweetError {
  @Field()
  message: string;

  @Field()
  field: string;
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

  @Query(() => [Tweet])
  async getAllTweets() {
    return await TweetModel.find().sort({ createdAt: "desc" });
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
      isRetweet: false,
      comments: [],
      likes: [],
      retweets: [],
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

  @Mutation(() => SingleTweetResponse)
  @UseMiddleware(Auth)
  async createReTweet(
    @Arg("tweetId") tweetId: string,
    @Ctx() { request }: Context
  ): Promise<SingleTweetResponse> {
    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return {
        error: {
          field: "tweet",
          message: "Tweet is unavailable",
        },
      };
    }
    const { comments, content, creator, likes, retweets } = tweet!;
    const retweet = await TweetModel.create({
      content,
      creator: (creator as User)._id,
      createdAt: Date.now(),
      isRetweet: true,
      comments: comments.map((comment) => (comment as Comment)._id),
      likes: likes.map((like) => (like as Like)._id),
      retweets: [
        request.session.userId,
        ...retweets.map((retweet) => (retweet as User)._id),
      ],
    });
    await TweetModel.updateOne(
      {
        _id: tweetId,
      },
      {
        $push: { retweets: [request.session.userId] as any },
      }
    );
    await retweet.save();
    const hashtags = extractHashtags(content);
    if (hashtags.length > 0) {
      hashtags.forEach(async (hashtag) => {
        const trend = await TrendsModel.findOne({ hashtag });
        if (!trend) {
          await TrendsModel.create({
            hashtag,
            numberOfTweets: 1,
            tweets: [retweet.id],
          });
        } else {
          await TrendsModel.updateOne(
            { _id: trend.id! },
            {
              $push: { Tweets: [retweet.id] as any },
              numberOfTweets: trend.numberOfTweets + 1,
            }
          );
        }
      });
    }
    return { tweet: retweet };
  }
}
