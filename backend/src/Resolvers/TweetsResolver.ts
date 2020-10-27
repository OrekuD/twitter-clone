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
} from "type-graphql";
import { Tweet, TweetModel } from "../Models/Tweet";
import { Context } from "../types";
import { extractHashtags } from "../Utils/extractHashtags";
import { TrendsModel } from "../Models/Trends";
import { User, UserModel } from "../Models/User";
import { Like, LikeModel } from "../Models/Like";
import { likeLoader, tweetLoader, userLoader } from "../Utils/dataLoaders";

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
      originalTweetId: null,
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
              $push: { Tweets: tweet.id },
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
  async createRetweet(
    @Arg("tweetId") tweetId: string,
    @Arg("content") content: string,
    @Ctx() { request }: Context
  ): Promise<TweetResponse> {
    const tweet = await TweetModel.findOne({ _id: tweetId });
    const { userId } = request.session;
    if (!tweet) {
      return {
        state: false,
        message: "Tweet is unavailable",
      };
    }

    const retweet = await TweetModel.create({
      originalTweetId: tweetId,
      createdAt: Date.now(),
      content,
      creator: userId,
      commentsCount: 0,
      parentId: null,
      likes: [],
      retweets: [],
    });

    await TweetModel.updateOne(
      {
        _id: tweetId,
      },
      {
        $push: { retweets: userId },
      }
    );
    await retweet.save();

    return {
      state: true,
      message: "Retweet successfull",
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
      originalTweetId: null,
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

    // There's probably a better way to generate the timeline
    // This is what I could think of :)

    // First, get the IDs of the current user and that user's following list
    const ids = [userId, ...user?.following!];

    // then, fetch their tweets
    const tweets = await TweetModel.find({
      creator: {
        $in: ids.flat(Infinity).map((id) => String(id)),
      },
    });

    // then, fetch likes on tweets made by the user's following list
    const likes = await LikeModel.find({
      creatorId: {
        $in: user?.following.map((id) => String(id)),
      },
    });

    // then, fetch the tweets associated with the likes
    const likedTweetsIds = likes.map((like) => like.tweetId);

    const likedTweets = await TweetModel.find({
      _id: {
        $in: [...new Set(likedTweetsIds)], // remove duplicate ids
      },
    });

    // then, sort results based on their createdAt field
    const sortedItems = [...likes, ...tweets].sort(
      (a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()
    );

    const sortedTweets = sortedItems.map((item) => {
      if ((item as Like).tweetId) {
        return likedTweets.find(({ id }) => id === (item as Like).tweetId);
      } else {
        return item;
      }
    });

    // Remove any duplicate tweets and return result
    const removeDuplicateTweets = (tweets: Tweet[]) => {
      const tweetIds = tweets.map((tweet) => String(tweet._id));
      const newSet = [...new Set(tweetIds)];
      console.log({ tweetIds, newSet });
      return tweets.map((tweet) => {
        if (newSet.includes(String(tweet._id))) {
          return tweet;
        }
      });
    };

    // console.log(sortedTweets.map((item) => item?.id));
    // console.log(
    //   removeDuplicateTweets(sortedTweets as Tweet[]).map((item) => item?._id)
    // );

    return removeDuplicateTweets(sortedTweets as Tweet[]);
  }

  // Field resolvers
  @FieldResolver(() => User, { nullable: true })
  creator(@Root() tweet: Tweet) {
    return userLoader().load(tweet._doc.creator);
  }

  @FieldResolver(() => [Like])
  likes(@Root() tweet: Tweet) {
    // LikeModel.find({ _id: { $in: tweet._doc.likes } });
    return likeLoader().loadMany(tweet._doc.likes);
  }

  @FieldResolver(() => [User])
  retweets(@Root() tweet: Tweet) {
    // UserModel.find({ _id: { $in: tweet._doc.retweets } })
    return userLoader().loadMany(tweet._doc.retweets);
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

  @FieldResolver(() => Tweet, { nullable: true })
  originalTweet(@Root() tweet: Tweet) {
    if (!tweet._doc.originalTweetId) {
      return null;
    }
    // TweetModel.findOne({ _id: tweet._doc.originalTweetId })
    return tweetLoader().load(tweet._doc.originalTweetId);
  }
}
