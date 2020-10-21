import { Trends, TrendsModel } from "../Models/Trends";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Tweet, TweetModel } from "../Models/Tweet";

@Resolver(Trends)
export class TrendsResolver {
  @Query(() => [Trends])
  getTrends() {
    return TrendsModel.find().sort({
      numberOfTweets: "desc",
    });
  }

  @Query(() => Trends, { nullable: true })
  getTweetsByHashtag(@Arg("hashtag") hashtag: string) {
    return TrendsModel.findOne({ hashtag });
  }

  @FieldResolver(() => Tweet)
  tweets(@Root() trend: Trends) {
    return TweetModel.find({ _id: { $in: trend._doc.tweets } });
  }
}
