import { Resolver, Arg, Query } from "type-graphql";
import { Post, PostModel } from "../Models/Post";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post, { nullable: false })
  async getPost(@Arg("id") id: string) {
    return await PostModel.findById({ _id: id });
  }

  @Query(() => [Post])
  async getAllPosts() {
    return await PostModel.find();
  }
}
