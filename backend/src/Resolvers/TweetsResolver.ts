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
  FieldResolver,
  Root,
  Int,
} from "type-graphql";
import { Tweet, TweetModel } from "../Models/Tweet";
import { Context } from "../types";
import { extractHashtags } from "../Utils/extractHashtags";
import { TrendsModel } from "../Models/Trends";
import { User, UserModel } from "../Models/User";
import { Like, LikeModel } from "../Models/Like";
import { userLoader } from "../Utils/dataLoaders";
import { Retweet, RetweetModel } from "../Models/Retweet";

@ObjectType()
class TweetError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@ObjectType()
class TweetResponse {
  @Field()
  state: boolean;

  @Field()
  message: string;
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

@Resolver(Tweet)
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

  // remove this later
  @Query(() => [Tweet])
  getAllTweets() {
    return TweetModel.find().sort({ createdAt: "desc" });
  }

  @Query(() => [Tweet])
  getTweetComments(@Arg("tweetId") tweetId: string) {
    return TweetModel.find({ parentId: tweetId }).sort({ createdAt: "desc" });
  }

  @Query(() => [Tweet])
  getTweetsByUser(@Arg("userId") userId: string) {
    return TweetModel.find({ creator: userId }).sort({
      createdAt: "desc",
    });
  }

  @Mutation(() => TweetResponse)
  @UseMiddleware(Auth)
  async createTweet(
    @Arg("content") content: string,
    @Ctx() { request }: Context
  ): Promise<TweetResponse> {
    const tweet = await TweetModel.create({
      content,
      creator: request.session.userId,
      createdAt: Date.now(),
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

    return {
      state: true,
      message: "Tweet successfull",
    };
  }

  @Mutation(() => TweetResponse)
  @UseMiddleware(Auth)
  async createComment(
    @Arg("input") input: CommentInput,
    @Ctx() { request }: Context
  ): Promise<TweetResponse> {
    const { content, tweetId } = input;
    const { userId } = request.session;
    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return {
        message: "Tweet is unavailable",
        state: false,
      };
    }

    const comment = await TweetModel.create({
      parentId: tweetId,
      content,
      creator: userId,
      createdAt: Date.now(),
      commentsCount: 0,
      likes: [],
      retweets: [],
    });
    await comment.save();

    await TweetModel.updateOne(
      { _id: tweetId },
      { commentsCount: tweet.commentsCount + 1 }
    );

    return {
      state: true,
      message: "Comment successfull",
    };
  }

  @Mutation(() => TweetResponse)
  @UseMiddleware(Auth)
  async deleteTweet(
    @Arg("tweetId") tweetId: string,
    @Ctx() { request }: Context
  ): Promise<TweetResponse> {
    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return {
        state: false,
        message: "Tweet is unavailable",
      };
    } else if (tweet.creator !== request.session.userId) {
      return {
        state: false,
        message: "You aren't the creator of this tweet",
      };
    }

    await TweetModel.deleteOne({ _id: tweetId });
    return {
      state: true,
      message: "Tweet successfully deleted",
    };
  }

  @Query(() => [Tweet])
  @UseMiddleware(Auth)
  async getUserTimeline(@Ctx() { request }: Context) {
    const { userId } = request.session;
    const user = await UserModel.findOne({ _id: userId });

    // There's definitely a better way to generate the timeline
    // This is the easiest way I could think of :)

    // First, get the IDs of the current user and the users he/she is following
    const ids = [userId, ...user?.following!];

    // then, fetch their tweets
    const tweets = await TweetModel.find({
      creator: {
        $in: ids.flat(Infinity).map((id) => String(id)),
      },
    });

    // then, fetch the retweets of user's following list
    const retweets = await RetweetModel.find({
      creatorId: {
        $in: user?.following.map((id) => String(id)),
      },
    });

    // then, fetch the likes of user's following list
    const likes = await LikeModel.find({
      creatorId: {
        $in: user?.following.map((id) => String(id)),
      },
    });

    // then, fetch the tweets associated with the likes / retweets
    const tweetsIds = [
      ...retweets.map((retweet) => retweet.tweetId),
      ...likes.map((like) => like.tweetId),
    ];

    const timelineTweets = await TweetModel.find({
      _id: {
        $in: [...new Set(tweetsIds)], // remove duplicates
      },
    });

    // then, sort results based on their createdAt field
    const sortedItems = [...likes, ...retweets, ...tweets].sort(
      (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()
    );

    const sortedTweets = sortedItems.map((item) => {
      if ((item as Like | Retweet).tweetId) {
        return timelineTweets.find(
          ({ id }) => id === (item as Like | Retweet).tweetId
        );
      } else {
        return item;
      }
    });

    const uniq = (array: (Like | Tweet | undefined)[]) => {
      const objs: (Like | Tweet | undefined)[] = [];
      return array.filter((item) => {
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
      });
    };

    // Remove any duplicate tweets and return result
    return uniq(sortedTweets);
  }

  // Field resolvers
  @FieldResolver(() => Int)
  likesCount(@Root() tweet: Tweet) {
    return tweet._doc.likes.length;
  }

  @FieldResolver(() => Int)
  retweetsCount(@Root() tweet: Tweet) {
    return tweet._doc.retweets.length;
  }

  @FieldResolver(() => User, { nullable: true })
  creator(@Root() tweet: Tweet) {
    return userLoader().load(tweet._doc.creator);
  }

  @FieldResolver(() => [Like])
  likes(@Root() tweet: Tweet) {
    return LikeModel.find({ _id: { $in: tweet._doc.likes } });
  }

  @FieldResolver(() => [Retweet])
  retweets(@Root() tweet: Tweet) {
    return RetweetModel.find({ _id: { $in: tweet._doc.retweets } });
  }

  @FieldResolver(() => String, { nullable: true })
  async parentTweetCreator(@Root() tweet: Tweet) {
    if (!tweet._doc.parentId) {
      return null;
    }
    const parentTweet = await TweetModel.findOne({ _id: tweet._doc.parentId });
    const user = await UserModel.findOne({ _id: parentTweet?.creator });
    return user?.username;
  }
}
