import { Tweet, TweetModel } from "../Models/Tweet";
import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import Fuse from "fuse.js";
import { User, UserModel } from "../Models/User";

@ObjectType()
class Response {
  @Field(() => [Tweet])
  tweets: Tweet[];

  @Field(() => [User])
  users: User[];
}

@Resolver()
export class SearchResolver {
  @Query(() => Response)
  async search(@Arg("searchTerm") searchTerm: string): Promise<Response> {
    const tweets = await TweetModel.find();
    const users = await UserModel.find();
    const userkeys = ["username", "fullname"];
    const tweetkeys = ["content"];
    const userSearch = new Fuse(users, {
      keys: userkeys,
    });
    const tweetSearch = new Fuse(tweets, {
      keys: tweetkeys,
    });
    const usersResults = userSearch.search(searchTerm);
    const tweetResults = tweetSearch.search(searchTerm);
    return {
      tweets: tweetResults.map((result) => result.item),
      users: usersResults.map((result) => result.item),
    };
  }
}
