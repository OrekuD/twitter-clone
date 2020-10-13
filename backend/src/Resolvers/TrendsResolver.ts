import { Trends, TrendsModel } from "../Models/Trends";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class TrendsResolver {
  @Query(() => [Trends])
  async getTrends() {
    return await TrendsModel.find().sort({
      numberOfPosts: "desc",
    });
  }

  @Query(() => Trends, { nullable: true })
  async getTrendsByHashtag(@Arg("hashtag") hashtag: string) {
    return await TrendsModel.findOne({ hashtag });
  }
}
