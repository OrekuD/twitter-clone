import { Trends, TrendsModel } from "../Models/Trends";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class TrendsResolver {
  @Query(() => [Trends])
  async getTrends() {
    return TrendsModel.find().sort({
      numberOfTweets: "desc",
    });
  }

  @Query(() => Trends, { nullable: true })
  async getTweetsByHashtag(@Arg("hashtag") hashtag: string) {
    return TrendsModel.findOne({ hashtag });
  }
}
