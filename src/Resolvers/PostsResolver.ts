import { Resolver, Arg, Query } from "type-graphql";
import { Posts, PostsModel } from "../entities/Posts";

@Resolver((_of) => Posts)
export class PostsResolver {
  @Query(() => Posts, { nullable: false })
  async getPost(@Arg("id") id: string) {
    return await PostsModel.findById({ _id: id });
  }

  @Query(() => [Posts])
  async getAllPosts() {
    return await PostsModel.find();
  }
}
