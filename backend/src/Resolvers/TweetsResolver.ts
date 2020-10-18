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
  InputType,
} from "type-graphql";
import { Tweet, TweetModel } from "../Models/Tweet";
import { Context } from "../types";
import { extractHashtags } from "../Util/extractHashtags";
import { TrendsModel } from "../Models/Trends";
import { User } from "../Models/User";
import { Like } from "../Models/Like";

@ObjectType()
class TweetError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@InputType()
class CommentInput {
  @Field()
  content: string;

  @Field()
  tweetId: string;
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
    return TweetModel.find().sort({ createdAt: "desc" });
  }

  @Query(() => [Tweet])
  async getTweetComments(@Arg("tweetId") tweetId: string) {
    return TweetModel.find({ parentId: tweetId }).sort({ createdAt: "desc" });
  }

  @Query(() => [Tweet])
  async getTweetsByUser(@Arg("userId") userId: string) {
    return TweetModel.find({ creator: userId }).sort({
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
      commentsCount: 0,
      parentId: null,
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
  async createComment(
    @Arg("input") input: CommentInput,
    @Ctx() { request }: Context
  ): Promise<SingleTweetResponse> {
    const { content, tweetId } = input;
    const { userId } = request.session;
    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return {
        error: {
          message: "Tweet is unavailable",
          field: "tweet",
        },
      };
    }

    const comment = await TweetModel.create({
      parentId: tweetId,
      content,
      creator: userId,
      createdAt: Date.now(),
      commentsCount: 0,
      isRetweet: false,
      likes: [],
      retweets: [],
    });
    await comment.save();

    await TweetModel.updateOne(
      { _id: tweetId },
      { commentsCount: tweet.commentsCount + 1 }
    );

    return { tweet: comment };
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
    const {
      commentsCount,
      content,
      creator,
      likes,
      retweets,
      parentId,
    } = tweet!;
    const retweet = await TweetModel.create({
      content,
      creator: (creator as User)._id,
      createdAt: Date.now(),
      isRetweet: true,
      commentsCount,
      parentId,
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

  @Query(() => [Tweet])
  @UseMiddleware(Auth)
  async getCurrentUserTimeline(@Ctx() { request }: Context) {
    return TweetModel.find({ creator: request.session.userId }).sort({
      createdAt: "desc",
    });
  }

  @Query(() => [Tweet])
  async getUserTimeline(@Arg("userId") userId: string) {
    // const { userId } = request.session;
    // const user = await UserModel.findOne({ _id: id });
    // const following = user?.following;
    // console.log(following);
    return TweetModel.find({ creator: userId }).sort({
      createdAt: "desc",
    });
  }
}
