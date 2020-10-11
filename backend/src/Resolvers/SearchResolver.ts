import { Post, PostModel } from "../Models/Post";
import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import Fuse from "fuse.js";
import { User, UserModel } from "../Models/User";

@ObjectType()
class Response {
  @Field(() => [Post])
  posts: Post[];

  @Field(() => [User])
  users: User[];
}

@Resolver()
export class SearchResolver {
  @Query(() => Response)
  async search(@Arg("searchTerm") searchTerm: string): Promise<Response> {
    const posts = await PostModel.find();
    const users = await UserModel.find();
    const userkeys = ["username", "fullname"];
    const postkeys = ["content"];
    const userSearch = new Fuse(users, {
      keys: userkeys,
    });
    const postSearch = new Fuse(posts, {
      keys: postkeys,
    });
    const usersResults = userSearch.search(searchTerm);
    const postResults = postSearch.search(searchTerm);
    return {
      posts: postResults.map((result) => result.item),
      users: usersResults.map((result) => result.item),
    };
  }
}
